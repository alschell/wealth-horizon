
/**
 * Standard form validation functions
 */

// Required field validation
export const validateRequired = (value: any, fieldName: string = 'This field'): string | null => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

// Email validation
export const validateEmail = (value: string): string | null => {
  if (!value) return null; // Skip if empty (use required validation separately)
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};

// Phone number validation
export const validatePhone = (value: string): string | null => {
  if (!value) return null; // Skip if empty (use required validation separately)
  
  // Allow various phone formats but ensure it's at least 10 digits
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return 'Phone number must have at least 10 digits';
  }
  return null;
};

// Min length validation
export const validateMinLength = (min: number) => {
  return (value: string): string | null => {
    if (!value) return null; // Skip if empty
    
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  };
};

// Max length validation
export const validateMaxLength = (max: number) => {
  return (value: string): string | null => {
    if (!value) return null; // Skip if empty
    
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  };
};

// Pattern validation
export const validatePattern = (pattern: RegExp, message: string) => {
  return (value: string): string | null => {
    if (!value) return null; // Skip if empty
    
    if (!pattern.test(value)) {
      return message;
    }
    return null;
  };
};

// Number validation
export const validateNumber = (value: string): string | null => {
  if (!value) return null; // Skip if empty
  
  if (isNaN(Number(value))) {
    return 'Must be a valid number';
  }
  return null;
};

// Numeric range validation
export const validateNumericRange = (min: number, max: number) => {
  return (value: string): string | null => {
    if (!value) return null; // Skip if empty
    
    const num = Number(value);
    if (isNaN(num)) {
      return 'Must be a valid number';
    }
    
    if (num < min || num > max) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  };
};

// URL validation
export const validateUrl = (value: string): string | null => {
  if (!value) return null; // Skip if empty
  
  try {
    new URL(value);
    return null;
  } catch (e) {
    return 'Please enter a valid URL';
  }
};

// Combine multiple validators
export const combineValidators = (...validators: ((value: any) => string | null)[]) => {
  return (value: any): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    return null;
  };
};
