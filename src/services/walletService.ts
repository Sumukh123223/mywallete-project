import { Wallet, WalletBalance } from '../types/wallet';
import { encrypt, decrypt } from '../utils/encryption';
import { createTronWallet, createTronWalletFromMnemonic, getTronBalance } from './tronWallet';
import { createBnbWallet, createBnbWalletFromMnemonic, getBnbBalance } from './bnbWallet';

export class WalletService {
  static async createWallet(
    type: 'tron' | 'bnb',
    name: string,
    mnemonic?: string,
    index: number = 0
  ): Promise<Wallet> {
    let wallet;
    
    switch (type) {
      case 'tron':
        wallet = mnemonic 
          ? await createTronWalletFromMnemonic(mnemonic, index)
          : await createTronWallet();
        break;
      case 'bnb':
        wallet = mnemonic
          ? createBnbWalletFromMnemonic(mnemonic, index)
          : await createBnbWallet();
        break;
      default:
        throw new Error(`Unsupported wallet type: ${type}`);
    }

    return {
      id: `wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      address: wallet.address,
      privateKey: wallet.privateKey, // This will be encrypted before saving
      type,
      createdAt: new Date().toISOString(),
    };
  }

  static async getBalance(wallet: Wallet): Promise<WalletBalance> {
    let balance = '0';
    
    try {
      switch (wallet.type) {
        case 'tron':
          balance = await getTronBalance(wallet.address);
          return { address: wallet.address, balance, symbol: 'TRX' };
        case 'bnb':
          balance = await getBnbBalance(wallet.address);
          return { address: wallet.address, balance, symbol: 'BNB' };
        default:
          return { address: wallet.address, balance: '0', symbol: 'UNKNOWN' };
      }
    } catch (error) {
      console.error(`Error fetching ${wallet.type} balance:`, error);
      return { address: wallet.address, balance: '0', symbol: wallet.type.toUpperCase() };
    }
  }

  static decryptPrivateKey(encryptedPrivateKey: string, password: string): string {
    return decrypt(encryptedPrivateKey, password);
  }

  static encryptPrivateKey(privateKey: string, password: string): string {
    return encrypt(privateKey, password);
  }
}
