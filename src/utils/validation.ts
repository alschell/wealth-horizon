
// Common validation functions for form fields
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[0-9\s()\-]{8,20}$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9\s]+$/,
  NUMERIC: /^[0-9]+$/,
  POSTCODE: /^[a-zA-Z0-9\s]{3,10}$/,
  // Legal Entity Identifier (LEI) is a 20-character alphanumeric code
  LEI: /^[A-Z0-9]{20}$/,
  // Credit card number validation (Luhn algorithm check is performed separately)
  CREDIT_CARD: /^\d{13,19}$/,
  // Date validation in YYYY-MM-DD format
  DATE: /^\d{4}-\d{2}-\d{2}$/,
};

// Validation functions that return error messages or null if valid
export const validateRequired = (value: any, fieldName: string = 'Field'): string | null => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (value: string): string | null => {
  if (!value) return null; // Skip empty validation (use validateRequired for that)
  
  if (!VALIDATION_PATTERNS.EMAIL.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePhone = (value: string): string | null => {
  if (!value) return null;
  
  if (!VALIDATION_PATTERNS.PHONE.test(value)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) return null;
  
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!VALIDATION_PATTERNS.PASSWORD.test(value)) {
    return 'Password must include uppercase, lowercase, number and special character';
  }
  
  return null;
};

export const validateUrl = (value: string): string | null => {
  if (!value) return null;
  
  if (!VALIDATION_PATTERNS.URL.test(value)) {
    return 'Please enter a valid URL';
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number): string | null => {
  if (!value) return null;
  
  if (value.length < minLength) {
    return `Must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number): string | null => {
  if (!value) return null;
  
  if (value.length > maxLength) {
    return `Must be no more than ${maxLength} characters`;
  }
  return null;
};

export const validateNumeric = (value: string): string | null => {
  if (!value) return null;
  
  if (!VALIDATION_PATTERNS.NUMERIC.test(value)) {
    return 'Please enter numbers only';
  }
  return null;
};

export const validateAlphanumeric = (value: string): string | null => {
  if (!value) return null;
  
  if (!VALIDATION_PATTERNS.ALPHANUMERIC.test(value)) {
    return 'Please enter letters and numbers only';
  }
  return null;
};

export const validateLei = (value: string): string | null => {
  if (!value) return null;
  
  if (!VALIDATION_PATTERNS.LEI.test(value)) {
    return 'Please enter a valid 20-character LEI code';
  }
  return null;
};

export const validateFileSize = (file: File, maxSizeMB: number): string | null => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return `File size exceeds the maximum allowed size of ${maxSizeMB}MB`;
  }
  return null;
};

export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  if (!fileExtension || !allowedTypes.includes(`.${fileExtension}`)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  return null;
};

// Credit card validation with Luhn algorithm
export const validateCreditCard = (value: string): string | null => {
  if (!value) return null;
  
  // Remove any non-digit characters
  const sanitized = value.replace(/\D/g, '');
  
  // Check length and pattern
  if (!VALIDATION_PATTERNS.CREDIT_CARD.test(sanitized)) {
    return 'Please enter a valid credit card number';
  }
  
  // Luhn algorithm validation
  let sum = 0;
  let shouldDouble = false;
  
  // Loop from right to left
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  if (sum % 10 !== 0) {
    return 'Please enter a valid credit card number';
  }
  
  return null;
};

// Date validation
export const validateDate = (value: string, options?: { 
  minDate?: Date, 
  maxDate?: Date, 
  format?: 'yyyy-mm-dd' | 'mm/dd/yyyy' | 'dd/mm/yyyy' 
}): string | null => {
  if (!value) return null;
  
  let date: Date;
  const format = options?.format || 'yyyy-mm-dd';
  
  try {
    if (format === 'yyyy-mm-dd') {
      if (!VALIDATION_PATTERNS.DATE.test(value)) {
        return 'Please enter a valid date in YYYY-MM-DD format';
      }
      date = new Date(value);
    } else if (format === 'mm/dd/yyyy') {
      const parts = value.split('/');
      date = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
    } else { // dd/mm/yyyy
      const parts = value.split('/');
      date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    
    // Check min date
    if (options?.minDate && date < options.minDate) {
      return `Date must be on or after ${options.minDate.toLocaleDateString()}`;
    }
    
    // Check max date
    if (options?.maxDate && date > options.maxDate) {
      return `Date must be on or before ${options.maxDate.toLocaleDateString()}`;
    }
    
  } catch (error) {
    return 'Please enter a valid date';
  }
  
  return null;
};

// Validate form data against multiple rules
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => string | null>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  for (const field in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, field)) {
      const errorMessage = rules[field](data[field]);
      if (errorMessage) {
        errors[field as string] = errorMessage;
      }
    }
  }
  
  return errors;
};

// Helper function to compose multiple validation rules
export const composeValidators = (...validators: ((value: any) => string | null)[]) => 
  (value: any): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
