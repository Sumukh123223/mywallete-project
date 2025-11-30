import { ethers } from 'ethers';

export interface BnbWallet {
  address: string;
  privateKey: string;
  mnemonic?: string;
}

// Binance Smart Chain (BSC) Mainnet RPC endpoints
const BSC_MAINNET_RPC = 'https://bsc-dataseed1.binance.org/';
const BSC_TESTNET_RPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

export async function createBnbWallet(): Promise<BnbWallet> {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase,
  };
}

export function createBnbWalletFromMnemonic(mnemonic: string, index: number = 0): BnbWallet {
  const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
  // BSC uses same derivation path as Ethereum: m/44'/60'/0'/0/index
  const wallet = hdNode.derivePath(`m/44'/60'/0'/0/${index}`);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

export async function getBnbBalance(address: string, useTestnet: boolean = false): Promise<string> {
  try {
    const rpcUrl = useTestnet ? BSC_TESTNET_RPC : BSC_MAINNET_RPC;
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error fetching BNB balance:', error);
    return '0';
  }
}

export async function sendBnbTransaction(
  privateKey: string,
  to: string,
  amount: string,
  useTestnet: boolean = false
): Promise<string> {
  try {
    const rpcUrl = useTestnet ? BSC_TESTNET_RPC : BSC_MAINNET_RPC;
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });
    
    return tx.hash;
  } catch (error) {
    console.error('Error sending BNB transaction:', error);
    throw error;
  }
}

