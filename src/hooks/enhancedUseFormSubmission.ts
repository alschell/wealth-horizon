
import { useState, useCallback } from 'react';
import { showSuccessToast, showErrorToast } from '@/utils/toast';
import { useIsComponentMounted } from './useIsComponentMounted';

interface EnhancedFormSubmissionOptions<T> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  resetAfterSubmit?: boolean;
}

/**
 * Enhanced form submission hook with improved lifecycle management and error handling
 */
export function enhancedUseFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
  resetAfterSubmit = false,
}: EnhancedFormSubmissionOptions<T>) {
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
          showSuccessToast("Success", successMessage);

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
          showErrorToast("Error", errorMsg);

          if (onError) {
            onError(error);
          }
        }
      } finally {
        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSubmitting(false);
          
          // Reset success state after a delay if configured
          if (resetAfterSubmit && isSuccess) {
            setTimeout(() => {
              if (isMounted()) {
                setIsSuccess(false);
              }
            }, 3000);
          }
        }
      }
    },
    [onSubmit, onSuccess, onError, validateForm, successMessage, errorMessage, isMounted, resetAfterSubmit, isSuccess]
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
