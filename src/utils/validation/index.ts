
// Export validation functions
export * from './fileValidation';
// Explicitly re-export from formValidation to avoid naming conflicts
export { createFieldValidationSchema, createFormValidator, hasFormErrors } from './formValidation';
// Explicitly re-export from inputValidation to avoid naming conflicts
export { 
  validateEmail,
  validatePhone, 
  validateUrl, 
  validatePassword,
  validateZipCode,
  validateName
} from './inputValidation';
export * from './numericValidation';
export * from './stringValidation';

/**
 * Run multiple validation functions against a value and return the first error
 * @param value The value to validate
 * @param validators Array of validation functions to run
 * @returns The first error message or null if valid
 */
export function validateComposite<T>(value: T, validators: ((value: T) => string | null)[]): string | null {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
}
