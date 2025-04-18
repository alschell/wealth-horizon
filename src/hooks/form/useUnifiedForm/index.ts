
import { useState, useCallback } from 'react';
import { useFormState } from './useFormState';
import { useFormActions } from './useFormActions';
import { UseUnifiedFormProps, UseUnifiedFormReturn } from './types';
import { showSuccess, showError } from '@/utils/toast';

export function useUnifiedForm<T extends Record<string, any>>(
  props: UseUnifiedFormProps<T>
): UseUnifiedFormReturn<T> {
  const [formState, setFormState] = useState(useFormState<T>(props.initialValues));
  const formActions = useFormActions<T>(formState, setFormState);
  
  // Helper for checking if a field has an error
  const hasError = useCallback((field: keyof T) => {
    return formState.touched[field as string] && Boolean(formState.errors[field as string]);
  }, [formState.touched, formState.errors]);

  // Helper for getting the error message for a field
  const getErrorMessage = useCallback((field: keyof T) => {
    return hasError(field) ? formState.errors[field as string] || '' : '';
  }, [formState.errors, hasError]);

  return {
    formState,
    ...formActions,
    hasError,
    getErrorMessage
  };
}

export * from './types';
