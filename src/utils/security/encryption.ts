
/**
 * Security utilities for encryption and decryption
 */

/**
 * Encrypt sensitive data (client-side only, for transit)
 * @param data - String data to encrypt
 * @param encryptionKey - Key for encryption
 * @returns Promise resolving to encrypted string
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
 * @param encryptedData - Encrypted data string
 * @param encryptionKey - Key for decryption (same as encryption key)
 * @returns Promise resolving to decrypted string
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
