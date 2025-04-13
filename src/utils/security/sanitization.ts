
/**
 * Security utilities for sanitizing user input
 * Prevents XSS attacks and other injection vulnerabilities
 */

/**
 * Sanitizes strings to prevent XSS attacks - enhanced version
 * 
 * @param unsafeString - String to sanitize
 * @returns Sanitized string
 */
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

/**
 * More secure file name sanitization with enhanced protection
 * 
 * @param fileName - File name to sanitize
 * @returns Sanitized file name
 */
export const sanitizeFileName = (fileName: string): string => {
  try {
    if (!fileName) return 'unnamed_file';
    
    // More comprehensive sanitization to prevent path traversal and shell injection
    const sanitized = fileName
      .replace(/[^\w\s.-]/g, '') // Remove special characters
      .replace(/\.{2,}/g, '.') // Prevent path traversal via multiple dots
      .replace(/^\.+|\.+$/g, '') // Remove leading/trailing dots
      .replace(/^\/+|\\+/g, '') // Remove leading slashes or backslashes
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, 'invalid_$1') // Prevent reserved Windows filenames
      .replace(/[<>:"\/\\|?*\x00-\x1F]/g, '') // Remove characters not allowed in filenames
      .trim();
    
    // Limit length to prevent DoS
    const maxLength = 255;
    const truncated = sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
    
    // Ensure the filename isn't empty after sanitization
    return truncated || 'unnamed_file_' + Date.now(); // Fallback with timestamp
  } catch (error) {
    console.error("Error sanitizing filename:", error);
    return 'unnamed_file_' + Date.now(); // Fallback with timestamp
  }
};

/**
 * Checks for vulnerable patterns in user input
 * 
 * @param input - String to check
 * @returns Boolean indicating if dangerous patterns were found
 */
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

/**
 * Validate path to prevent path traversal 
 * 
 * @param path - Path to validate
 * @returns Boolean indicating if path is safe
 */
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

/**
 * Obfuscate sensitive data for logging or display
 * 
 * @param data - Data to obfuscate
 * @param type - Type of data for appropriate obfuscation
 * @param customPattern - Custom regex pattern for obfuscation
 * @returns Obfuscated string
 */
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
