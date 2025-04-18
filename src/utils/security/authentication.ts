
/**
 * Security utilities for authentication and token management
 */

/**
 * Generate a cryptographically secure random string with specified length and encoding
 * @param byteLength - Length of random bytes
 * @param encoding - Encoding format
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
 * @returns CSRF token string
 */
export const generateCsrfToken = (): string => {
  return generateSecureToken(32, 'hex');
};

/**
 * Generate a Content Security Policy nonce
 * @returns CSP nonce
 */
export const generateCspNonce = (): string => {
  return generateSecureToken(16, 'base64');
};

/**
 * Strong password validation
 * @param password - Password to validate
 * @param options - Validation options
 * @returns Validation result
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
