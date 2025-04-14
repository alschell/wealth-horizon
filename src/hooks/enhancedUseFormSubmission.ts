
import { useCallback } from 'react';
import { useFormControls } from './useFormControls';

interface UseEnhancedFormSubmissionOptions<T> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  resetAfterSubmit?: boolean;
}

/**
 * Enhanced hook for form submission with better error handling
 * 
 * @param options Form submission options
 * @returns Form submission state and handlers
 */
export function enhancedUseFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
  resetAfterSubmit = false,
}: UseEnhancedFormSubmissionOptions<T>) {
  const {
    isSubmitting,
    lastError,
    isSuccess,
    resetState,
    createSubmitHandler
  } = useFormControls<T>();

  const handleSubmit = useCallback(
    createSubmitHandler(onSubmit, {
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      resetAfterSubmit,
      validateForm
    }),
    [
      createSubmitHandler,
      onSubmit,
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      resetAfterSubmit,
      validateForm
    ]
  );

  return {
    isSubmitting,
    lastError,
    isSuccess,
    handleSubmit,
    resetState,
  };
}
