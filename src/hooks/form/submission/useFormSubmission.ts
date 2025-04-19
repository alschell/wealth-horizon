
import { useState, useCallback } from 'react';
import { getErrorMessage, parseError } from '@/utils/errorHandling';
import { showSuccess, showError } from '@/utils/toast';
import { FormSubmissionOptions, SubmissionState } from './types';

/**
 * Custom hook for managing form submissions with state tracking
 * 
 * @template T The type of form data being submitted
 * @returns Form submission state and submit function
 */
export function useFormSubmission<T>() {
  const [state, setState] = useState<SubmissionState>({
    isSubmitting: false,
    lastError: null,
    isSuccess: false
  });

  /**
   * Submits form data with the provided submit function
   * 
   * @param submitFn Function that performs the actual submission
   * @param data The form data to submit
   * @param options Configuration options for the submission
   * @returns Promise resolving to boolean indicating success
   */
  const submitForm = useCallback(async (
    submitFn: (data: T) => Promise<void>,
    data: T,
    options: FormSubmissionOptions<T> = {}
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

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await submitFn(data);
      
      showSuccess('Success', successMessage);
      
      setState(prev => ({ 
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        lastError: null
      }));
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      return true;
    } catch (error) {
      const parsedError = parseError(error);
      console.error('Form submission error:', parsedError);
      
      showError('Error', getErrorMessage(error));
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isSuccess: false,
        lastError: errorMessage
      }));
      
      if (onError) {
        onError(error);
      }
      
      return false;
    }
  }, []);

  return {
    ...state,
    submitForm
  };
}
