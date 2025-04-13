
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
  return fileName.replace(/[^\w\s.-]/g, '');
};

// Generate a random CSRF token for forms
export const generateCsrfToken = (): string => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Set CSRF token in a cookie or localStorage
export const storeCsrfToken = (token: string): void => {
  // Store in cookie (preferred method)
  document.cookie = `csrf_token=${token}; path=/; SameSite=Strict; secure`;
  
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
  // Check if path contains directory traversal patterns
  return !path.includes('../') && !path.includes('..\\');
};
