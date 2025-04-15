
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '../useIsComponentMounted';
import { toast } from 'sonner';

interface FormSubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateForm?: () => boolean;
}

/**
 * Hook that provides form submission controls and state management
 */
export function useFormControls<T>() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const isMounted = useIsComponentMounted();

  /**
   * Resets the form control state
   */
  const resetState = useCallback(() => {
    setIsSubmitting(false);
    setLastError(null);
    setIsSuccess(false);
  }, []);

  /**
   * Creates a submit handler function with the provided options
   * 
   * @param submitFn Function to call on submit
   * @param options Submission options
   * @returns A function that handles form submission
   */
  const createSubmitHandler = useCallback(
    <D extends T>(
      submitFn: (data: D) => Promise<void> | void,
      options: FormSubmissionOptions<D>
    ) => {
      return async (data: D) => {
        // Reset state
        setLastError(null);
        setIsSuccess(false);

        // Validate form if validation function is provided
        if (options.validateForm && !options.validateForm()) {
          return;
        }

        setIsSubmitting(true);

        try {
          await submitFn(data);

          // Only update state if component is still mounted
          if (isMounted()) {
            setIsSuccess(true);
            if (options.successMessage) {
              toast.success("Success", options.successMessage);
            }

            if (options.onSuccess) {
              options.onSuccess();
            }
          }
        } catch (error) {
          // Only update state if component is still mounted
          if (isMounted()) {
            console.error("Form submission error:", error);
            const errorMsg = error instanceof Error 
              ? error.message 
              : options.errorMessage || "An error occurred";
            
            setLastError(errorMsg);
            if (options.errorMessage) {
              toast.error("Error", errorMsg);
            }

            if (options.onError) {
              options.onError(error);
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
    [isMounted]
  );

  return {
    isSubmitting,
    lastError,
    isSuccess,
    resetState,
    createSubmitHandler
  };
}
