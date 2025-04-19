
import { useCallback } from 'react';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Options for form submission handler
 */
interface FormSubmissionOptions<T> {
  successMessage?: string;
  errorMessage?: string;
  validateForm: () => boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  resetAfterSubmit?: boolean;
  resetForm: () => void;
}

/**
 * Hook for form submission
 * 
 * @returns Submission utilities
 */
export function useFormSubmission<T extends Record<string, any>>() {
  const createSubmitHandler = useCallback(
    (
      onSubmit: (data: T) => Promise<void>,
      options: FormSubmissionOptions<T>
    ) => {
      const {
        successMessage = 'Form submitted successfully',
        errorMessage = 'An error occurred',
        validateForm,
        onSuccess,
        onError,
        resetAfterSubmit = false,
        resetForm
      } = options;

      return async (data: T) => {
        // Validate form before submission
        if (!validateForm()) {
          return false;
        }

        try {
          await onSubmit(data);
          
          // Show success message
          showSuccess('Success', successMessage);
          
          // Call success callback if provided
          if (onSuccess) {
            onSuccess();
          }
          
          // Reset form if requested
          if (resetAfterSubmit) {
            resetForm();
          }
          
          return true;
        } catch (error) {
          console.error('Form submission error:', error);
          
          // Show error message
          showError('Error', error instanceof Error ? error.message : errorMessage);
          
          // Call error callback if provided
          if (onError) {
            onError(error);
          }
          
          return false;
        }
      };
    },
    []
  );

  return {
    createSubmitHandler
  };
}
