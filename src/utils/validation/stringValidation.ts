
/**
 * String validation utilities
 */

/**
 * Validates if a string is a valid email
 * @param email - Email string to validate
 * @returns Error message or null if valid
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Validates if a string is a valid phone number
 * @param phone - Phone number to validate
 * @returns Error message or null if valid
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Phone number is required';
  
  // Basic validation for phone numbers
  const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  
  return null;
};

/**
 * Validates if a string is a valid URL
 * @param url - URL to validate
 * @returns Error message or null if valid
 */
export const validateUrl = (url: string): string | null => {
  if (!url) return 'URL is required';
  
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

/**
 * Validates if a password meets complexity requirements
 * @param password - Password to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validatePassword = (
  password: string,
  options = { minLength: 8, requireSpecial: true }
): string | null => {
  if (!password) return 'Password is required';
  
  if (password.length < options.minLength) {
    return `Password must be at least ${options.minLength} characters`;
  }
  
  if (options.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  
  return null;
};
