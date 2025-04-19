
/**
 * Validator type definition - a function that accepts a value and returns an error message or null
 */
export type Validator = (value: any) => string | null;

/**
 * Creates a required field validator
 * 
 * @param fieldName The name of the field to validate
 * @returns A validator function
 */
export const required = (fieldName: string): Validator => (value: any): string | null => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Creates a minimum length validator
 * 
 * @param fieldName The name of the field to validate
 * @param minLength The minimum length required
 * @returns A validator function
 */
export const minLength = (fieldName: string, minLength: number): Validator => (value: string): string | null => {
  if (!value || value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

/**
 * Creates a maximum length validator
 * 
 * @param fieldName The name of the field to validate
 * @param maxLength The maximum length allowed
 * @returns A validator function
 */
export const maxLength = (fieldName: string, maxLength: number): Validator => (value: string): string | null => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  return null;
};

/**
 * Creates an email validator
 * 
 * @param fieldName The name of the field to validate
 * @returns A validator function
 */
export const email = (fieldName: string): Validator => (value: string): string | null => {
  if (!value) return null;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return `Please enter a valid email address`;
  }
  return null;
};

/**
 * Creates a pattern validator for matching a regex
 * 
 * @param fieldName The name of the field to validate
 * @param pattern The regex pattern to match
 * @param message The error message to display
 * @returns A validator function
 */
export const pattern = (fieldName: string, pattern: RegExp, message: string): Validator => (value: string): string | null => {
  if (!value) return null;
  
  if (!pattern.test(value)) {
    return message;
  }
  return null;
};

/**
 * Combines multiple validators
 * 
 * @param validators The validators to combine
 * @returns A combined validator function
 */
export const compose = (...validators: Validator[]): Validator => (value: any): string | null => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
};
