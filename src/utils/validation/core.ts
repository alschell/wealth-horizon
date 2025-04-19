
/**
 * Core validation utilities for consistent validation throughout the application
 */

/**
 * Validation result type
 */
export type ValidationResult = string | null | undefined;

/**
 * Validator function type
 */
export type Validator<T = any> = (value: T) => ValidationResult;

/**
 * Combine multiple validators into a single validator
 * @param validators - Array of validator functions
 * @returns Combined validator function
 */
export function combineValidators<T>(...validators: Validator<T>[]): Validator<T> {
  return (value: T): ValidationResult => {
    for (const validator of validators) {
      const result = validator(value);
      if (result) {
        return result;
      }
    }
    return null;
  };
}

/**
 * Create a validator that only runs if the value is not empty
 * @param validator - The validator function to wrap
 * @returns Conditional validator function
 */
export function optional<T>(validator: Validator<T>): Validator<T> {
  return (value: T): ValidationResult => {
    if (value === undefined || value === null || value === '') {
      return null;
    }
    return validator(value);
  };
}

/**
 * Check if a value is empty (null, undefined, empty string, or empty array)
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
 * Create a validator that checks if a value has a minimum length
 * @param min - Minimum length
 * @param message - Custom error message (optional)
 * @returns Validator function
 */
export function minLength(min: number, message?: string): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    return value.length < min 
      ? message || `Must be at least ${min} characters` 
      : null;
  };
}

/**
 * Create a validator that checks if a value has a maximum length
 * @param max - Maximum length
 * @param message - Custom error message (optional)
 * @returns Validator function
 */
export function maxLength(max: number, message?: string): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    return value.length > max 
      ? message || `Must be no more than ${max} characters` 
      : null;
  };
}

/**
 * Create a validator that checks if a value matches a pattern
 * @param pattern - Regular expression pattern
 * @param message - Error message
 * @returns Validator function
 */
export function matchesPattern(pattern: RegExp, message: string): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    return pattern.test(value) ? null : message;
  };
}
