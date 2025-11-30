// Load TronWeb from window or import
let TronWeb: any;

async function getTronWeb() {
  if (TronWeb) return TronWeb;
  
  // Get from window (loaded via CDN script tag)
  if (typeof window !== 'undefined') {
    const windowTronWeb = (window as any).TronWeb;
    if (windowTronWeb) {
      TronWeb = windowTronWeb;
      return TronWeb;
    }
  }
  
  // Wait a bit and retry (in case script is still loading)
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (typeof window !== 'undefined' && (window as any).TronWeb) {
    TronWeb = (window as any).TronWeb;
    return TronWeb;
  }
  
  throw new Error('TronWeb library not loaded. Please refresh the page.');
}
import { ethers } from 'ethers';

export interface TronWallet {
  address: string;
  privateKey: string;
  mnemonic?: string;
}

const TRON_NETWORK = {
  fullHost: 'https://api.trongrid.io',
  // Alternative: 'https://api.shasta.trongrid.io' for testnet
};

export async function createTronWallet(): Promise<TronWallet> {
  // Use ethers to generate mnemonic (works reliably)
  const wallet = ethers.Wallet.createRandom();
  const mnemonic = wallet.mnemonic?.phrase || '';
  return createTronWalletFromMnemonic(mnemonic);
}

export async function createTronWalletFromMnemonic(mnemonic: string, index: number = 0): Promise<TronWallet> {
  const TronWebClass = await getTronWeb();
  
  // Use ethers to derive from mnemonic (same as BNB, works reliably)
  const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
  
  // TRON uses derivation path: m/44'/195'/0'/0/index
  // But we can derive from Ethereum path and convert the private key
  const ethWallet = hdNode.derivePath(`m/44'/60'/0'/0/${index}`);
  
  // Get private key and use it for TRON
  const privateKeyHex = ethWallet.privateKey.slice(2); // Remove 0x prefix
  
  // Create TronWeb instance and generate address
  const tronWeb = new TronWebClass({
    fullHost: TRON_NETWORK.fullHost,
    privateKey: privateKeyHex,
  });

  // Generate address from private key
  const address = tronWeb.address.fromPrivateKey(privateKeyHex);

  return {
    address,
    privateKey: privateKeyHex,
    mnemonic: index === 0 ? mnemonic : undefined,
  };
}

export async function getTronBalance(address: string): Promise<string> {
  try {
    const TronWebClass = await getTronWeb();
    const tronWeb = new TronWebClass({
      fullHost: TRON_NETWORK.fullHost,
    });

    const balance = await tronWeb.trx.getBalance(address);
    // TRON balance is in SUN (1 TRX = 1,000,000 SUN)
    const trxBalance = tronWeb.fromSun(balance);
    return trxBalance.toString();
  } catch (error) {
    console.error('Error fetching TRON balance:', error);
    return '0';
  }
}

export async function sendTronTransaction(
  privateKey: string,
  to: string,
  amount: string
): Promise<string> {
  try {
    const TronWebClass = await getTronWeb();
    const tronWeb = new TronWebClass({
      fullHost: TRON_NETWORK.fullHost,
      privateKey: privateKey,
    });

    // Convert TRX to SUN
    const amountInSun = tronWeb.toSun(amount);
    
    const transaction = await tronWeb.transactionBuilder.sendTrx(
      to,
      amountInSun,
      tronWeb.defaultAddress.hex
    );

    const signedTransaction = await tronWeb.trx.sign(transaction);
    const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
    
    return result.txid;
  } catch (error) {
    console.error('Error sending TRON transaction:', error);
    throw error;
  }
}

