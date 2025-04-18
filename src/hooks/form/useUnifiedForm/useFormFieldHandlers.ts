
import { useCallback } from 'react';
import { FormState } from './types';

export function useFormFieldHandlers<T>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
) {
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
      isDirty: true
    }));
  }, [setFormState]);

  const setFieldError = useCallback((field: keyof T, message: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: message }
    }));
  }, [setFormState]);

  const clearFieldError = useCallback((field: keyof T) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field as string];
      return { ...prev, errors: newErrors };
    });
  }, [setFormState]);

  return {
    setFieldValue,
    setFieldError,
    clearFieldError
  };
}
