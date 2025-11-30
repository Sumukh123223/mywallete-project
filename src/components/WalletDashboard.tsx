import { useState, useEffect } from 'react';
import { Wallet, WalletBalance } from '../types/wallet';
import { WalletService } from '../services/walletService';
import WalletCard from './WalletCard';
import AddWalletModal from './AddWalletModal';
import { Plus, LogOut, Wallet as WalletIcon } from 'lucide-react';
import './WalletDashboard.css';

interface WalletDashboardProps {
  wallets: Wallet[];
  password: string;
  onAddWallet: (type: 'tron' | 'bnb', name: string, mnemonic?: string) => Promise<void>;
  onDeleteWallet: (walletId: string) => void;
  onLogout: () => void;
}

function WalletDashboard({
  wallets,
  onAddWallet,
  onDeleteWallet,
  onLogout,
}: WalletDashboardProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [balances, setBalances] = useState<Map<string, WalletBalance>>(new Map());
  const [loadingBalances, setLoadingBalances] = useState(false);

  useEffect(() => {
    if (wallets.length > 0) {
      loadBalances();
    }
  }, [wallets]);

  const loadBalances = async () => {
    setLoadingBalances(true);
    const newBalances = new Map<string, WalletBalance>();

    for (const wallet of wallets) {
      try {
        const balance = await WalletService.getBalance(wallet);
        newBalances.set(wallet.id, balance);
      } catch (error) {
        console.error(`Error loading balance for ${wallet.name}:`, error);
        newBalances.set(wallet.id, {
          address: wallet.address,
          balance: '0',
          symbol: wallet.type.toUpperCase(),
        });
      }
    }

    setBalances(newBalances);
    setLoadingBalances(false);
  };

  const handleAddWallet = async (
    type: 'tron' | 'bnb',
    name: string,
    mnemonic?: string
  ) => {
    await onAddWallet(type, name, mnemonic);
    setShowAddModal(false);
    // Reload balances after adding wallet
    setTimeout(loadBalances, 500);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <WalletIcon className="header-icon" size={32} />
            <div>
              <h1>My Crypto Wallet</h1>
              <p className="wallet-count">{wallets.length} wallet{wallets.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button className="logout-button" onClick={onLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {wallets.length === 0 ? (
          <div className="empty-state">
            <WalletIcon size={64} className="empty-icon" />
            <h2>No Wallets Yet</h2>
            <p>Create your first cryptocurrency wallet to get started</p>
            <button className="add-wallet-button" onClick={() => setShowAddModal(true)}>
              <Plus size={20} />
              Create Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="wallets-grid">
              {wallets.map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  balance={balances.get(wallet.id)}
                  onDelete={onDeleteWallet}
                  onRefresh={loadBalances}
                  loadingBalance={loadingBalances}
                />
              ))}
            </div>

            <button
              className="floating-add-button"
              onClick={() => setShowAddModal(true)}
              title="Add Wallet"
            >
              <Plus size={24} />
            </button>
          </>
        )}
      </main>

      {showAddModal && (
        <AddWalletModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddWallet}
          existingWallets={wallets}
        />
      )}
    </div>
  );
}

export default WalletDashboard;

