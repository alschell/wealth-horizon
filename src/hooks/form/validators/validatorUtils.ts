
/**
 * Common validator utility functions
 */

export type Validator = (value: any) => string | null;

/**
 * Creates a validator function that requires a field to have a value
 * @param fieldName Display name for the field
 * @returns Validator function
 */
export const required = (fieldName: string = 'This field') => {
  return (value: any): string | null => {
    if (
      value === undefined || 
      value === null || 
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return `${fieldName} is required`;
    }
    return null;
  };
};

/**
 * Creates a validator function for email format
 * @returns Validator function
 */
export const email = () => {
  return (value: string): string | null => {
    if (!value) return null; // Skip validation if empty
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  };
};

/**
 * Creates a validator function for phone format
 * @returns Validator function
 */
export const phone = () => {
  return (value: string): string | null => {
    if (!value) return null; // Skip validation if empty
    
    const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;
    return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
  };
};

/**
 * Creates a validator function for URL format
 * @returns Validator function
 */
export const url = () => {
  return (value: string): string | null => {
    if (!value) return null; // Skip validation if empty
    
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  };
};

/**
 * Creates a validator function for numeric values
 * @param options Options for number validation
 * @returns Validator function
 */
export const number = (options: { min?: number; max?: number; integer?: boolean } = {}) => {
  return (value: any): string | null => {
    if (!value && value !== 0) return null; // Skip validation if empty (unless it's 0)
    
    const num = typeof value === 'string' ? Number(value) : value;
    
    if (isNaN(num)) {
      return 'Please enter a valid number';
    }
    
    if (options.integer && !Number.isInteger(num)) {
      return 'Please enter a whole number';
    }
    
    if (options.min !== undefined && num < options.min) {
      return `Value must be at least ${options.min}`;
    }
    
    if (options.max !== undefined && num > options.max) {
      return `Value must be no more than ${options.max}`;
    }
    
    return null;
  };
};

/**
 * Creates a validator function for percentage values (0-100)
 * @returns Validator function
 */
export const percentage = () => {
  return number({ min: 0, max: 100 });
};

/**
 * Combines multiple validators into a single validator
 * @param validators Array of validator functions to apply
 * @returns Combined validator function
 */
export const combine = (validators: Validator[]) => {
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
