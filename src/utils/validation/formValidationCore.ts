
/**
 * Core validation utilities for form validation
 */

/**
 * Type for a validation function that returns either an error message or null
 */
export type ValidationFn<T> = (value: T) => string | null;

/**
 * Creates a validation rule for required fields
 * 
 * @param message - Custom error message
 * @returns Validation function
 */
export function required(message = 'This field is required'): ValidationFn<any> {
  return (value: any) => {
    if (value === undefined || value === null || value === '') {
      return message;
    }
    
    // Handle arrays
    if (Array.isArray(value) && value.length === 0) {
      return message;
    }
    
    return null;
  };
}

/**
 * Creates a validation rule that combines multiple validators
 * 
 * @param validators - Array of validation functions
 * @returns Combined validation function
 */
export function combineValidators<T>(...validators: ValidationFn<T>[]): ValidationFn<T> {
  return (value: T) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    return null;
  };
}

/**
 * Validates a form data object against validation rules
 * 
 * @param data - Form data object
 * @param rules - Object with validation functions for specific fields
 * @returns Object with validation errors
 */
export function validateFormData<T extends Record<string, any>>(
  data: T,
  rules: Partial<Record<keyof T, ValidationFn<any>>>
): Record<string, string> {
  const errors: Record<string, string> = {};
  
  for (const field in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, field)) {
      const validator = rules[field];
      if (validator) {
        const error = validator(data[field]);
        if (error) {
          errors[field] = error;
        }
      }
    }
  }
  
  return errors;
}
