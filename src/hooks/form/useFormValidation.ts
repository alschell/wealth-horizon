
import { useCallback } from 'react';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function useFormValidation<T extends Record<string, any>>(
  values: T,
  validate?: (values: T) => Record<string, string>,
  requiredFields: (keyof T)[] = []
) {
  const validateForm = useCallback((): ValidationResult => {
    let errors: Record<string, string> = {};

    // Check required fields
    if (requiredFields.length > 0) {
      requiredFields.forEach(field => {
        if (!values[field]) {
          errors[field as string] = 'This field is required';
        }
      });
    }

    // Run custom validation if provided
    if (validate) {
      const customErrors = validate(values);
      errors = { ...errors, ...customErrors };
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [values, validate, requiredFields]);

  return { validateForm };
}
