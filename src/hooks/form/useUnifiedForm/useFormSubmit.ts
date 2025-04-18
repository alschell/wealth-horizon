
import { useCallback } from 'react';
import { FormState } from './types';
import { showSuccess, showError } from '@/utils/toast';

export function useFormSubmit<T>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  onSubmit?: (values: T) => Promise<void>,
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
  successMessage?: string,
  errorMessage?: string
) {
  return useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!onSubmit) return true;

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(formState.values);
      setFormState(prev => ({ ...prev, isSuccess: true, isSubmitting: false }));
      showSuccess('Success', successMessage || 'Form submitted successfully');
      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
      const msg = error instanceof Error ? error.message : errorMessage || 'An error occurred';
      showError('Error', msg);
      if (onError) onError(error);
      return false;
    }
  }, [formState.values, onSubmit, onSuccess, onError, successMessage, errorMessage, setFormState]);
}
