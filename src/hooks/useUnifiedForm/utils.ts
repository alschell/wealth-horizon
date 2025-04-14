
import { FormValidationRules } from './types';

/**
 * Validates that required fields have values
 */
export const validateRequiredFields = <T>(
  values: T,
  requiredFields: (keyof T)[] = []
): Record<string, string> => {
  const errors: Record<string, string> = {};

  requiredFields.forEach(field => {
    const value = values[field];
    if (value === undefined || value === null || value === '') {
      errors[field as string] = 'This field is required';
    }
  });

  return errors;
};

/**
 * Creates a function that clears a specific field error
 */
export const createErrorClearer = (
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  return <T>(field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  };
};

/**
 * Creates validation rules for form fields
 */
export const createValidationRules = <T>(rules: FormValidationRules<T>) => {
  return (values: T): Record<string, string> => {
    const errors: Record<string, string> = {};

    Object.entries(rules).forEach(([field, validateFn]) => {
      if (validateFn) {
        const error = validateFn(values[field as keyof T]);
        if (error) {
          errors[field] = error;
        }
      }
    });

    return errors;
  };
};
