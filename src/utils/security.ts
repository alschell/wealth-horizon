
/**
 * Enhanced security utility functions to help protect against common web vulnerabilities
 */

// Sanitize strings to prevent XSS attacks - enhanced version
export const sanitizeHtml = (unsafeString: string): string => {
  if (!unsafeString) return '';
  
  return unsafeString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/javascript:/gi, 'removed:')
    .replace(/on\w+=/gi, 'data-removed=')
    .replace(/data:/gi, 'removed:'); // Prevent data: URLs which can be used for XSS
};

// More secure file name sanitization
export const sanitizeFileName = (fileName: string): string => {
  if (!fileName) return 'unnamed_file';
  
  // More comprehensive sanitization to prevent path traversal and shell injection
  const sanitized = fileName
    .replace(/[^\w\s.-]/g, '') // Remove special characters
    .replace(/\.{2,}/g, '.') // Prevent path traversal via multiple dots
    .replace(/^\.+|\.+$/g, '') // Remove leading/trailing dots
    .replace(/^\/+|\\+/g, '') // Remove leading slashes or backslashes
    .trim();
  
  // Limit length to prevent DoS
  const maxLength = 255;
  const truncated = sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
  
  // Ensure the filename isn't empty after sanitization
  return truncated || 'unnamed_file';
};

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

// Secure storage with expiration and domain binding
export const secureStore = {
  set: (
    key: string, 
    value: string, 
    options: { 
      expireInSeconds?: number, 
      secure?: boolean,
      sameSite?: 'Strict' | 'Lax' | 'None',
      path?: string,
      httpOnly?: boolean
    } = {}
  ): void => {
    const {
      expireInSeconds = 3600, // Default 1 hour
      secure = true,
      sameSite = 'Strict',
      path = '/',
      httpOnly = false // Can only be true for server-set cookies
    } = options;
    
    // Create cookie with security attributes
    const expires = new Date(Date.now() + expireInSeconds * 1000).toUTCString();
    let cookie = `${key}=${encodeURIComponent(value)}; path=${path}; expires=${expires}`;
    
    if (secure) cookie += '; Secure';
    if (httpOnly) cookie += '; HttpOnly';
    cookie += `; SameSite=${sameSite}`;
    
    document.cookie = cookie;
    
    // Fallback to localStorage if cookies are disabled
    try {
      localStorage.setItem(
        key, 
        JSON.stringify({
          value,
          expires: Date.now() + expireInSeconds * 1000
        })
      );
    } catch (error) {
      console.error('Failed to store in localStorage', error);
    }
  },
  
  get: (key: string): string | null => {
    // Try to get from cookie first
    const cookieMatch = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
    if (cookieMatch) return decodeURIComponent(cookieMatch[2]);
    
    // Fallback to localStorage
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const { value, expires } = JSON.parse(item);
      
      // Check if expired
      if (expires && expires < Date.now()) {
        localStorage.removeItem(key);
        return null;
      }
      
      return value;
    } catch (error) {
      console.error('Failed to retrieve from localStorage', error);
      return null;
    }
  },
  
  remove: (key: string, path: string = '/'): void => {
    // Remove from cookies
    document.cookie = `${key}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict`;
    
    // Remove from localStorage
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage', error);
    }
  }
};

// Set CSRF token using secure storage
export const storeCsrfToken = (token: string): void => {
  secureStore.set('csrf_token', token, {
    expireInSeconds: 3600,
    secure: true,
    sameSite: 'Strict'
  });
};

// Get stored CSRF token
export const getCsrfToken = (): string => {
  const token = secureStore.get('csrf_token');
  
  if (token) return token;
  
  // Generate a new token if none exists
  const newToken = generateCsrfToken();
  storeCsrfToken(newToken);
  return newToken;
};

// Validate path to prevent path traversal - enhanced version
export const validatePath = (path: string): boolean => {
  if (!path) return false;
  
  // Normalize path to handle different path separators
  const normalizedPath = path.replace(/\\/g, '/');
  
  // More comprehensive path validation
  return (
    !normalizedPath.includes('../') && 
    !normalizedPath.includes('..\\') && 
    !normalizedPath.includes('//') &&
    !normalizedPath.startsWith('/') &&
    !normalizedPath.includes(':\\') &&
    !normalizedPath.match(/^[a-zA-Z]:\//) &&
    !normalizedPath.match(/^\\\\/) // UNC paths
  );
};

// Enhanced URL validation to prevent open redirect vulnerabilities
export const validateUrl = (url: string, options: {
  allowedDomains?: string[],
  allowRelative?: boolean,
  allowDataUrls?: boolean,
  allowedProtocols?: string[]
} = {}): boolean => {
  if (!url) return false;
  
  const {
    allowedDomains = ['wealthhorizon.com', 'api.wealthhorizon.com', 'cdn.wealthhorizon.com'],
    allowRelative = true,
    allowDataUrls = false,
    allowedProtocols = ['https:', 'http:']
  } = options;
  
  // Allow relative URLs if specified
  if (allowRelative && url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }
  
  // Check data URLs if allowed
  if (url.startsWith('data:') && !allowDataUrls) {
    return false;
  }
  
  try {
    const urlObj = new URL(url, window.location.origin);
    
    // Check protocol
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    // Check domain
    return allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false; // Invalid URL
  }
};

// Content Security Policy nonce generator - enhanced
export const generateCspNonce = (): string => {
  return generateSecureToken(16, 'base64');
};

// Enhanced file content type validation
export const validateFileContentType = (
  file: File, 
  allowedTypes: string[],
  scanContent: boolean = false
): Promise<boolean> => {
  if (!allowedTypes.includes(file.type)) {
    return Promise.resolve(false);
  }
  
  // Basic validation passed, but we can do deeper scanning if required
  if (scanContent && file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // For images, try to load them to verify they're valid
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  }
  
  return Promise.resolve(true);
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

// Check for vulnerable patterns in user input - enhanced
export const containsInjectionPatterns = (input: string): boolean => {
  if (!input) return false;
  
  const dangerousPatterns = [
    /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i,
    /(document\.|window\.|eval\(|setTimeout\(|setInterval\()/i,
    /(alert\(|confirm\(|prompt\(|console\.)/i,
    /<iframe|<object|<embed|<img[^>]+src=["']?data:/i,
    /[<>'"=].*=[<>'"=]|data:/i,
    /\s+style\s*=\s*["']?\s*\w+\s*:\s*url/i,
    /url\(\s*["']?\s*data:/i
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};

// Encrypt sensitive data (client-side only, for transit) - enhanced
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

// Decrypt encrypted data
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

// Obfuscate sensitive data for logging or display
export const obfuscateData = (
  data: string,
  type: 'email' | 'phone' | 'creditCard' | 'ssn' | 'custom' = 'custom',
  customPattern?: RegExp
): string => {
  if (!data) return '';
  
  switch (type) {
    case 'email': {
      const [username, domain] = data.split('@');
      if (!domain) return '***@***';
      return `${username.charAt(0)}${'*'.repeat(username.length > 1 ? username.length - 1 : 1)}@${domain}`;
    }
    case 'phone':
      return data.replace(/(\d{1,3})(\d{3,})(\d{2,4})/, (_, a, b, c) => 
        `${a}${'*'.repeat(b.length)}${c}`
      );
    case 'creditCard':
      return data.replace(/(\d{4})(\d{8,})(\d{4})/, (_, a, b, c) => 
        `${a}${'*'.repeat(b.length)}${c}`
      );
    case 'ssn':
      return data.replace(/(\d{3})(\d{2})(\d{4})/, (_, a, b, c) => 
        `${a}-${b}-${'*'.repeat(4)}`
      );
    case 'custom':
      if (customPattern) {
        return data.replace(customPattern, '****');
      }
      // Default redaction for custom - hide middle portion
      const length = data.length;
      const visibleChars = Math.max(Math.floor(length * 0.25), 1);
      return `${data.slice(0, visibleChars)}${'*'.repeat(length - 2 * visibleChars)}${data.slice(length - visibleChars)}`;
  }
};
