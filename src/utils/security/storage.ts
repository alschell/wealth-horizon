
/**
 * Security utilities for secure data storage in local storage and cookies
 */

/**
 * Secure storage with expiration and domain binding
 */
export const secureStore = {
  /**
   * Store data securely with expiration
   * @param key - Storage key
   * @param value - Value to store
   * @param options - Storage options including expiration
   */
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
  
  /**
   * Get stored data
   * @param key - Storage key
   * @returns Retrieved data or null if not found/expired
   */
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
  
  /**
   * Remove stored data
   * @param key - Storage key
   * @param path - Cookie path
   */
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

/**
 * Set CSRF token using secure storage
 * @param token - CSRF token
 */
export const storeCsrfToken = (token: string): void => {
  secureStore.set('csrf_token', token, {
    expireInSeconds: 3600,
    secure: true,
    sameSite: 'Strict'
  });
};

/**
 * Get stored CSRF token or generate a new one
 * @returns CSRF token
 */
export const getCsrfToken = (): string => {
  const token = secureStore.get('csrf_token');
  
  if (token) return token;
  
  // Import needed to avoid circular dependency
  const { generateCsrfToken } = require('./authentication');
  
  // Generate a new token if none exists
  const newToken = generateCsrfToken();
  storeCsrfToken(newToken);
  return newToken;
};
