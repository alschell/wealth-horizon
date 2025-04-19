
import { useState, useCallback } from 'react';

/**
 * Interface for form state
 */
export interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
}

/**
 * Create initial form state with default values
 * 
 * @param initialValues Initial form values
 * @returns Initial form state
 */
export function createInitialFormState<T>(initialValues: T): FormState<T> {
  return {
    values: initialValues,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  };
}

/**
 * Hook for managing form state
 * 
 * @param initialValues Initial form values
 * @returns Form state and state updater functions
 */
export function useFormState<T extends Record<string, any>>(initialValues: T) {
  const [formState, setFormState] = useState<FormState<T>>(
    createInitialFormState(initialValues)
  );
  
  /**
   * Reset form state to initial values
   */
  const resetFormState = useCallback((newInitialValues?: T) => {
    setFormState(createInitialFormState(newInitialValues || initialValues));
  }, [initialValues]);
  
  /**
   * Update form values
   */
  const setValues = useCallback((
    values: React.SetStateAction<T>
  ) => {
    setFormState(prev => {
      const newValues = typeof values === 'function' 
        ? (values as (prev: T) => T)(prev.values) 
        : values;
      
      return {
        ...prev,
        values: newValues,
        isDirty: true
      };
    });
  }, []);
  
  /**
   * Set form errors
   */
  const setErrors = useCallback((
    errors: React.SetStateAction<Record<string, string>>
  ) => {
    setFormState(prev => ({
      ...prev,
      errors: typeof errors === 'function'
        ? (errors as (prev: Record<string, string>) => Record<string, string>)(prev.errors)
        : errors
    }));
  }, []);
  
  /**
   * Set which fields have been touched
   */
  const setTouched = useCallback((
    touched: React.SetStateAction<Record<string, boolean>>
  ) => {
    setFormState(prev => ({
      ...prev,
      touched: typeof touched === 'function'
        ? (touched as (prev: Record<string, boolean>) => Record<string, boolean>)(prev.touched)
        : touched
    }));
  }, []);
  
  /**
   * Set submission state
   */
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({
      ...prev,
      isSubmitting
    }));
  }, []);
  
  /**
   * Set success state
   */
  const setSuccess = useCallback((isSuccess: boolean) => {
    setFormState(prev => ({
      ...prev,
      isSuccess
    }));
  }, []);
  
  return {
    formState,
    setFormState,
    resetFormState,
    setValues,
    setErrors,
    setTouched,
    setSubmitting,
    setSuccess
  };
}
