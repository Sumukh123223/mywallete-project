import { useState, useEffect } from 'react';
import { Wallet } from './types/wallet';
import { WalletService } from './services/walletService';
import { saveWalletStore, loadWalletStore, hasWalletStore } from './utils/storage';
import LoginScreen from './components/LoginScreen';
import WalletDashboard from './components/WalletDashboard';
import './App.css';

function App() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if wallet store exists
    if (hasWalletStore()) {
      setLoading(false);
    } else {
      setIsAuthenticated(true); // No wallet exists, show create wallet screen
      setLoading(false);
    }
  }, []);

  const handleLogin = async (userPassword: string) => {
    try {
      const store = loadWalletStore(userPassword);
      if (store) {
        setPassword(userPassword);
        setWallets(store.wallets);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid password or corrupted wallet data');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCreateWallet = async (userPassword: string) => {
    setPassword(userPassword);
    setIsAuthenticated(true);
  };

  const handleAddWallet = async (
    type: 'tron' | 'bnb',
    name: string,
    mnemonic?: string
  ) => {
    try {
      const newWallet = await WalletService.createWallet(type, name, mnemonic);
      
      // Encrypt private key before storing
      newWallet.privateKey = WalletService.encryptPrivateKey(newWallet.privateKey, password);
      
      const updatedWallets = [...wallets, newWallet];
      setWallets(updatedWallets);
      
      // Save to storage
      saveWalletStore({ wallets: updatedWallets }, password);
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  };

  const handleDeleteWallet = (walletId: string) => {
    const updatedWallets = wallets.filter(w => w.id !== walletId);
    setWallets(updatedWallets);
    saveWalletStore({ wallets: updatedWallets }, password);
  };

  const handleLogout = () => {
    setPassword('');
    setWallets([]);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading wallet...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onCreateWallet={handleCreateWallet}
        hasExistingWallet={hasWalletStore()}
      />
    );
  }

  return (
    <WalletDashboard
      wallets={wallets}
      password={password}
      onAddWallet={handleAddWallet}
      onDeleteWallet={handleDeleteWallet}
      onLogout={handleLogout}
    />
  );
}

export default App;

