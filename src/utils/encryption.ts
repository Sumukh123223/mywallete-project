import CryptoJS from 'crypto-js';

// Enhanced encryption with salt and key derivation
export function encrypt(text: string, password: string): string {
  // Generate a random salt for each encryption
  const salt = CryptoJS.lib.WordArray.random(128/8);
  
  // Derive key using PBKDF2 with 10000 iterations
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 10000
  });
  
  // Generate random IV for each encryption
  const iv = CryptoJS.lib.WordArray.random(128/8);
  
  // Encrypt with AES-256-CBC
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  
  // Combine salt + iv + encrypted data
  const combined = salt.toString() + iv.toString() + encrypted.toString();
  return combined;
}

export function decrypt(encryptedText: string, password: string): string {
  try {
    // Extract salt (first 32 hex chars = 128 bits)
    const salt = CryptoJS.enc.Hex.parse(encryptedText.substr(0, 32));
    
    // Extract IV (next 32 hex chars = 128 bits)
    const iv = CryptoJS.enc.Hex.parse(encryptedText.substr(32, 32));
    
    // Extract encrypted data (rest)
    const encrypted = encryptedText.substring(64);
    
    // Derive key using same parameters
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256/32,
      iterations: 10000
    });
    
    // Decrypt
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data. Incorrect password or corrupted data.');
  }
}

export function hashPassword(password: string): string {
  // Use SHA-256 for password hashing (for verification, not storage)
  return CryptoJS.SHA256(password).toString();
}

export function generateSecurePassword(length: number = 16): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  
  return password;
}

