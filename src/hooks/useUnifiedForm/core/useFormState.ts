
import { useState } from 'react';
import { FormState } from '../types';

/**
 * Hook for managing form state
 * 
 * @param initialValues Initial form values
 * @returns Form state and state updater functions
 */
export function useFormState<T extends Record<string, any>>(initialValues: T) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  });

  // Set all form values
  const setValues = (values: Partial<T>) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, ...values },
      isDirty: true
    }));
  };

  // Set form errors
  // This function accepts either an object of errors or a function to update errors
  const setErrors = (
    errors: Partial<Record<keyof T, string>> | ((prevErrors: Record<string, string>) => Record<string, string>)
  ) => {
    setFormState(prev => {
      const newErrors = typeof errors === 'function' 
        ? errors(prev.errors) 
        : { ...prev.errors, ...errors };
      
      return {
        ...prev,
        errors: newErrors
      };
    });
  };

  // Mark fields as touched
  const setTouched = (touched: Partial<Record<keyof T, boolean>>) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, ...touched }
    }));
  };

  // Reset form state
  const resetFormState = () => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    });
  };

  return {
    formState,
    setValues,
    setErrors,
    setTouched,
    resetFormState
  };
}
