# 📤 Files to Upload to GitHub

This guide shows you exactly which files to upload to GitHub for Vercel deployment.

## ✅ Files TO UPLOAD (Include These)

Upload ALL of these files and folders:

```
crypto-wallet/
├── 📄 package.json          ← Required for dependencies
├── 📄 package-lock.json     ← Required for exact versions
├── 📄 index.html            ← Entry point
├── 📄 tsconfig.json         ← TypeScript config
├── 📄 tsconfig.node.json    ← TypeScript config
├── 📄 vite.config.ts        ← Vite build config
├── 📄 vercel.json           ← Vercel deployment config
├── 📄 netlify.toml          ← Netlify config (optional)
├── 📄 .eslintrc.cjs         ← ESLint config
├── 📄 .gitignore            ← Git ignore rules
├── 📄 README.md             ← Documentation
├── 📄 DEPLOYMENT.md         ← Deployment guide
├── 📄 GIT_UPLOAD_GUIDE.md   ← This file
│
└── 📁 src/                  ← ALL source code
    ├── 📄 main.tsx
    ├── 📄 App.tsx
    ├── 📄 App.css
    ├── 📄 index.css
    │
    ├── 📁 components/       ← ALL component files
    │   ├── LoginScreen.tsx
    │   ├── LoginScreen.css
    │   ├── WalletDashboard.tsx
    │   ├── WalletDashboard.css
    │   ├── WalletCard.tsx
    │   ├── WalletCard.css
    │   ├── AddWalletModal.tsx
    │   └── AddWalletModal.css
    │
    ├── 📁 services/         ← ALL service files
    │   ├── tronWallet.ts
    │   ├── bnbWallet.ts
    │   └── walletService.ts
    │
    ├── 📁 types/            ← ALL type files
    │   └── wallet.ts
    │
    └── 📁 utils/            ← ALL utility files
        ├── encryption.ts
        └── storage.ts
```

## ❌ Files NOT to Upload (Excluded by .gitignore)

These will be automatically ignored:

```
❌ node_modules/        ← Too large, Vercel will install
❌ dist/                ← Build folder, Vercel will build
❌ .vite/               ← Vite cache
❌ .DS_Store            ← Mac system file
❌ *.log                ← Log files
❌ .env                 ← Environment variables (if any)
```

## 🚀 Quick Steps to Upload

### Step 1: Initialize Git Repository

```bash
cd ~/Desktop/crypto-wallet

# Initialize git
git init

# Add all files (respects .gitignore)
git add .

# Commit
git commit -m "Initial commit: Secure TRON & BNB crypto wallet"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"New repository"** (green button)
3. Repository name: `crypto-wallet` (or your choice)
4. Description: `Secure TRON & BNB cryptocurrency wallet`
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README" (you already have files)
7. Click **"Create repository"**

### Step 3: Connect and Push

GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/crypto-wallet.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login (use GitHub to sign in)
3. Click **"Add New Project"**
4. Select your `crypto-wallet` repository
5. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **"Deploy"** 🚀

That's it! Vercel will:
- Install dependencies
- Build your app
- Deploy it with HTTPS
- Give you a live URL

## 📋 Checklist Before Uploading

- [ ] All source files are in `src/` folder
- [ ] `package.json` exists
- [ ] `vite.config.ts` exists
- [ ] `.gitignore` exists
- [ ] No `node_modules` folder (will be ignored)
- [ ] No `dist` folder (will be ignored)
- [ ] No `.env` files with secrets

## 🔒 Security Reminder

✅ **Safe to upload:**
- All source code
- Configuration files
- Documentation

❌ **Never upload:**
- `.env` files with API keys
- Private keys (already encrypted in localStorage)
- `node_modules` (too large)

## 💡 After Deployment

Once deployed on Vercel:
- Your wallet works at your Vercel URL
- Data still stored in browser localStorage
- No backend needed
- HTTPS automatically enabled
- Free SSL certificate

## 🆘 Troubleshooting

**If Vercel build fails:**
- Check build logs in Vercel dashboard
- Make sure all files are uploaded
- Verify `package.json` has all dependencies

**If something is missing:**
- Make sure `.gitignore` isn't excluding important files
- Check that you committed all changes: `git status`

---

**Ready to upload? Just follow the steps above!** 🚀

