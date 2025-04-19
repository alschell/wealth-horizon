
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { UnifiedFormState } from './types';

/**
 * Hook for managing form state
 * @param defaultValues - Initial form values
 * @returns Form state and state setters
 */
export function useFormState<T extends FieldValues>(defaultValues?: T) {
  const [formState, setFormState] = useState<UnifiedFormState<T>>({
    values: (defaultValues || {}) as T,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  });

  return {
    formState,
    setFormState
  };
}
