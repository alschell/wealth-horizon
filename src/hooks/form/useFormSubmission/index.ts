
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '@/hooks/useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import type { FormSubmissionOptions } from '../types';

/**
 * Hook for managing form submission
 * 
 * @returns Functions and state for handling form submissions
 */
export function useFormSubmission<T>() {
  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Creates a submit handler with the given submission function and options
   * 
   * @param onSubmit Function to call with form data
   * @param options Submission options
   * @returns Submit handler function
   */
  const createSubmitHandler = useCallback(
    (
      onSubmit: (data: T) => Promise<void> | void,
      options: FormSubmissionOptions<T> = {}
    ) => {
      const {
        onSuccess,
        onError,
        successMessage = 'Form submitted successfully',
        errorMessage = 'An error occurred during submission',
        validateForm,
        resetAfterSubmit = false,
        resetForm
      } = options;

      return async (data: T): Promise<boolean> => {
        // Validate form if validation function is provided
        if (validateForm && typeof validateForm === 'function') {
          const isValid = validateForm.length > 0 ? validateForm(data) : validateForm();
          if (!isValid) {
            return false;
          }
        }

        setIsSubmitting(true);
        setLastError(null);

        try {
          await onSubmit(data);
          
          if (isMounted()) {
            showSuccess('Success', successMessage);
            setIsSuccess(true);
            
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
          if (isMounted()) {
            console.error('Form submission error:', error);
            const errorMsg = error instanceof Error ? error.message : errorMessage;
            setLastError(errorMsg);
            showError('Error', errorMsg);
            
            if (onError) {
              onError(error);
            }
            
            return false;
          }
          return false;
        } finally {
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
    createSubmitHandler
  };
}
