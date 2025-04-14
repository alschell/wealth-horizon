
/**
 * Central export point for all validation utilities
 */

// Import validation functions from respective modules with specific names
import { 
  validateRequired as validateRequiredField,
  validatePattern,
  validateLei,
  validateDate as validateDateFormat,
  validateMinLength as validateMinLengthField
} from './fieldValidation';

import {
  validateEmail as validateEmailFormat,
  validatePhone as validatePhoneFormat,
  validateUrl as validateUrlFormat,
  validatePassword,
  validateZipCode,
  validateName
} from './inputValidation';

// Export renamed functions to avoid conflicts
export {
  validateRequiredField,
  validatePattern,
  validateLei,
  validateDateFormat,
  validateMinLengthField,
  validateEmailFormat,
  validatePhoneFormat,
  validateUrlFormat,
  validatePassword,
  validateZipCode,
  validateName
};

// Export other validation functions that don't have naming conflicts
export * from './numericValidation';
export * from './fileValidation';
export * from './formValidationCore';

/**
 * Combines multiple validation rules for a single field
 * 
 * @param value - Field value to validate
 * @param validations - Array of validation functions
 * @returns Null if valid, first error message if invalid
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
 * 
 * @param formData - Form data object
 * @param validationRules - Object mapping field names to validation functions
 * @returns Object with validation errors or empty object if valid
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
