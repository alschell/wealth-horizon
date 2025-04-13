
/**
 * Central export point for all validation utilities
 */

// Re-export all validation functions from respective modules
export * from './inputValidation';
export * from './numericValidation';
export * from './fileValidation';

// Export composite validation utility
/**
 * Combines multiple validation rules for a single field
 * 
 * @param value - Field value to validate
 * @param fieldName - Name of the field for error message
 * @param validations - Array of validation functions
 * @returns Null if valid, first error message if invalid
 */
export const validateComposite = (
  value: string,
  fieldName: string,
  validations: Array<(value: string) => string | null>
): string | null => {
  try {
    for (const validation of validations) {
      const error = validation(value);
      if (error) return error;
    }
    return null;
  } catch (error) {
    console.error(`Composite validation error for ${fieldName}:`, error);
    return `${fieldName} validation failed`;
  }
};
