export interface Wallet {
  id: string;
  name: string;
  address: string;
  privateKey: string; // Encrypted
  type: 'tron' | 'bnb';
  createdAt: string;
}

export interface WalletBalance {
  address: string;
  balance: string;
  symbol: string;
  usdValue?: number;
  tokens?: TokenBalance[];
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  contractAddress: string;
  decimals: number;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface WalletStore {
  wallets: Wallet[];
  encryptedMnemonic?: string;
}
