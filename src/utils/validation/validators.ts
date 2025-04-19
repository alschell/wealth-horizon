
/**
 * Specialized validators for different field types
 * Each validator returns either null (valid) or an error message string
 */

/**
 * Validates that a field has a value
 * @param fieldName Display name for the field in error messages
 * @returns Validation function
 */
export const required = (fieldName: string = 'This field') => {
  return (value: any): string | null => {
    if (value === undefined || value === null || value === '') {
      return `${fieldName} is required`;
    }
    if (Array.isArray(value) && value.length === 0) {
      return `${fieldName} is required`;
    }
    return null;
  };
};

/**
 * Validates that a string is a valid email address
 * @returns Validation function
 */
export const email = () => {
  return (value: string): string | null => {
    if (!value) return null; // Skip validation if empty (use required() for required fields)
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  };
};

/**
 * Validates that a string is a valid phone number
 * @returns Validation function
 */
export const phone = () => {
  return (value: string): string | null => {
    if (!value) return null;
    
    // Basic phone validation - can be enhanced for international formats
    const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;
    return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
  };
};

/**
 * Validates that a string is a valid URL
 * @returns Validation function
 */
export const url = () => {
  return (value: string): string | null => {
    if (!value) return null;
    
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  };
};

/**
 * Validates that a value is a number
 * @param options Optional configuration for number validation
 * @returns Validation function
 */
export const number = (options: { min?: number; max?: number; integer?: boolean } = {}) => {
  return (value: string | number): string | null => {
    if (!value && value !== 0) return null;
    
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
 * Validates that a number is a percentage (0-100)
 * @returns Validation function
 */
export const percentage = () => {
  return number({ min: 0, max: 100 });
};

/**
 * Validates a password meets security requirements
 * @param options Password validation options
 * @returns Validation function
 */
export const password = (options: {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
} = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true
  } = options;
  
  return (value: string): string | null => {
    if (!value) return null;
    
    const errors = [];
    
    if (value.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    if (requireUppercase && !/[A-Z]/.test(value)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (requireLowercase && !/[a-z]/.test(value)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (requireNumbers && !/\d/.test(value)) {
      errors.push('Password must contain at least one number');
    }
    
    if (requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors.length ? errors.join('. ') : null;
  };
};

/**
 * Validates a Legal Entity Identifier (LEI)
 * @returns Validation function
 */
export const lei = () => {
  return (value: string): string | null => {
    if (!value) return null;
    
    // LEI is a 20-character alphanumeric code
    if (!/^[A-Z0-9]{20}$/.test(value)) {
      return 'LEI must be a 20-character alphanumeric code';
    }
    
    return null;
  };
};

/**
 * Validates a date is within a valid range
 * @param options Date validation options
 * @returns Validation function
 */
export const date = (options: { min?: Date; max?: Date; } = {}) => {
  return (value: string | Date): string | null => {
    if (!value) return null;
    
    try {
      const date = value instanceof Date ? value : new Date(value);
      
      if (isNaN(date.getTime())) {
        return 'Please enter a valid date';
      }
      
      if (options.min && date < options.min) {
        return `Date must be on or after ${options.min.toLocaleDateString()}`;
      }
      
      if (options.max && date > options.max) {
        return `Date must be on or before ${options.max.toLocaleDateString()}`;
      }
      
      return null;
    } catch {
      return 'Please enter a valid date';
    }
  };
};
