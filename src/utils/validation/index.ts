/**
 * Central export point for all validation utilities
 * 
 * This module provides a clean and well-organized API for accessing
 * all validation utilities throughout the application.
 */

// Re-export validation functions with specific namespaces to avoid conflicts
import * as stringVal from './stringValidation';
import * as numericVal from './numericValidation';
import * as fileVal from './fileValidation';
import {
  validateWithSchema,
  formatZodErrors,
  validateForm,
  createValidator
} from './formValidationCore';

// Import field validation functions (keeping existing imports)
import {
  validateRequired,
  validatePattern,
  validateLei,
  validateDate,
  validateMinLength
} from './fieldValidation';

// Import input validation functions (keeping existing imports)
import {
  validateEmail as oldValidateEmail,
  validatePhone as oldValidatePhone,
  validateUrl as oldValidateUrl,
  validatePassword as oldValidatePassword,
  validateZipCode,
  validateName
} from './inputValidation';

// Create namespaced exports for different validation categories
export const string = {
  email: stringVal.validateEmail,
  phone: stringVal.validatePhone,
  url: stringVal.validateUrl,
  password: stringVal.validatePassword,
  // Keep backward compatibility
  validateEmail: stringVal.validateEmail,
  validatePhone: stringVal.validatePhone,
  validateUrl: stringVal.validateUrl,
  validatePassword: stringVal.validatePassword
};

export const number = {
  validate: numericVal.validateNumber,
  percentage: numericVal.validatePercentage,
  currency: numericVal.validateCurrency,
  // Keep backward compatibility
  validateNumber: numericVal.validateNumber,
  validatePercentage: numericVal.validatePercentage,
  validateCurrency: numericVal.validateCurrency
};

export const file = {
  validate: fileVal.validateFile,
  size: fileVal.validateFileSize,
  type: fileVal.validateFileType,
  // Keep backward compatibility
  validateFile: fileVal.validateFile,
  validateFileSize: fileVal.validateFileSize,
  validateFileType: fileVal.validateFileType
};

export const field = {
  required: validateRequired,
  pattern: validatePattern,
  lei: validateLei,
  date: validateDate,
  minLength: validateMinLength
};

// Create backward compatibility layer for existing code
// This ensures old code still works while encouraging migration to the new API
export const input = {
  email: oldValidateEmail,
  phone: oldValidatePhone,
  url: oldValidateUrl,
  password: oldValidatePassword,
  zipCode: validateZipCode,
  name: validateName
};

// Export numeric validation and file validation directly for backward compatibility
export * from './numericValidation';
export * from './fileValidation';
export * from './formValidationCore';

// Export stringValidation for backward compatibility
export const {
  validateEmail,
  validatePhone,
  validateUrl
} = stringVal;

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
 * @deprecated Use validateForm from formValidationCore instead
 */
export const validateFormFields = <T extends Record<string, any>>(
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

// Export the schema-based validation utilities 
export const form = {
  validateWithSchema,
  formatZodErrors,
  validateForm,
  createValidator,
  validateFormFields
};
