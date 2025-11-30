# 🚀 Quick Start Guide

## Step 1: Upload to GitHub

```bash
cd ~/Desktop/crypto-wallet

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TRON & BNB crypto wallet"

# Add your GitHub repository URL (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/crypto-wallet.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Click **"Deploy"**

**Done!** Your wallet will be live in 1-2 minutes. 🎉

---

## 📦 What Gets Uploaded

**✅ Included:**
- All source code (`src/` folder)
- Configuration files
- Package files
- Documentation

**❌ Excluded (automatically):**
- `node_modules/` (Vercel will install)
- `dist/` (Vercel will build)
- `.vite/` (cache)
- System files

---

## 🔗 Files Summary

All these files will be uploaded:

```
✅ package.json
✅ package-lock.json
✅ index.html
✅ vite.config.ts
✅ vercel.json
✅ tsconfig.json
✅ tsconfig.node.json
✅ .eslintrc.cjs
✅ .gitignore
✅ README.md
✅ src/ (all files)
```

See `GIT_UPLOAD_GUIDE.md` for detailed instructions.

