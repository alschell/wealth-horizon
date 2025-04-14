
/**
 * Security utilities for authentication, tokens, and encryption
 * with enhanced security and type safety
 */

/**
 * Supported token encoding formats
 */
export type TokenEncoding = 'hex' | 'base64';

/**
 * Security options for token generation
 */
export interface TokenOptions {
  /** Length of random bytes to generate */
  byteLength?: number;
  /** Encoding format for the token */
  encoding?: TokenEncoding;
  /** Whether to use URL-safe encoding (for base64) */
  urlSafe?: boolean;
}

/**
 * Password validation options with strict typing
 */
export interface PasswordValidationOptions {
  /** Minimum password length */
  minLength?: number;
  /** Maximum password length */
  maxLength?: number;
  /** Require at least one uppercase letter */
  requireUppercase?: boolean;
  /** Require at least one lowercase letter */
  requireLowercase?: boolean;
  /** Require at least one number */
  requireNumbers?: boolean;
  /** Require at least one special character */
  requireSpecialChars?: boolean;
  /** Check against common passwords */
  checkCommonPasswords?: boolean;
  /** Check for repetitive patterns */
  checkRepetitivePatterns?: boolean;
  /** Check for sequential patterns */
  checkSequentialPatterns?: boolean;
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  /** Whether the password is valid */
  valid: boolean;
  /** Validation message (error or success) */
  message: string;
  /** Detailed validation errors */
  errors?: string[];
  /** Estimated password strength (0-100) */
  strength?: number;
}

/**
 * Encryption options for more secure encryption
 */
export interface EncryptionOptions {
  /** Salt to use for key derivation (will be generated if not provided) */
  salt?: Uint8Array;
  /** Initialization vector (will be generated if not provided) */
  iv?: Uint8Array;
  /** Number of iterations for key derivation */
  iterations?: number;
  /** Algorithm to use for encryption */
  algorithm?: 'AES-GCM' | 'AES-CBC';
}

/**
 * Generate a cryptographically secure random string with specified length and encoding
 * 
 * @param options - Token generation options
 * @returns Secure random string
 */
export const generateSecureToken = (options: TokenOptions = {}): string => {
  const { 
    byteLength = 32, 
    encoding = 'hex',
    urlSafe = true
  } = options;
  
  const array = new Uint8Array(byteLength);
  window.crypto.getRandomValues(array);
  
  if (encoding === 'base64') {
    // Convert to base64
    let base64 = btoa(Array.from(array).map(b => String.fromCharCode(b)).join(''));
    
    // Make URL-safe if requested
    if (urlSafe) {
      base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    
    return base64;
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
  return generateSecureToken({ byteLength: 32, encoding: 'hex' });
};

/**
 * Generate Content Security Policy nonce
 * 
 * @returns CSP nonce string
 */
export const generateCspNonce = (): string => {
  return generateSecureToken({ byteLength: 16, encoding: 'base64', urlSafe: true });
};

/**
 * Encrypt sensitive data (client-side only, for transit)
 * 
 * @param data - String data to encrypt
 * @param encryptionKey - Key for encryption
 * @param options - Encryption options
 * @returns Promise resolving to encrypted string
 */
export const encryptData = async (
  data: string, 
  encryptionKey: string,
  options: Partial<EncryptionOptions> = {}
): Promise<string> => {
  try {
    // Convert string to bytes
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    const keyBytes = encoder.encode(encryptionKey);
    
    // Generate or use provided salt for key derivation
    const salt = options.salt || window.crypto.getRandomValues(new Uint8Array(16));
    
    // Derive a key from the provided password using PBKDF2
    const baseKey = await window.crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: options.iterations || 100000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    // Generate a random IV
    const iv = options.iv || window.crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the data
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      derivedKey,
      dataBytes
    );
    
    // Combine salt, IV and encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);
    
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
    
    // Extract salt, IV and encrypted data
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 16 + 12);
    const encryptedBuffer = combined.slice(16 + 12);
    
    // Import the key
    const keyBytes = new TextEncoder().encode(encryptionKey);
    const baseKey = await window.crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // Derive the same key used for encryption
    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    // Decrypt the data
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      derivedKey,
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
 * Validate password strength with comprehensive checks
 * 
 * @param password - Password to validate
 * @param options - Validation options
 * @returns Object with validity, message, errors and strength score
 */
export const validatePasswordStrength = (
  password: string,
  options: PasswordValidationOptions = {}
): PasswordValidationResult => {
  const {
    minLength = 12,
    maxLength = 128,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    checkCommonPasswords = true,
    checkRepetitivePatterns = true,
    checkSequentialPatterns = true
  } = options;
  
  if (!password) {
    return { valid: false, message: 'Password is required', errors: ['Password is required'], strength: 0 };
  }
  
  const errors: string[] = [];
  let strength = 0;
  
  // Basic length check
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  } else {
    // Award points for length (up to 40 points)
    strength += Math.min(40, Math.floor((password.length / minLength) * 25));
  }
  
  if (password.length > maxLength) {
    errors.push(`Password cannot exceed ${maxLength} characters`);
  }
  
  // Character composition checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  
  if (requireUppercase && !hasUppercase) {
    errors.push('Password must include at least one uppercase letter');
  } else if (hasUppercase) {
    strength += 10;
  }
  
  if (requireLowercase && !hasLowercase) {
    errors.push('Password must include at least one lowercase letter');
  } else if (hasLowercase) {
    strength += 10;
  }
  
  if (requireNumbers && !hasNumbers) {
    errors.push('Password must include at least one number');
  } else if (hasNumbers) {
    strength += 10;
  }
  
  if (requireSpecialChars && !hasSpecialChars) {
    errors.push('Password must include at least one special character');
  } else if (hasSpecialChars) {
    strength += 15;
  }
  
  // Additional checks
  if (checkCommonPasswords) {
    // Check for common patterns and dictionary words
    const commonPasswords = [
      'password', 'admin', '123456', 'qwerty', 'welcome', 
      'letmein', '12345678', 'baseball', 'football', 'monkey'
    ];
    
    if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
      errors.push('Password contains common words or patterns');
      strength = Math.max(0, strength - 25);
    }
  }
  
  if (checkRepetitivePatterns && /(.)\1{2,}/.test(password)) {
    errors.push('Password contains repetitive patterns');
    strength = Math.max(0, strength - 15);
  }
  
  if (checkSequentialPatterns) {
    const sequentialPatterns = [
      'abcdef', 'bcdefg', 'cdefgh', 'defghi',
      'qwerty', 'asdfgh', '123456', '654321'
    ];
    
    if (sequentialPatterns.some(seq => password.toLowerCase().includes(seq))) {
      errors.push('Password contains sequential patterns');
      strength = Math.max(0, strength - 15);
    }
  }
  
  // Character variety bonus (up to 15 points)
  const uniqueChars = new Set(password.split('')).size;
  const varietyBonus = Math.min(15, Math.floor((uniqueChars / password.length) * 25));
  strength += varietyBonus;
  
  // Cap strength at 100
  strength = Math.min(100, strength);
  
  // Determine final validity
  const valid = errors.length === 0;
  
  return {
    valid,
    message: valid ? 'Password meets all requirements' : errors[0],
    errors: errors.length > 0 ? errors : undefined,
    strength
  };
};
