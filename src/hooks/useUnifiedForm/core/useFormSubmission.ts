
import { useCallback } from 'react';
import { useIsComponentMounted } from '@/hooks/useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Hook for form submission handling
 */
export function useFormSubmission<T extends Record<string, any>>() {
  const isMounted = useIsComponentMounted();

  // Create a submission handler function
  const createSubmitHandler = useCallback(
    (
      onSubmit: (values: T) => Promise<void>,
      options: {
        validateForm?: () => boolean;
        onSuccess?: () => void;
        onError?: (error: unknown) => void;
        successMessage?: string;
        errorMessage?: string;
        resetAfterSubmit?: boolean;
        resetForm?: () => void;
      } = {}
    ) => {
      const {
        validateForm,
        onSuccess,
        onError,
        successMessage = 'Form submitted successfully',
        errorMessage = 'An error occurred. Please try again.',
        resetAfterSubmit = false,
        resetForm
      } = options;

      return async (values: T): Promise<boolean> => {
        // Validate form if validation function is provided
        if (validateForm && !validateForm()) {
          return false;
        }

        try {
          // Submit form
          await onSubmit(values);
          
          // Only proceed if component is still mounted
          if (!isMounted()) return true;
          
          // Show success message
          showSuccess('Success', successMessage);
          
          // Call success callback if provided
          if (onSuccess) {
            onSuccess();
          }
          
          // Reset form if needed
          if (resetAfterSubmit && resetForm) {
            resetForm();
          }
          
          return true;
        } catch (error) {
          // Only proceed if component is still mounted
          if (!isMounted()) return false;
          
          // Log error
          console.error('Form submission error:', error);
          
          // Show error message
          const errorMsg = error instanceof Error ? error.message : errorMessage;
          showError('Error', errorMsg);
          
          // Call error callback if provided
          if (onError) {
            onError(error);
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
