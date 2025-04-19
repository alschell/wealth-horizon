
/**
 * Form validation utilities
 */

/**
 * Validator type definition
 */
export type Validator = (value: any) => string | null;

/**
 * Required field validator
 * 
 * @param fieldName Name of the field for the error message
 * @returns Validator function
 */
export const required = (fieldName: string): Validator => (value: any) => {
  if (value === undefined || value === null || value === '' || 
      (Array.isArray(value) && value.length === 0)) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Email format validator
 * 
 * @returns Validator function
 */
export const email = (): Validator => (value: any) => {
  if (!value) return null; // Skip validation if empty
  
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(value)) ? null : 'Invalid email format';
};

/**
 * Minimum length validator
 * 
 * @param length Required minimum length
 * @returns Validator function
 */
export const minLength = (length: number): Validator => (value: any) => {
  if (!value) return null; // Skip validation if empty
  
  return String(value).length >= length 
    ? null 
    : `Must be at least ${length} characters`;
};

/**
 * Maximum length validator
 * 
 * @param length Maximum allowed length
 * @returns Validator function
 */
export const maxLength = (length: number): Validator => (value: any) => {
  if (!value) return null; // Skip validation if empty
  
  return String(value).length <= length 
    ? null 
    : `Must be no more than ${length} characters`;
};

/**
 * Minimum value validator
 * 
 * @param min Minimum allowed value
 * @returns Validator function
 */
export const min = (min: number): Validator => (value: any) => {
  if (value === undefined || value === null || value === '') return null;
  
  return Number(value) >= min ? null : `Must be at least ${min}`;
};

/**
 * Maximum value validator
 * 
 * @param max Maximum allowed value
 * @returns Validator function
 */
export const max = (max: number): Validator => (value: any) => {
  if (value === undefined || value === null || value === '') return null;
  
  return Number(value) <= max ? null : `Must be no more than ${max}`;
};

/**
 * Pattern validator
 * 
 * @param regex Regular expression to test
 * @param message Error message
 * @returns Validator function
 */
export const pattern = (regex: RegExp, message: string): Validator => (value: any) => {
  if (!value) return null; // Skip validation if empty
  
  return regex.test(String(value)) ? null : message;
};

/**
 * Combiner for multiple validators
 * 
 * @param validators Array of validators to run
 * @returns Combined validator function that returns the first error found
 */
export const compose = (...validators: Validator[]): Validator => (value: any) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};
