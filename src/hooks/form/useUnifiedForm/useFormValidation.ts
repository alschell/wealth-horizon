
import { useCallback } from 'react';
import { FormState } from './types';

export function useFormValidation<T>(
  values: T,
  validate?: (values: T) => Record<string, string>
) {
  const validateForm = useCallback(() => {
    if (!validate) return {};
    
    const validationErrors = validate(values);
    return validationErrors;
  }, [values, validate]);

  const validateField = useCallback((
    field: keyof T,
    value: any,
    fieldValidate?: (value: any) => string | null
  ) => {
    if (!fieldValidate) return null;
    return fieldValidate(value);
  }, []);

  return {
    validateForm,
    validateField
  };
}
