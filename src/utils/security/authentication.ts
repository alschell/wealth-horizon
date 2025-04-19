
import { validatePasswordStrength } from './validation/passwordValidation';

/**
 * Generate a cryptographically secure random string
 */
export const generateSecureToken = (
  byteLength: number = 32, 
  encoding: 'hex' | 'base64' = 'hex'
): string => {
  const array = new Uint8Array(byteLength);
  window.crypto.getRandomValues(array);
  
  if (encoding === 'base64') {
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Generate CSRF token using secure random values
 */
export const generateCsrfToken = (): string => {
  return generateSecureToken(32, 'hex');
};

/**
 * Generate CSP nonce for content security
 */
export const generateCspNonce = (): string => {
  return generateSecureToken(16, 'base64');
};

export { validatePasswordStrength };
