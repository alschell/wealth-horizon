
/**
 * Validates a required field
 * @param value - The value to validate
 * @param fieldName - The name of the field for error messaging
 * @returns An error message if invalid, or undefined if valid
 */
export const validateRequired = (value: string, fieldName: string = 'Field'): string | undefined => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return undefined;
};

/**
 * Validates an email address
 * @param value - The email to validate
 * @returns An error message if invalid, or undefined if valid
 */
export const validateEmail = (value: string): string | undefined => {
  if (!value) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
};

/**
 * Validates a phone number
 * @param value - The phone number to validate
 * @returns An error message if invalid, or undefined if valid
 */
export const validatePhone = (value: string): string | undefined => {
  if (!value) {
    return 'Phone number is required';
  }
  
  // Allow for international format with + and spaces, hyphens, parentheses
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  if (!phoneRegex.test(value)) {
    return 'Please enter a valid phone number';
  }
  
  // Ensure minimum length after removing non-digits
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length < 8) {
    return 'Phone number is too short';
  }
  
  return undefined;
};

/**
 * Validates a password meets strength requirements
 * @param value - The password to validate
 * @returns An error message if invalid, or undefined if valid
 */
export const validatePassword = (value: string): string | undefined => {
  if (!value) {
    return 'Password is required';
  }
  
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  
  // At least one uppercase, one lowercase, one number, one special character
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
  if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
    return 'Password must include uppercase, lowercase, number and special character';
  }
  
  return undefined;
};

/**
 * Validates if two passwords match
 * @param password - The main password
 * @param confirm - The confirmation password
 * @returns An error message if invalid, or undefined if valid
 */
export const validatePasswordMatch = (password: string, confirm: string): string | undefined => {
  if (!confirm) {
    return 'Please confirm your password';
  }
  
  if (password !== confirm) {
    return 'Passwords do not match';
  }
  
  return undefined;
};

/**
 * Validates a URL
 * @param value - The URL to validate
 * @returns An error message if invalid, or undefined if valid
 */
export const validateUrl = (value: string): string | undefined => {
  if (!value) {
    return undefined; // URL might be optional
  }
  
  try {
    new URL(value);
    return undefined;
  } catch (e) {
    return 'Please enter a valid URL';
  }
};

/**
 * Validates a number is within a range
 * @param value - The number to validate
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns An error message if invalid, or undefined if valid
 */
export const validateNumberRange = (value: number, min?: number, max?: number): string | undefined => {
  if (value === undefined || value === null) {
    return 'Value is required';
  }
  
  if (min !== undefined && value < min) {
    return `Value must be at least ${min}`;
  }
  
  if (max !== undefined && value > max) {
    return `Value must be at most ${max}`;
  }
  
  return undefined;
};
