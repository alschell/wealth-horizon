
/**
 * Centralized validation utilities
 * This file serves as a single entry point for all validation-related exports
 */

// Export core validation utilities
export * from './core';

// Export validation functions
export * from './validators';

// Export convenience validators for common use cases
import { required, email, phone, url, number, percentage, password, lei, date } from './validators';
import { combineValidators } from './core';

/**
 * Shorthand method to validate an email
 */
export const validateEmail = email();

/**
 * Shorthand method to validate a URL
 */
export const validateUrl = url();

/**
 * Shorthand method to validate a phone number
 */
export const validatePhone = phone();

/**
 * Shorthand method to validate a number
 */
export const validateNumber = number();

/**
 * Shorthand method to validate a percentage (0-100)
 */
export const validatePercentage = percentage();

/**
 * Shorthand method to validate a LEI (Legal Entity Identifier)
 */
export const validateLei = lei();

/**
 * Standard validators for common form fields
 */
export const validators = {
  // Individual validators
  required,
  email,
  phone,
  url,
  number,
  percentage,
  password,
  lei,
  date,
  
  // Combined validators for common use cases
  requiredEmail: combineValidators(required('Email'), email()),
  requiredPhone: combineValidators(required('Phone number'), phone()),
  requiredUrl: combineValidators(required('URL'), url()),
  requiredNumber: combineValidators(required('Number'), number()),
  requiredPercentage: combineValidators(required('Percentage'), percentage()),
  requiredLei: combineValidators(required('LEI'), lei()),
};

/**
 * Create a validator for a required field with a custom validator
 * 
 * @param fieldName Name of the field for the error message
 * @param validator Custom validator function
 * @returns Combined validator
 */
export const createRequiredValidator = (
  fieldName: string,
  validator: (value: any) => string | null
) => {
  return combineValidators(required(fieldName), validator);
};
