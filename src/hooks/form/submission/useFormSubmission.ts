
import { useState, useCallback } from 'react';
import { handleError } from '@/utils/errorHandling';
import { showSuccess } from '@/utils/toast';
import { FormSubmissionOptions, SubmissionState } from './types';

export function useFormSubmission<T>() {
  const [state, setState] = useState<SubmissionState>({
    isSubmitting: false,
    lastError: null,
    isSuccess: false
  });

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
      const errorHandlerOptions = {
        fallbackMessage: errorMessage,
        onError: onError
      };
      
      handleError(error, errorHandlerOptions);
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isSuccess: false,
        lastError: errorMessage
      }));
      
      return false;
    }
  }, []);

  return {
    ...state,
    submitForm
  };
}
