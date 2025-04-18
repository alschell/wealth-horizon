
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from './useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Options for form submission handler creation
 */
export interface FormSubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateForm?: () => Promise<boolean> | boolean;
}

/**
 * Hook for managing form submission state
 * 
 * @returns Form state management utilities and handlers
 */
export function useFormControls<T>() {
  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state handler
  const resetState = useCallback(() => {
    setIsSubmitting(false);
    setLastError(null);
    setIsSuccess(false);
  }, []);

  // Create a submission handler creator
  const createSubmitHandler = useCallback(
    (
      onSubmit: (data: T) => Promise<void> | void,
      options: FormSubmissionOptions<T> = {}
    ) => {
      const {
        onSuccess,
        onError,
        successMessage = 'Form submitted successfully',
        errorMessage = 'Error submitting form',
        resetAfterSubmit = false,
        validateForm,
      } = options;

      return async (data: T) => {
        // Reset error and success states
        setLastError(null);
        setIsSuccess(false);

        // Validate form if validation function is provided
        if (validateForm) {
          const isValid = await validateForm();
          if (!isValid) return;
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
            
            if (resetAfterSubmit) {
              setTimeout(() => {
                if (isMounted()) {
                  resetState();
                }
              }, 3000);
            }
          }
        } catch (error) {
          // Only update state if component is still mounted
          if (isMounted()) {
            console.error("Form submission error:", error);
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
      };
    },
    [isMounted, resetState]
  );

  return {
    isSubmitting,
    lastError,
    isSuccess,
    resetState,
    createSubmitHandler,
  };
}
