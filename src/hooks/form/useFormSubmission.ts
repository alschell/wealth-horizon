
import { useCallback } from 'react';
import { useIsComponentMounted } from '../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';

interface SubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetForm?: () => void;
}

export function useFormSubmission<T>() {
  const isMounted = useIsComponentMounted();

  const handleSubmit = useCallback(async (
    values: T,
    onSubmit: (values: T) => Promise<void>,
    options: SubmissionOptions<T> = {}
  ) => {
    const {
      onSuccess,
      onError,
      successMessage = 'Form submitted successfully',
      errorMessage = 'An error occurred',
      resetForm
    } = options;

    try {
      await onSubmit(values);
      
      if (isMounted()) {
        showSuccess('Success', successMessage);
        if (onSuccess) onSuccess();
        if (resetForm) resetForm();
      }
      
      return true;
    } catch (error) {
      if (isMounted()) {
        const message = error instanceof Error ? error.message : errorMessage;
        showError('Error', message);
        if (onError) onError(error);
      }
      
      return false;
    }
  }, [isMounted]);

  return { handleSubmit };
}
