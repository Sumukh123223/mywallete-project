import { useState } from 'react';
import { X, Shield, Lock } from 'lucide-react';
import './AddWalletModal.css';

interface AddWalletModalProps {
  onClose: () => void;
  onAdd: (type: 'tron' | 'bnb', name: string, mnemonic?: string) => Promise<void>;
  existingWallets: any[];
}

function AddWalletModal({ onClose, onAdd }: AddWalletModalProps) {
  const [walletType, setWalletType] = useState<'tron' | 'bnb'>('tron');
  const [walletName, setWalletName] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [useExistingMnemonic, setUseExistingMnemonic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!walletName.trim()) {
      setError('Please enter a wallet name');
      setLoading(false);
      return;
    }

    try {
      await onAdd(
        walletType,
        walletName.trim(),
        useExistingMnemonic && mnemonic.trim() ? mnemonic.trim() : undefined
      );
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  const getWalletTypeInfo = () => {
    switch (walletType) {
      case 'tron':
        return {
          name: 'TRON',
          description: 'TRX Network - Fast & Secure',
          icon: 'T',
          color: '#FF001F',
        };
      case 'bnb':
        return {
          name: 'BNB',
          description: 'Binance Smart Chain',
          icon: 'B',
          color: '#F3BA2F',
        };
    }
  };

  const typeInfo = getWalletTypeInfo();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Shield size={24} />
            <h2>Create Secure Wallet</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="security-notice">
          <Lock size={16} />
          <span>All private keys are encrypted locally. Your data never leaves your device.</span>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-section">
            <label>Network Type</label>
            <div className="wallet-type-selector">
              <button
                type="button"
                className={`type-button ${walletType === 'tron' ? 'active' : ''}`}
                onClick={() => setWalletType('tron')}
                style={{ borderTopColor: walletType === 'tron' ? '#FF001F' : undefined }}
              >
                <span className="type-icon" style={{ color: '#FF001F' }}>T</span>
                <div>
                  <div className="type-name">TRON</div>
                  <div className="type-desc">TRX Network</div>
                </div>
              </button>
              <button
                type="button"
                className={`type-button ${walletType === 'bnb' ? 'active' : ''}`}
                onClick={() => setWalletType('bnb')}
                style={{ borderTopColor: walletType === 'bnb' ? '#F3BA2F' : undefined }}
              >
                <span className="type-icon" style={{ color: '#F3BA2F' }}>B</span>
                <div>
                  <div className="type-name">BNB</div>
                  <div className="type-desc">Binance Smart Chain</div>
                </div>
              </button>
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="walletName">Wallet Name</label>
            <input
              id="walletName"
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder={`My ${typeInfo.name} Wallet`}
              required
            />
          </div>

          <div className="form-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useExistingMnemonic}
                onChange={(e) => setUseExistingMnemonic(e.target.checked)}
              />
              <span>Import from existing mnemonic phrase</span>
            </label>
            {useExistingMnemonic && (
              <textarea
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="Enter your 12 or 24 word mnemonic phrase"
                rows={4}
                className="mnemonic-input"
              />
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-button" disabled={loading}>
              {loading ? 'Creating...' : 'Create Wallet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWalletModal;
