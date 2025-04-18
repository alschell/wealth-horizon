
import { useState, useCallback } from 'react';
import { FormState } from './types';

export function useFormState<T extends Record<string, any>>(initialValues: T) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  });

  const setValues = useCallback((values: T) => {
    setFormState(prev => ({
      ...prev,
      values,
      isDirty: true
    }));
  }, []);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
      isDirty: true
    }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error }
    }));
  }, []);

  const clearFieldError = useCallback((field: keyof T) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field as string];
      return {
        ...prev,
        errors: newErrors
      };
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    });
  }, [initialValues]);

  return {
    formState,
    setValues,
    setFieldValue,
    setFieldError,
    clearFieldError,
    resetForm,
    setFormState
  };
}
