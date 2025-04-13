
/**
 * Security utilities for authentication, tokens, and encryption
 */

/**
 * Generate a cryptographically secure random string with specified length and encoding
 * 
 * @param byteLength - Length of the random bytes to generate
 * @param encoding - Encoding to use for the output string
 * @returns Secure random string
 */
export const generateSecureToken = (
  byteLength: number = 32, 
  encoding: 'hex' | 'base64' = 'hex'
): string => {
  const array = new Uint8Array(byteLength);
  window.crypto.getRandomValues(array);
  
  if (encoding === 'base64') {
    // Convert to base64
    return btoa(Array.from(array).map(b => String.fromCharCode(b)).join(''))
      .replace(/\+/g, '-') // URL-safe base64
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  
  // Default to hex encoding
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Generate a cryptographically secure random CSRF token
 * 
 * @returns CSRF token string
 */
export const generateCsrfToken = (): string => {
  return generateSecureToken(32, 'hex');
};

/**
 * Generate Content Security Policy nonce
 * 
 * @returns CSP nonce string
 */
export const generateCspNonce = (): string => {
  return generateSecureToken(16, 'base64');
};

/**
 * Encrypt sensitive data (client-side only, for transit)
 * 
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
 * 
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

/**
 * Validate password strength
 * 
 * @param password - Password to validate
 * @param options - Validation options
 * @returns Object with validity and message
 */
export const validatePasswordStrength = (
  password: string,
  options: {
    minLength?: number,
    requireUppercase?: boolean,
    requireLowercase?: boolean,
    requireNumbers?: boolean,
    requireSpecialChars?: boolean,
    maxLength?: number
  } = {}
): { valid: boolean, message: string } => {
  const {
    minLength = 12,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    maxLength = 128
  } = options;
  
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (password.length < minLength) {
    return { valid: false, message: `Password must be at least ${minLength} characters long` };
  }
  
  if (password.length > maxLength) {
    return { valid: false, message: `Password cannot exceed ${maxLength} characters` };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must include at least one uppercase letter' };
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must include at least one lowercase letter' };
  }
  
  if (requireNumbers && !/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must include at least one number' };
  }
  
  if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: 'Password must include at least one special character' };
  }
  
  // Check for common patterns and dictionary words
  if (/^123456|password|admin|qwerty|welcome|123123/i.test(password)) {
    return { valid: false, message: 'Password is too common and easily guessable' };
  }
  
  // Check for repetitive patterns
  if (/(.)\1{2,}/.test(password)) {
    return { valid: false, message: 'Password contains repetitive patterns' };
  }
  
  // Check for sequential characters
  if (/abcdef|bcdefg|cdefgh|defghi|qwerty|asdfgh/i.test(password)) {
    return { valid: false, message: 'Password contains sequential characters' };
  }
  
  return { valid: true, message: 'Password meets all requirements' };
};
