
/**
 * Validates form data against a set of validation rules
 * 
 * @param data - Form data to validate
 * @param rules - Object containing validation rules
 * @returns Object with validation errors
 */
export function validateFormData<T extends Record<string, any>>(
  data: T,
  rules: {
    [K in keyof T]?: (value: T[K]) => string | null;
  }
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

/**
 * Creates a validation rule for required fields
 * 
 * @param message - Custom error message
 * @returns Validation function
 */
export function required(message = 'This field is required') {
  return (value: any) => {
    if (value === undefined || value === null || value === '') {
      return message;
    }
    return null;
  };
}

/**
 * Creates a validation rule for minimum length
 * 
 * @param min - Minimum length
 * @param message - Custom error message
 * @returns Validation function
 */
export function minLength(min: number, message?: string) {
  return (value: string) => {
    if (!value || value.length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return null;
  };
}

/**
 * Creates a validation rule for maximum length
 * 
 * @param max - Maximum length
 * @param message - Custom error message
 * @returns Validation function
 */
export function maxLength(max: number, message?: string) {
  return (value: string) => {
    if (value && value.length > max) {
      return message || `Must be at most ${max} characters`;
    }
    return null;
  };
}

/**
 * Creates a validation rule for email format
 * 
 * @param message - Custom error message
 * @returns Validation function
 */
export function email(message = 'Please enter a valid email address') {
  return (value: string) => {
    if (!value) return null;
    
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      return message;
    }
    return null;
  };
}

/**
 * Creates a validation rule for minimum numeric value
 * 
 * @param min - Minimum value
 * @param message - Custom error message
 * @returns Validation function
 */
export function min(min: number, message?: string) {
  return (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue) || numValue < min) {
      return message || `Must be at least ${min}`;
    }
    return null;
  };
}

/**
 * Creates a validation rule for maximum numeric value
 * 
 * @param max - Maximum value
 * @param message - Custom error message
 * @returns Validation function
 */
export function max(max: number, message?: string) {
  return (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue) || numValue > max) {
      return message || `Must be at most ${max}`;
    }
    return null;
  };
}

/**
 * Combines multiple validation rules
 * 
 * @param validators - Array of validation functions
 * @returns Combined validation function
 */
export function composeValidators(...validators: ((value: any) => string | null)[]) {
  return (value: any) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    return null;
  };
}
