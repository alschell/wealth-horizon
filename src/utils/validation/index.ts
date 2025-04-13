
/**
 * Central export point for all validation utilities
 */

// Re-export all validation functions from respective modules
export * from './inputValidation';
export * from './numericValidation';
export * from './fileValidation';
export * from './fieldValidation';

// Export composite validation utility
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
    const value = formData[field];
    const error = validationFn(value);
    
    if (error) {
      errors[field as keyof T] = error;
    }
  }
  
  return errors;
};
