
// Security utility functions

/**
 * Sanitizes a filename by removing potentially dangerous characters
 * Prevents directory traversal and other file-related attacks
 */
export const sanitizeFileName = (fileName: string): string => {
  // First remove any directory traversal characters
  let sanitized = fileName.replace(/\.\.\//g, '').replace(/\\/g, '');
  
  // Remove any leading directory paths
  sanitized = sanitized.split(/[\/\\]/).pop() || sanitized;
  
  // Remove any potentially dangerous characters
  sanitized = sanitized.replace(/[^\w\s.-]/g, '');
  
  return sanitized;
};

/**
 * Sanitizes input text for display
 * Helps prevent XSS by stripping HTML tags
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * Sanitizes a URL to prevent javascript: protocol and other malicious links
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  // Check for javascript: protocol and other potentially harmful protocols
  const sanitized = url.replace(/javascript:/gi, '').replace(/data:/gi, '');
  
  // If the URL doesn't start with http, https, or /, it might be suspicious
  if (!sanitized.startsWith('http://') && 
      !sanitized.startsWith('https://') && 
      !sanitized.startsWith('/')) {
    return '';
  }
  
  return sanitized;
};

/**
 * Generate a random secure token
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
