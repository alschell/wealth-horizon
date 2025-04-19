
import { useState, useCallback } from 'react';
import { handleError, ErrorHandlerOptions } from '@/utils/errorHandling';
import { showSuccess } from '@/utils/toast';

export interface FormSubmissionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: (data: T) => boolean;
  resetAfterSubmit?: boolean;
}

/**
 * Hook for managing form submission
 */
export function useFormSubmission<T>() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = useCallback(async <D extends T>(
    submitFn: (data: D) => Promise<void>,
    data: D,
    options: FormSubmissionOptions<D> = {}
  ) => {
    const {
      onSuccess,
      onError,
      successMessage = 'Form submitted successfully',
      errorMessage = 'Error submitting form',
      validateForm,
      resetAfterSubmit
    } = options;

    // Validate form if validation function is provided
    if (validateForm && !validateForm(data)) {
      return false;
    }

    setIsSubmitting(true);

    try {
      await submitFn(data);
      
      if (successMessage) {
        showSuccess('Success', successMessage);
      }
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      return true;
    } catch (error) {
      const errorHandlerOptions: ErrorHandlerOptions = {
        fallbackMessage: errorMessage,
        onError: onError as (error: unknown) => void
      };
      
      handleError(error, errorHandlerOptions);
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    isSubmitting,
    submitForm
  };
}
