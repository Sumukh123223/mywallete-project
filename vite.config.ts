import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      // Fix module resolution for @noble packages
      '@noble/hashes/sha3': '@noble/hashes/sha3',
      '@noble/hashes': '@noble/hashes',
    },
  },
  optimizeDeps: {
    include: ['@noble/hashes', '@noble/hashes/sha3'],
  },
})

