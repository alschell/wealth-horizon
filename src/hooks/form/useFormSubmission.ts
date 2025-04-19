
import { useCallback } from 'react';
import { useIsComponentMounted } from '../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';

export interface FormSubmissionOptions<T> {
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  resetAfterSubmit?: boolean;
  resetForm?: () => void;
}

/**
 * Hook for form submission handling
 * 
 * @returns Form submission utilities
 */
export function useFormSubmission<T extends Record<string, any>>() {
  const isMounted = useIsComponentMounted();

  /**
   * Create a submit handler for a form
   * 
   * @param onSubmit Form submission function
   * @param options Form submission options
   * @returns Submit handler function
   */
  const createSubmitHandler = useCallback(
    (
      onSubmit: (data: T) => Promise<void> | void,
      options: FormSubmissionOptions<T> = {}
    ) => {
      const {
        successMessage = 'Form submitted successfully',
        errorMessage = 'An error occurred during submission',
        validateForm,
        onSuccess,
        onError,
        resetAfterSubmit = false,
        resetForm
      } = options;

      return async (data: T): Promise<boolean> => {
        // If validation is provided, run it first
        if (validateForm && !validateForm()) {
          return false;
        }

        try {
          await onSubmit(data);
          
          // Only update state if component is still mounted
          if (isMounted()) {
            if (successMessage) {
              showSuccess("Success", successMessage);
            }
            
            if (onSuccess) {
              onSuccess();
            }
            
            if (resetAfterSubmit && resetForm) {
              resetForm();
            }
            
            return true;
          }
          
          return true;
        } catch (error) {
          // Only handle error if component is still mounted
          if (isMounted()) {
            console.error("Form submission error:", error);
            
            const errorMsg = error instanceof Error ? error.message : errorMessage;
            showError("Error", errorMsg);
            
            if (onError) {
              onError(error);
            }
            
            return false;
          }
          
          return false;
        }
      };
    },
    [isMounted]
  );

  return {
    createSubmitHandler
  };
}
