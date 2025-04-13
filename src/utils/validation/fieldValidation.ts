
/**
 * Field validation utilities for form validation
 */

/**
 * Validates that a field is not empty
 * 
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns Error message or null if valid
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validates a field using a regular expression pattern
 * 
 * @param value - Value to validate
 * @param pattern - RegExp pattern to match
 * @param errorMessage - Custom error message
 * @returns Error message or null if valid
 */
export const validatePattern = (
  value: string, 
  pattern: RegExp, 
  errorMessage: string
): string | null => {
  if (!value) return null; // Empty values should be handled by validateRequired

  if (!pattern.test(value)) {
    return errorMessage;
  }
  return null;
};

/**
 * Validates an LEI (Legal Entity Identifier)
 * 
 * @param value - LEI value to validate
 * @returns Error message or null if valid
 */
export const validateLei = (value: string): string | null => {
  if (!value) return null; // Empty values should be handled by validateRequired
  
  // LEI is a 20-character alphanumeric string
  if (value.length !== 20) {
    return "LEI must be 20 characters";
  }
  
  // LEI format: 18 alphanumeric characters + 2 check digits
  const leiPattern = /^[0-9A-Z]{18}[0-9]{2}$/;
  if (!leiPattern.test(value)) {
    return "LEI must be 18 alphanumeric characters followed by 2 digits";
  }
  
  return null;
};

/**
 * Validates a date format
 * 
 * @param value - Date string to validate
 * @param format - Expected format (e.g., 'YYYY-MM-DD')
 * @returns Error message or null if valid
 */
export const validateDate = (value: string, format = 'YYYY-MM-DD'): string | null => {
  if (!value) return null; // Empty values should be handled by validateRequired
  
  // Basic date validation for ISO format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `Date must be in ${format} format`;
  }
  
  // Check if the date is valid
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  
  return null;
};

/**
 * Validates a field has a minimum length
 * 
 * @param value - Value to validate
 * @param minLength - Minimum length required
 * @param fieldName - Name of the field for error message
 * @returns Error message or null if valid
 */
export const validateMinLength = (
  value: string, 
  minLength: number, 
  fieldName: string
): string | null => {
  if (!value) return null; // Empty values should be handled by validateRequired
  
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};
