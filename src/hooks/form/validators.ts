
/**
 * Form validation functions
 */

/**
 * Validator function type
 */
export type Validator = (value: any) => string | null;

/**
 * Combines multiple validators into one
 * 
 * @param validators List of validators to combine
 * @returns Combined validator function
 */
export function combineValidators(...validators: Validator[]): Validator {
  return (value: any) => {
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
 * Create a required field validator
 * 
 * @param fieldName Name of the field for the error message
 * @returns Validator function
 */
export function required(fieldName: string): Validator {
  return (value: any) => {
    if (value === undefined || value === null || value === '' || 
        (Array.isArray(value) && value.length === 0)) {
      return `${fieldName} is required`;
    }
    return null;
  };
}

/**
 * Create an email validator
 * 
 * @returns Validator function
 */
export function email(): Validator {
  return (value: any) => {
    if (!value) return null;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(value))) {
      return 'Please enter a valid email address';
    }
    return null;
  };
}

/**
 * Create a minimum length validator
 * 
 * @param min Minimum length
 * @param message Custom error message
 * @returns Validator function
 */
export function minLength(min: number, message?: string): Validator {
  return (value: any) => {
    if (!value) return null;
    
    if (String(value).length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return null;
  };
}

/**
 * Create a maximum length validator
 * 
 * @param max Maximum length
 * @param message Custom error message
 * @returns Validator function
 */
export function maxLength(max: number, message?: string): Validator {
  return (value: any) => {
    if (!value) return null;
    
    if (String(value).length > max) {
      return message || `Must not exceed ${max} characters`;
    }
    return null;
  };
}

/**
 * Create a number validator
 * 
 * @param message Custom error message
 * @returns Validator function
 */
export function number(message?: string): Validator {
  return (value: any) => {
    if (!value && value !== 0) return null;
    
    if (isNaN(Number(value))) {
      return message || 'Must be a number';
    }
    return null;
  };
}

/**
 * Create a numeric range validator
 * 
 * @param min Minimum value
 * @param max Maximum value
 * @param message Custom error message
 * @returns Validator function
 */
export function range(min: number, max: number, message?: string): Validator {
  return (value: any) => {
    if (!value && value !== 0) return null;
    
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      return message || `Must be between ${min} and ${max}`;
    }
    return null;
  };
}
