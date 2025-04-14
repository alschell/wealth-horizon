
/**
 * Central export point for all validation utilities
 */

// Re-export validation functions with specific namespaces to avoid conflicts
import {
  validateRequired,
  validatePattern,
  validateLei,
  validateDate,
  validateMinLength
} from './fieldValidation';

import {
  validateEmail,
  validatePhone,
  validateUrl,
  validatePassword,
  validateZipCode,
  validateName
} from './inputValidation';

// Create namespaced exports to resolve conflicts
export const field = {
  required: validateRequired,
  pattern: validatePattern,
  lei: validateLei,
  date: validateDate,
  minLength: validateMinLength
};

export const input = {
  email: validateEmail,
  phone: validatePhone,
  url: validateUrl,
  password: validatePassword,
  zipCode: validateZipCode,
  name: validateName
};

// Export numeric validation and file validation directly
export * from './numericValidation';
export * from './fileValidation';
export * from './formValidationCore';

/**
 * Combines multiple validation rules for a single field
 */
export const validateComposite = (
  value: string,
  validations: Array<(value: string) => string | null>
): string | null => {
  try {
    for (const validation of validations) {
      const error = validation(value);
      if (error) return error;
    }
    return null;
  } catch (error) {
    console.error(`Composite validation error:`, error);
    return `Validation failed`;
  }
};

/**
 * Validate a form object against a set of validation rules
 */
export const validateForm = <T extends Record<string, any>>(
  formData: T,
  validationRules: Partial<Record<keyof T, (value: any) => string | null>>
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  for (const [field, validationFn] of Object.entries(validationRules)) {
    if (validationFn) {
      const value = formData[field as keyof T];
      const error = validationFn(value);
      
      if (error) {
        errors[field as keyof T] = error;
      }
    }
  }
  
  return errors;
};
