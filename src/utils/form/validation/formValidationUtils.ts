import type { Validator } from '@/hooks/form/validators/validatorUtils';

/**
 * Validates required fields in form data
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
