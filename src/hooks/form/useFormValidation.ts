
import { useCallback } from 'react';

export type ValidationRule<T> = (value: T) => string | null;

export interface ValidationRules<T> {
  [key: string]: ValidationRule<any>;
}

export function useFormValidation<T extends Record<string, any>>(
  values: T,
  validationRules: ValidationRules<T> = {},
  onError?: (errors: Record<string, string>) => void
) {
  const validateField = useCallback((field: keyof T, value: any): string | null => {
    const rule = validationRules[field as string];
    return rule ? rule(value) : null;
  }, [validationRules]);

  const validateForm = useCallback((): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field as keyof T, values[field as keyof T]);
      if (error) {
        errors[field] = error;
      }
    });

    if (onError && Object.keys(errors).length > 0) {
      onError(errors);
    }

    return errors;
  }, [validationRules, validateField, values, onError]);

  return {
    validateField,
    validateForm
  };
}
