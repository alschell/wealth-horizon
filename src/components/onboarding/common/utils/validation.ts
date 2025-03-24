
/**
 * Form validation utility functions
 */

export type ValidationError = Record<string, string>;

/**
 * Validates required fields in a form data object
 * 
 * @param data Object containing form data
 * @param requiredFields Array of field names that are required
 * @returns Object with validation errors (if any)
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  data: T, 
  requiredFields: (keyof T)[]
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  requiredFields.forEach(field => {
    // Check for undefined, null, empty string, or empty array
    const value = data[field];
    
    if (
      value === undefined || 
      value === null || 
      value === '' || 
      (Array.isArray(value) && value.length === 0)
    ) {
      errors[field] = 'This field is required';
    }
  });
  
  return errors;
};

/**
 * Validates email format
 * 
 * @param email Email string to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 * 
 * @param phone Phone number string to validate
 * @returns Boolean indicating if phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Basic validation - can be enhanced for specific formats
  const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates percentage format (0-100)
 * 
 * @param value Percentage value to validate
 * @returns Boolean indicating if percentage is valid
 */
export const isValidPercentage = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 && num <= 100;
};

/**
 * Validates URL format
 * 
 * @param url URL string to validate
 * @returns Boolean indicating if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
