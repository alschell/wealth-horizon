
/**
 * Security utility functions to help protect against common web vulnerabilities
 */

// Sanitize strings to prevent XSS attacks
export const sanitizeHtml = (unsafeString: string): string => {
  return unsafeString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Sanitize file names to prevent XSS and command injection
export const sanitizeFileName = (fileName: string): string => {
  // More comprehensive sanitization to prevent path traversal and shell injection
  const sanitized = fileName
    .replace(/[^\w\s.-]/g, '') // Remove special characters
    .replace(/\.{2,}/g, '.') // Prevent path traversal via multiple dots
    .replace(/^\.+|\.+$/g, '') // Remove leading/trailing dots
    .trim();
  
  // Ensure the filename isn't empty after sanitization
  return sanitized || 'unnamed_file';
};

// Generate a cryptographically secure random CSRF token
export const generateCsrfToken = (): string => {
  // Use crypto.getRandomValues for better randomness
  const array = new Uint8Array(32); // 256 bits for stronger security
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Set CSRF token in a cookie or localStorage
export const storeCsrfToken = (token: string): void => {
  // Store in cookie (preferred method)
  document.cookie = `csrf_token=${token}; path=/; SameSite=Strict; secure; max-age=3600`;
  
  // Fallback to localStorage if cookies are disabled
  try {
    localStorage.setItem('csrf_token', token);
  } catch (error) {
    console.error('Failed to store CSRF token in localStorage');
  }
};

// Get stored CSRF token
export const getCsrfToken = (): string => {
  // Try to get from cookie first
  const match = document.cookie.match(/csrf_token=([^;]+)/);
  if (match) return match[1];
  
  // Fallback to localStorage
  try {
    const token = localStorage.getItem('csrf_token');
    if (token) return token;
  } catch (error) {
    console.error('Failed to retrieve CSRF token from localStorage');
  }
  
  // Generate a new token if none exists
  const newToken = generateCsrfToken();
  storeCsrfToken(newToken);
  return newToken;
};

// Validate path to prevent path traversal
export const validatePath = (path: string): boolean => {
  // More comprehensive path validation
  return (
    !path.includes('../') && 
    !path.includes('..\\') && 
    !path.includes('//') &&
    !path.startsWith('/') &&
    !path.startsWith('\\')
  );
};

// Validate URL to prevent open redirect vulnerabilities
export const validateUrl = (url: string): boolean => {
  // Ensure URL is relative or points to trusted domains
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true; // Relative URL is safe
  }
  
  try {
    const urlObj = new URL(url);
    const trustedDomains = [
      'wealthhorizon.com',
      'api.wealthhorizon.com',
      'cdn.wealthhorizon.com'
    ];
    return trustedDomains.some(domain => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`));
  } catch {
    return false; // Invalid URL
  }
};

// Content Security Policy nonce generator
export const generateCspNonce = (): string => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Validate file content type
export const validateFileContentType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// Encrypt sensitive data (client-side only, for transit)
export const encryptData = (data: string, key: string): string => {
  // This is a simplified implementation
  // In a real app, use a proper encryption library
  const textEncoder = new TextEncoder();
  const encoded = textEncoder.encode(data);
  
  // XOR with key (very basic encryption, not for production use)
  const keyBytes = textEncoder.encode(key);
  const encrypted = new Uint8Array(encoded.length);
  
  for (let i = 0; i < encoded.length; i++) {
    encrypted[i] = encoded[i] ^ keyBytes[i % keyBytes.length];
  }
  
  return Array.from(encrypted, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Check for vulnerable patterns in user input
export const containsInjectionPatterns = (input: string): boolean => {
  const dangerousPatterns = [
    /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i,
    /(document\.|window\.|eval\(|setTimeout\(|setInterval\()/i,
    /(alert\(|confirm\(|prompt\(|console\.)/i
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};
