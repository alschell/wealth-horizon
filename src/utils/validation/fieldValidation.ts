
/**
 * Field-level validation functions
 */

/**
 * Validates that a field is not empty
 * @param value - Field value to validate
 * @param message - Custom error message
 * @returns Error message or null if valid
 */
export const validateRequired = (
  value: any,
  message = 'This field is required'
): string | null => {
  if (
    value === undefined || 
    value === null || 
    value === '' || 
    (Array.isArray(value) && value.length === 0)
  ) {
    return message;
  }
  return null;
};

/**
 * Validates a value against a regex pattern
 * @param value - Value to validate
 * @param pattern - Regex pattern
 * @param message - Custom error message
 * @returns Error message or null if valid
 */
export const validatePattern = (
  value: string, 
  pattern: RegExp, 
  message = 'Invalid format'
): string | null => {
  if (!value) return null; // Don't validate empty values
  if (!pattern.test(value)) {
    return message;
  }
  return null;
};

/**
 * Validates a Legal Entity Identifier (LEI)
 * @param lei - LEI to validate
 * @returns Error message or null if valid
 */
export const validateLei = (lei: string): string | null => {
  if (!lei) return null; // Don't validate empty values
  
  // LEI is a 20-character alphanumeric string
  const leiPattern = /^[A-Z0-9]{18}[0-9]{2}$/;
  if (!leiPattern.test(lei)) {
    return 'LEI must be a 20-character alphanumeric string';
  }
  
  return null;
};

/**
 * Validates a date string
 * @param date - Date string to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validateDate = (
  date: string,
  options: { required?: boolean; past?: boolean; future?: boolean } = {}
): string | null => {
  const { required = false, past = false, future = false } = options;
  
  if (!date) {
    return required ? 'Date is required' : null;
  }
  
  // Try to parse the date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return 'Invalid date format';
  }
  
  const now = new Date();
  
  // Check if date should be in the past
  if (past && parsedDate > now) {
    return 'Date must be in the past';
  }
  
  // Check if date should be in the future
  if (future && parsedDate < now) {
    return 'Date must be in the future';
  }
  
  return null;
};

/**
 * Validates minimum length of a string
 * @param value - String to validate
 * @param minLength - Minimum required length
 * @param message - Custom error message
 * @returns Error message or null if valid
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  message?: string
): string | null => {
  if (!value) return null; // Don't validate empty values
  
  if (value.length < minLength) {
    return message || `Must be at least ${minLength} characters`;
  }
  
  return null;
};
