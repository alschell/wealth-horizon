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
 * Strong password validation result
 */
export interface PasswordValidationResult {
  valid: boolean;
  message: string;
  strength?: number;
  errors?: string[];
}

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
): PasswordValidationResult => {
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
    return { valid: false, message: 'Password is required', errors: ['Password is required'] };
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
  let strength = 0;
  
  // Base score based on length
  strength += Math.min(password.length * 4, 40);
  
  // Add points for variety
  if (/[A-Z]/.test(password)) strength += 10;
  if (/[a-z]/.test(password)) strength += 10;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 15;
  
  // Subtract for patterns
  if (/(.)\1{2,}/.test(password)) strength -= 10;
  if (/^123456|password|admin|qwerty|welcome|123123/i.test(password)) strength -= 20;
  
  // Ensure strength is within bounds
  strength = Math.max(0, Math.min(100, strength));
  
  const valid = errors.length === 0;
  const message = valid ? 
    'Password meets all requirements' : 
    errors[0]; // Return the first error message
  
  return { valid, message, strength, errors };
};
