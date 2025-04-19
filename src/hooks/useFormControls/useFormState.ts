
import { useState } from 'react';
import { FormSubmissionState } from './types';

/**
 * Hook to manage form submission state
 * 
 * @returns Form submission state and state setter
 */
export function useFormSubmissionState() {
  const [formSubmissionState, setFormSubmissionState] = useState<FormSubmissionState>({
    isSubmitting: false,
    lastError: null,
    isSuccess: false
  });

  return {
    formSubmissionState,
    setFormSubmissionState
  };
}
