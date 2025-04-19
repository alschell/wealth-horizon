
import { useState, useCallback } from 'react';
import { FormState } from './unified/types';

/**
 * Hook for managing form state
 * 
 * @param initialValues Initial form values
 * @returns Form state and state updaters
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

  const setValues = useCallback((valuesUpdater: React.SetStateAction<T>) => {
    setFormState(prev => {
      const newValues = typeof valuesUpdater === 'function'
        ? valuesUpdater(prev.values)
        : valuesUpdater;
        
      return {
        ...prev,
        values: newValues,
        isDirty: true
      };
    });
  }, []);

  const setErrors = useCallback((errorsUpdater: React.SetStateAction<Record<string, string>>) => {
    setFormState(prev => {
      const newErrors = typeof errorsUpdater === 'function'
        ? errorsUpdater(prev.errors)
        : errorsUpdater;
        
      return {
        ...prev,
        errors: newErrors
      };
    });
  }, []);

  const setTouched = useCallback((touchedUpdater: React.SetStateAction<Record<string, boolean>>) => {
    setFormState(prev => {
      const newTouched = typeof touchedUpdater === 'function'
        ? touchedUpdater(prev.touched)
        : touchedUpdater;
        
      return {
        ...prev,
        touched: newTouched
      };
    });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({
      ...prev,
      isSubmitting,
      ...(isSubmitting ? { isSuccess: false } : {})
    }));
  }, []);

  const setSuccess = useCallback((isSuccess: boolean) => {
    setFormState(prev => ({
      ...prev,
      isSuccess,
      isSubmitting: false
    }));
  }, []);

  const resetFormState = useCallback(() => {
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
    setErrors,
    setTouched,
    setSubmitting,
    setSuccess,
    resetFormState
  };
}
