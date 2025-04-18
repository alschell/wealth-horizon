
/**
 * Authentication related security utilities
 */

// Generate a cryptographically secure random string with specified length and encoding
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

// Generate a cryptographically secure random CSRF token
export const generateCsrfToken = (): string => {
  return generateSecureToken(32, 'hex');
};

// Strong password validation
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
): { valid: boolean, message: string, strength?: number, errors?: string[] } => {
  const {
    minLength = 12,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    maxLength = 128
  } = options;
  
  const errors: string[] = [];
  
  if (!password) {
    return { valid: false, message: 'Password is required', strength: 0, errors: ['Password is required'] };
  }
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (password.length > maxLength) {
    errors.push(`Password cannot exceed ${maxLength} characters`);
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must include at least one uppercase letter');
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must include at least one lowercase letter');
  }
  
  if (requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must include at least one number');
  }
  
  if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must include at least one special character');
  }
  
  // Check for common patterns and dictionary words
  if (/^123456|password|admin|qwerty|welcome|123123/i.test(password)) {
    errors.push('Password is too common and easily guessable');
  }
  
  // Check for repetitive patterns
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password contains repetitive patterns');
  }
  
  // Check for sequential characters
  if (/abcdef|bcdefg|cdefgh|defghi|qwerty|asdfgh/i.test(password)) {
    errors.push('Password contains sequential characters');
  }
  
  // Calculate password strength (0-100)
  const lengthScore = Math.min(password.length / 20, 1) * 25;
  const varietyScore = (
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0)
  ) * 15;
  const uniqueCharsScore = (new Set(password).size / password.length) * 35;
  
  const strength = Math.round(lengthScore + varietyScore + uniqueCharsScore);
  
  return { 
    valid: errors.length === 0, 
    message: errors.length === 0 ? 'Password meets all requirements' : errors[0],
    strength,
    errors: errors.length > 0 ? errors : undefined
  };
};

// Content Security Policy nonce generator
export const generateCspNonce = (): string => {
  return generateSecureToken(16, 'base64');
};

// Add missing encryption and decryption functions
export const encryptData = async (data: string, key: string): Promise<string> => {
  // This is a placeholder for actual encryption logic
  // In a real application, you would use the Web Crypto API for proper encryption
  console.warn('Using placeholder encryption - implement proper encryption in production');
  return btoa(`${key}:${data}`);
};

export const decryptData = async (encryptedData: string, key: string): Promise<string> => {
  // This is a placeholder for actual decryption logic
  // In a real application, you would use the Web Crypto API for proper decryption
  console.warn('Using placeholder decryption - implement proper decryption in production');
  try {
    const decoded = atob(encryptedData);
    const parts = decoded.split(':');
    if (parts[0] !== key) {
      throw new Error('Invalid encryption key');
    }
    return parts.slice(1).join(':');
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
};
