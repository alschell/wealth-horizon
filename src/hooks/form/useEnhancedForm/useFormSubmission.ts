
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '@/hooks/useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import { FormSubmissionOptions } from './types';

/**
 * Hook for handling form submissions with validation and error handling
 * 
 * @param options Form submission options
 * @returns Form submission state and handlers
 */
export function useFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
  resetAfterSubmit = false,
}: {
  onSubmit: (data: T) => Promise<void> | void;
} & FormSubmissionOptions<T>) {
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
          
          if (successMessage) {
            showSuccess("Success", successMessage);
          }

          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        // Only update state if component is still mounted
        if (isMounted()) {
          console.error("Form submission error:", error);
          const errorMsg = error instanceof Error ? error.message : errorMessage;
          setLastError(errorMsg);
          
          if (errorMessage) {
            showError("Error", errorMsg);
          }

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
