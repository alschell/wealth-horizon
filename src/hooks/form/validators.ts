
/**
 * Common form field validators
 * Centralized validator functions for use with form hooks
 */

/**
 * Validator function type definition
 * All validators should return null for valid inputs or an error message string
 */
export type Validator = (value: any) => string | null;

/**
 * Validates that a field is not empty
 * 
 * @param fieldName Name of the field for the error message
 * @returns Validator function
 */
export const required = (fieldName: string): Validator => {
  return (value: any): string | null => {
    if (value === undefined || value === null || value === '') {
      return `${fieldName} is required`;
    }
    return null;
  };
};

/**
 * Validates that a field contains a valid email
 * 
 * @returns Validator function
 */
export const email = (): Validator => {
  return (value: any): string | null => {
    if (!value) return null;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  };
};

/**
 * Validates that a field contains a valid URL
 * 
 * @returns Validator function
 */
export const url = (): Validator => {
  return (value: any): string | null => {
    if (!value) return null;
    
    try {
      new URL(value);
      return null;
    } catch (error) {
      return 'Please enter a valid URL';
    }
  };
};

/**
 * Validates that a field contains only numbers
 * 
 * @returns Validator function
 */
export const number = (): Validator => {
  return (value: any): string | null => {
    if (!value) return null;
    
    if (isNaN(Number(value))) {
      return 'Please enter a valid number';
    }
    return null;
  };
};

/**
 * Validates that a field is within a given range
 * 
 * @param min Minimum allowed value
 * @param max Maximum allowed value
 * @returns Validator function
 */
export const range = (min: number, max: number): Validator => {
  return (value: any): string | null => {
    if (!value) return null;
    
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    
    if (numValue < min || numValue > max) {
      return `Value must be between ${min} and ${max}`;
    }
    
    return null;
  };
};

/**
 * Combines multiple validators
 * 
 * @param validators Array of validator functions
 * @returns Combined validator function
 */
export const combineValidators = (...validators: Validator[]): Validator => {
  return (value: any): string | null => {
    for (const validator of validators) {
      const result = validator(value);
      if (result) {
        return result;
      }
    }
    return null;
  };
};
