
/**
 * Common validation utilities used throughout the application
 */

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a password against common requirements
 * @param password - The password to validate
 * @param options - Validation options
 * @returns An object containing validation results
 */
export function validatePassword(
  password: string, 
  options = { 
    minLength: 8, 
    requireUppercase: true, 
    requireLowercase: true, 
    requireNumber: true, 
    requireSpecial: true 
  }
): { 
  valid: boolean; 
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < options.minLength) {
    errors.push(`Password must be at least ${options.minLength} characters long`);
  }
  
  if (options.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (options.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (options.requireNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (options.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates a phone number
 * @param phone - The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export function validatePhone(phone: string): boolean {
  // Allows formats like (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Validates a URL
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Checks if a value is empty (null, undefined, empty string, or empty array)
 * @param value - The value to check
 * @returns True if the value is empty, false otherwise
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Checks if a value is a valid number
 * @param value - The value to check
 * @returns True if the value is a valid number, false otherwise
 */
export function isValidNumber(value: any): boolean {
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return !isNaN(parsed);
  }
  return false;
}

/**
 * Checks if a date is valid
 * @param date - The date to validate
 * @returns True if the date is valid, false otherwise
 */
export function isValidDate(date: Date | string): boolean {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  
  if (typeof date === 'string') {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }
  
  return false;
}
