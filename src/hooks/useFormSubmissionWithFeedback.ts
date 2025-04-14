
import { useState, useCallback } from 'react';
import { showSuccess, showError } from '@/utils/toast';
import { useIsComponentMounted } from './useIsComponentMounted';

interface FormSubmissionOptions<T> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
}

/**
 * Enhanced form submission hook with integrated feedback and lifecycle management
 */
export function useFormSubmissionWithFeedback<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
}: FormSubmissionOptions<T>) {
  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (data: T) => {
      // Reset error and success states
      setLastError(null);
      setIsSuccess(false);

      // Validate form if validation function is provided
      if (validateForm && !validateForm()) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(data);

        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSuccess(true);
          showSuccess("Success", successMessage);

          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        // Only update state if component is still mounted
        if (isMounted()) {
          const errorMsg = error instanceof Error ? error.message : errorMessage;
          setLastError(errorMsg);
          showError("Error", errorMsg);

          if (onError) {
            onError(error);
          }
        }
      } finally {
        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSubmitting(false);
        }
      }
    },
    [onSubmit, onSuccess, onError, validateForm, successMessage, errorMessage, isMounted]
  );

  const resetState = useCallback(() => {
    setIsSubmitting(false);
    setLastError(null);
    setIsSuccess(false);
  }, []);

  return {
    isSubmitting,
    lastError,
    isSuccess,
    handleSubmit,
    resetState,
  };
}
