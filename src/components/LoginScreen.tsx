import { useState } from 'react';
import { Lock, Wallet, KeyRound } from 'lucide-react';
import './LoginScreen.css';

interface LoginScreenProps {
  onLogin: (password: string) => Promise<void>;
  onCreateWallet: (password: string) => void;
  hasExistingWallet: boolean;
}

function LoginScreen({ onLogin, onCreateWallet, hasExistingWallet }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(!hasExistingWallet);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isCreating) {
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        onCreateWallet(password);
      } else {
        await onLogin(password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <Wallet className="wallet-icon" size={64} />
          <h1>Crypto Wallet</h1>
          <p>Secure Multi-Cryptocurrency Wallet</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
              {isCreating ? 'Create Master Password' : 'Enter Password'}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isCreating ? 'Minimum 8 characters' : 'Enter your password'}
              required
              autoFocus
            />
          </div>

          {isCreating && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <KeyRound size={20} />
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : isCreating ? 'Create Wallet' : 'Unlock Wallet'}
          </button>

          {hasExistingWallet && (
            <button
              type="button"
              className="toggle-button"
              onClick={() => {
                setIsCreating(!isCreating);
                setError('');
                setPassword('');
                setConfirmPassword('');
              }}
            >
              {isCreating ? 'I already have a wallet' : 'Create new wallet'}
            </button>
          )}
        </form>

        <div className="security-warning">
          <p>⚠️ Remember: You are responsible for keeping your password safe!</p>
          <p>If you lose your password, you will lose access to your funds.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;

