import { useState } from 'react';
import { Wallet, WalletBalance } from '../types/wallet';
import { Copy, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';
import './WalletCard.css';

interface WalletCardProps {
  wallet: Wallet;
  balance?: WalletBalance;
  onDelete: (walletId: string) => void;
  onRefresh: () => void;
  loadingBalance: boolean;
}

function WalletCard({ wallet, balance, onDelete, onRefresh, loadingBalance }: WalletCardProps) {
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getTypeIcon = () => {
    switch (wallet.type) {
      case 'tron':
        return 'T';
      case 'bnb':
        return 'B';
      default:
        return '?';
    }
  };

  const getTypeColor = () => {
    switch (wallet.type) {
      case 'tron':
        return '#FF001F';
      case 'bnb':
        return '#F3BA2F';
      default:
        return '#667eea';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    if (num === 0) return '0.00';
    if (num < 0.01) return num.toFixed(6);
    return num.toFixed(4);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(wallet.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="wallet-card" style={{ borderTopColor: getTypeColor() }}>
      <div className="wallet-card-header">
        <div className="wallet-type-badge" style={{ backgroundColor: getTypeColor() }}>
          {getTypeIcon()}
        </div>
        <div className="wallet-info">
          <h3>{wallet.name}</h3>
          <p className="wallet-type">{wallet.type.toUpperCase()}</p>
        </div>
      </div>

      <div className="wallet-balance">
        {loadingBalance ? (
          <div className="balance-loading">Loading...</div>
        ) : (
          <>
            <div className="balance-amount">
              {formatBalance(balance?.balance || '0')} {balance?.symbol || wallet.type.toUpperCase()}
            </div>
            {balance?.usdValue && (
              <div className="balance-usd">${balance.usdValue.toFixed(2)} USD</div>
            )}
          </>
        )}
      </div>

      {/* Token Balances */}
      {balance?.tokens && balance.tokens.length > 0 && (
        <div className="token-balances">
          <div className="token-balances-label">Token Balances:</div>
          {balance.tokens.map((token, index) => (
            <div key={index} className="token-balance-item">
              <span className="token-symbol">{token.symbol}</span>
              <span className="token-amount">{formatBalance(token.balance)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="wallet-address">
        <div className="address-label">Address</div>
        <div className="address-value">
          <code>{formatAddress(wallet.address)}</code>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(wallet.address)}
            title="Copy address"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="wallet-actions">
        <button className="action-button" onClick={onRefresh} title="Refresh balance">
          <RefreshCw size={18} />
        </button>
        <button
          className="action-button delete-button"
          onClick={handleDelete}
          title={showDeleteConfirm ? 'Click again to confirm' : 'Delete wallet'}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="delete-warning">
          ⚠️ Click delete again to confirm. This action cannot be undone!
        </div>
      )}
    </div>
  );
}

export default WalletCard;

