
import { useState, useCallback } from 'react';
import { getErrorMessage } from '@/utils/errorHandling';
import { showSuccess } from '@/utils/toast';

/**
 * Options for form submission handling
 * @template T The type of form data being submitted
 */
export interface FormSubmissionOptions<T> {
  /** Callback executed after successful submission */
  onSuccess?: (data: T) => void;
  
  /** Callback executed when an error occurs */
  onError?: (error: unknown) => void;
  
  /** Success message to display */
  successMessage?: string;
  
  /** Error message to display on failure */
  errorMessage?: string;
  
  /** Function to validate form before submission */
  validateForm?: (data: T) => boolean;
  
  /** Whether to reset form state after submission */
  resetAfterSubmit?: boolean;
}

/**
 * Hook for managing form submission
 * @template T The type of form data being submitted
 * @returns Object containing submission state and submit function
 */
export function useFormSubmission<T>() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Submit form data with the provided submit function
   */
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
      const errorMsg = getErrorMessage(error);
      console.error("Form submission error:", error);
      
      if (onError) {
        onError(error);
      }
      
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
