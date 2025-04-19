
import type { Validator } from '@/hooks/form/validators/validatorUtils';

/**
 * Validates required fields in form data
 * 
 * @param values Form values to validate
 * @param requiredFields Array of field names that are required
 * @returns Object with validation errors (if any)
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  values: T,
  requiredFields: (keyof T)[]
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  requiredFields.forEach(field => {
    if (
      values[field] === undefined || 
      values[field] === null || 
      values[field] === '' ||
      (Array.isArray(values[field]) && values[field].length === 0)
    ) {
      errors[field as string] = `${String(field)} is required`;
    }
  });
  
  return errors;
};

/**
 * Creates an error clearing function with proper typing
 * 
 * @param setErrors Function to update error state
 * @returns Function to clear errors for a specific field
 */
export const createErrorClearer = <T extends Record<string, any>>(
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
): (field: keyof T) => void => {
  return (field: keyof T) => {
    setErrors(prev => {
      const { [field as string]: _, ...rest } = prev;
      return rest;
    });
  };
};

/**
 * Validates a single field with improved type safety
 * 
 * @param field Field name to validate
 * @param value Field value to validate
 * @param validator Validation function
 * @returns Error message or null if valid
 */
export const validateField = <T extends Record<string, any>>(
  field: keyof T,
  value: T[keyof T],
  validator: Validator
): string | null => {
  try {
    return validator(value);
  } catch (error) {
    console.error(`Validation error for field ${String(field)}:`, error);
    return `Validation failed for ${String(field)}`;
  }
};

/**
 * Validates multiple fields with proper typing
 * 
 * @param values Form values to validate
 * @param validators Map of field names to validation functions
 * @param requiredFields Array of field names that are required
 * @returns Object with validation errors (if any)
 */
export const validateFields = <T extends Record<string, any>>(
  values: T,
  validators: Partial<Record<keyof T, Validator>>,
  requiredFields: (keyof T)[] = []
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Validate required fields
  const requiredErrors = validateRequiredFields(values, requiredFields);
  Object.assign(errors, requiredErrors);
  
  // Run field-specific validators
  Object.entries(validators).forEach(([field, validator]) => {
    if (validator) {
      const error = validateField(field as keyof T, values[field as keyof T], validator);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return errors;
};
