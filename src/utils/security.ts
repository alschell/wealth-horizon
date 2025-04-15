
/**
 * Sanitizes a file name to prevent path traversal attacks
 * @param fileName The original file name
 * @returns The sanitized file name
 */
export const sanitizeFileName = (fileName: string): string => {
  // Remove any path components (slashes, backslashes)
  let sanitized = fileName.replace(/[/\\]/g, '');
  
  // Remove any potential harmful characters
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '');
  
  // Prevent null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Prevent overly long file names
  if (sanitized.length > 255) {
    const extension = sanitized.lastIndexOf('.');
    if (extension > 0) {
      sanitized = sanitized.substring(0, 251) + sanitized.substring(extension);
    } else {
      sanitized = sanitized.substring(0, 255);
    }
  }
  
  // Prevent empty file names
  if (sanitized.length === 0) {
    sanitized = 'unnamed_file';
  }
  
  return sanitized;
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html The original HTML content
 * @returns The sanitized HTML content
 */
export const sanitizeHtml = (html: string): string => {
  // Replace potentially dangerous tags
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<base\b[^<]*(?:(?!<\/base>)<[^<]*)*<\/base>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '') // Remove inline event handlers
    .replace(/javascript:/gi, 'removed:'); // Remove javascript: protocol
};

/**
 * Validates an email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password strength
 * @param password The password to validate
 * @returns An object with validation results
 */
export const validatePasswordStrength = (password: string): { 
  isValid: boolean; 
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
} => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  
  return {
    isValid,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar
  };
};
