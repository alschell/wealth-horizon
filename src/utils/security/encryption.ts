
/**
 * Security utilities for encryption operations
 */

/**
 * Result of encryption with metadata
 */
export interface EncryptionResult {
  ciphertext: string;
  iv: string;
  salt?: string;
  algorithm: string;
  keyDerivation?: string;
}

/**
 * Encrypt sensitive data (client-side only, for transit)
 * @param data - Data to encrypt
 * @param encryptionKey - Encryption key
 * @returns Encrypted data
 */
export const encryptData = async (
  data: string, 
  encryptionKey: string
): Promise<string> => {
  try {
    // Convert string to bytes
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    const keyBytes = encoder.encode(encryptionKey);
    
    // Create a key from the provided string (using SHA-256)
    const cryptoKey = await window.crypto.subtle.digest(
      'SHA-256',
      keyBytes
    );
    
    // Generate a random IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Import the key for encryption
    const key = await window.crypto.subtle.importKey(
      'raw',
      cryptoKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    // Encrypt the data
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBytes
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);
    
    // Convert to base64 string for transport
    return btoa(Array.from(combined).map(b => String.fromCharCode(b)).join(''));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypt encrypted data
 * @param encryptedData - Encrypted data
 * @param encryptionKey - Encryption key
 * @returns Decrypted data
 */
export const decryptData = async (
  encryptedData: string, 
  encryptionKey: string
): Promise<string> => {
  try {
    // Convert base64 to bytes
    const combined = new Uint8Array(
      atob(encryptedData).split('').map(c => c.charCodeAt(0))
    );
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encryptedBuffer = combined.slice(12);
    
    // Create a key from the provided string (using SHA-256)
    const keyBytes = new TextEncoder().encode(encryptionKey);
    const cryptoKey = await window.crypto.subtle.digest(
      'SHA-256',
      keyBytes
    );
    
    // Import the key for decryption
    const key = await window.crypto.subtle.importKey(
      'raw',
      cryptoKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    // Decrypt the data
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedBuffer
    );
    
    // Convert to string
    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Encrypt data with additional metadata for stronger security
 * @param data - Data to encrypt
 * @param password - Encryption password
 * @returns Encryption result with metadata
 */
export const encryptDataWithMetadata = async (
  data: string, 
  password: string
): Promise<EncryptionResult> => {
  try {
    // Generate a random salt
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    
    // Generate a key using PBKDF2
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    
    // Derive the actual encryption key
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    // Generate a random IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the data
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(data)
    );
    
    // Convert binary data to base64 strings
    const ivBase64 = btoa(Array.from(iv).map(b => String.fromCharCode(b)).join(''));
    const saltBase64 = btoa(Array.from(salt).map(b => String.fromCharCode(b)).join(''));
    const ciphertextBase64 = btoa(
      Array.from(new Uint8Array(encryptedBuffer)).map(b => String.fromCharCode(b)).join('')
    );
    
    // Return encrypted data with metadata
    return {
      ciphertext: ciphertextBase64,
      iv: ivBase64,
      salt: saltBase64,
      algorithm: 'AES-GCM-256',
      keyDerivation: 'PBKDF2-SHA256-100000'
    };
  } catch (error) {
    console.error('Enhanced encryption error:', error);
    throw new Error('Failed to encrypt data with metadata');
  }
};

/**
 * Decrypt data with metadata
 * @param encryptionResult - Encryption result with metadata
 * @param password - Encryption password
 * @returns Decrypted data
 */
export const decryptDataWithMetadata = async (
  encryptionResult: EncryptionResult,
  password: string
): Promise<string> => {
  try {
    // Extract encryption parameters
    const { ciphertext, iv, salt, algorithm } = encryptionResult;
    
    if (algorithm !== 'AES-GCM-256') {
      throw new Error(`Unsupported encryption algorithm: ${algorithm}`);
    }
    
    if (!salt) {
      throw new Error('Missing salt for key derivation');
    }
    
    // Convert base64 strings back to binary
    const ivArray = new Uint8Array(
      atob(iv).split('').map(c => c.charCodeAt(0))
    );
    
    const saltArray = new Uint8Array(
      atob(salt).split('').map(c => c.charCodeAt(0))
    );
    
    const encryptedArray = new Uint8Array(
      atob(ciphertext).split('').map(c => c.charCodeAt(0))
    );
    
    // Derive the decryption key
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltArray,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    // Decrypt the data
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivArray },
      key,
      encryptedArray
    );
    
    // Convert back to string
    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error('Enhanced decryption error:', error);
    throw new Error('Failed to decrypt data with metadata');
  }
};
