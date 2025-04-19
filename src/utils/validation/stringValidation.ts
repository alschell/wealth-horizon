
/**
 * String validation utilities
 */

/**
 * Validates an email address
 * 
 * @param email Email to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateEmail = (
  email: string,
  options: { required?: boolean } = {}
): string | null => {
  const { required = false } = options;

  if (!email) {
    return required ? 'Email is required' : null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Invalid email address';
};

/**
 * Validates a phone number
 * 
 * @param phone Phone number to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validatePhone = (
  phone: string,
  options: { required?: boolean } = {}
): string | null => {
  const { required = false } = options;

  if (!phone) {
    return required ? 'Phone number is required' : null;
  }

  // This is a simple regex that matches various phone formats
  // For production, consider using a more robust solution or library
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone) ? null : 'Invalid phone number';
};

/**
 * Validates a URL
 * 
 * @param url URL to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateUrl = (
  url: string,
  options: { required?: boolean } = {}
): string | null => {
  const { required = false } = options;

  if (!url) {
    return required ? 'URL is required' : null;
  }

  try {
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL';
  }
};

/**
 * Validates a password against common requirements
 * 
 * @param password Password to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validatePassword = (
  password: string,
  options: {
    required?: boolean;
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): string | null => {
  const {
    required = false,
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true
  } = options;

  if (!password) {
    return required ? 'Password is required' : null;
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters`;
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (requireNumbers && !/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character';
  }

  return null;
};

/**
 * Validates text against a minimum length requirement
 * 
 * @param text Text to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateMinLength = (
  text: string,
  options: { minLength: number; required?: boolean; fieldName?: string }
): string | null => {
  const { minLength, required = false, fieldName = 'Field' } = options;

  if (!text) {
    return required ? `${fieldName} is required` : null;
  }

  if (text.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }

  return null;
};

/**
 * Validates text against a maximum length requirement
 * 
 * @param text Text to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateMaxLength = (
  text: string,
  options: { maxLength: number; fieldName?: string }
): string | null => {
  const { maxLength, fieldName = 'Field' } = options;

  if (text.length > maxLength) {
    return `${fieldName} must be at most ${maxLength} characters`;
  }

  return null;
};
