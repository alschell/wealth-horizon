
import { useState } from 'react';
import { FormSubmissionState } from './types';

/**
 * Hook for managing form submission state
 * @returns Form state and setter
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
