
import { useState, useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormState } from './types';

/**
 * Create the initial form state
 * @param defaultValues Initial values for the form
 * @returns Initial form state object
 */
export function createInitialFormState<T extends FieldValues>(defaultValues?: T): FormState<T> {
  return {
    values: (defaultValues || {}) as T,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  };
}

/**
 * Hook for managing form state
 * @param defaultValues - Initial form values
 * @returns Form state and state setters
 */
export function useFormState<T extends FieldValues>(defaultValues?: T) {
  const [formState, setFormState] = useState<FormState<T>>(
    createInitialFormState(defaultValues)
  );

  /**
   * Reset form state to initial values
   */
  const resetFormState = useCallback((newDefaultValues?: T) => {
    setFormState(createInitialFormState(newDefaultValues || defaultValues));
  }, [defaultValues]);

  /**
   * Update specific properties of the form state
   */
  const updateFormState = useCallback(<K extends keyof FormState<T>>(
    key: K, 
    value: FormState<T>[K]
  ) => {
    setFormState(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  return {
    formState,
    setFormState,
    resetFormState,
    updateFormState
  };
}
