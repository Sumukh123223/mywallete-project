import { WalletStore } from '../types/wallet';
import { encrypt, decrypt } from './encryption';

const STORAGE_KEY = 'crypto_wallet_store';

export function saveWalletStore(store: WalletStore, password: string): void {
  try {
    const encrypted = encrypt(JSON.stringify(store), password);
    localStorage.setItem(STORAGE_KEY, encrypted);
  } catch (error) {
    console.error('Error saving wallet store:', error);
    throw new Error('Failed to save wallet data');
  }
}

export function loadWalletStore(password: string): WalletStore | null {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return null;
    
    const decrypted = decrypt(encrypted, password);
    return JSON.parse(decrypted) as WalletStore;
  } catch (error) {
    console.error('Error loading wallet store:', error);
    return null;
  }
}

export function clearWalletStore(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasWalletStore(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

