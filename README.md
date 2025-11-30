# Secure Crypto Wallet 🔐

A **secure, privacy-focused** cryptocurrency wallet application for **TRON (TRX)** and **BNB (Binance Smart Chain)** networks. Built with React, TypeScript, and enterprise-grade encryption.

## 🛡️ Security & Privacy Features

### **Your Privacy is Protected:**
- ✅ **100% Local Storage** - All data stored on your device only
- ✅ **AES-256-CBC Encryption** - Military-grade encryption for private keys
- ✅ **PBKDF2 Key Derivation** - 10,000 iterations for password security
- ✅ **No Data Collection** - Zero tracking, zero analytics, zero external servers
- ✅ **No Network Requests** - Wallet data never leaves your browser
- ✅ **Secure Key Generation** - Cryptographically secure random key generation

### **Security Best Practices:**
- All private keys are encrypted before storage
- Master password required for all operations
- No private keys stored in plain text
- No connection to external wallet services
- Open source code - you can verify security

## 🌐 Supported Networks

1. **TRON (TRX)** - Fast, low-cost transactions
2. **BNB (Binance Smart Chain)** - EVM-compatible smart contracts

## 🚀 Quick Start

### Installation

```bash
cd ~/Desktop/crypto-wallet
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📱 Features

- 🔐 **Secure Wallet Creation** - Generate new wallets or import from mnemonic
- 💰 **Balance Tracking** - View real-time balances for TRX and BNB
- 🔑 **HD Wallet Support** - Create multiple wallets from one mnemonic phrase
- 🎨 **Modern UI** - Beautiful, intuitive interface
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔒 **Password Protection** - Master password secures all wallets

## 🔐 Security Warnings

### **Critical Security Information:**

1. **🔑 Protect Your Password**
   - Use a strong, unique password (minimum 12 characters)
   - Mix uppercase, lowercase, numbers, and symbols
   - Never share your password with anyone
   - Consider using a password manager

2. **💾 Backup Your Mnemonic Phrases**
   - Write down mnemonic phrases on paper
   - Store in a secure, fireproof location
   - Never store digitally (screenshots, cloud, etc.)
   - If you lose your password AND mnemonic, funds are lost forever

3. **🌐 Network Security**
   - Only use on secure networks
   - Avoid public Wi-Fi when accessing your wallet
   - Keep your browser and OS updated

4. **💻 Device Security**
   - Keep your computer free from malware
   - Use antivirus software
   - Don't install suspicious browser extensions
   - Clear browser data carefully (will delete wallet data)

5. **⚠️ Important Notes**
   - This wallet stores data in browser localStorage
   - Clearing browser data will delete your wallets
   - Export/backup your wallets regularly
   - Test with small amounts first

## 📖 Usage Guide

### Creating Your First Wallet

1. **Set Master Password**
   - Enter a strong password (minimum 8 characters)
   - Confirm your password
   - Remember: You cannot recover this password!

2. **Create Network Wallet**
   - Click the "+" button
   - Choose TRON or BNB network
   - Give your wallet a name
   - Click "Create Wallet"

3. **Import Existing Wallet** (Optional)
   - Check "Import from existing mnemonic phrase"
   - Enter your 12 or 24-word mnemonic phrase
   - Your wallet will be imported securely

### Managing Wallets

- **View Balance**: Automatically displays on wallet card
- **Refresh**: Click refresh button to update balance
- **Copy Address**: Click copy icon to copy wallet address
- **Delete Wallet**: Click trash icon (requires double confirmation)

## 🏗️ Project Structure

```
crypto-wallet/
├── src/
│   ├── components/          # React UI components
│   │   ├── LoginScreen.tsx
│   │   ├── WalletDashboard.tsx
│   │   ├── WalletCard.tsx
│   │   └── AddWalletModal.tsx
│   ├── services/            # Wallet implementations
│   │   ├── tronWallet.ts    # TRON network support
│   │   ├── bnbWallet.ts     # BNB/BSC network support
│   │   └── walletService.ts # Main wallet service
│   ├── utils/               # Utilities
│   │   ├── encryption.ts    # AES-256 encryption
│   │   └── storage.ts       # Secure local storage
│   └── types/               # TypeScript types
├── package.json
└── README.md
```

## 🔧 Technical Details

### Encryption
- **Algorithm**: AES-256-CBC
- **Key Derivation**: PBKDF2 with 10,000 iterations
- **Salt**: Random salt per encryption
- **IV**: Random initialization vector per encryption

### Storage
- **Location**: Browser localStorage
- **Format**: Encrypted JSON
- **Access**: Requires master password

### Networks
- **TRON**: Uses TronWeb library, connects to TronGrid API
- **BNB**: Uses ethers.js, connects to Binance Smart Chain RPC

## 🛠️ Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **ethers.js** - BNB/BSC wallet functionality
- **TronWeb** - TRON wallet functionality
- **@scure/bip39** - Secure mnemonic generation
- **crypto-js** - Encryption utilities
- **lucide-react** - Modern icons

## 📝 Privacy Policy

- **No Data Collection**: We don't collect any personal information
- **No Tracking**: No analytics, no cookies, no tracking
- **Local Only**: Everything runs on your device
- **Open Source**: You can review all code
- **No Backdoors**: No hidden data transmission

## ⚠️ Disclaimer

**This software is provided "as is" without warranty.**

- Use at your own risk
- Always verify addresses before sending funds
- Test with small amounts first
- Keep backups of your mnemonic phrases
- The developers are not responsible for any loss of funds

## 🔒 Security Checklist

Before storing significant funds:

- [ ] Test wallet creation and import
- [ ] Verify balance checking works
- [ ] Test with small amounts first
- [ ] Backup mnemonic phrases securely
- [ ] Use a strong master password
- [ ] Ensure device is secure and malware-free
- [ ] Understand that clearing browser data = lost wallets

## 🤝 Support

For issues or questions, please review the code or create an issue in the repository.

---

**Remember**: 🔐 **With great security comes great responsibility. Keep your keys safe!**

**Your keys, your crypto, your privacy.** ✨
