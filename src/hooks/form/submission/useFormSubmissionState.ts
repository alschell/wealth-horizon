
import { useState, useCallback } from 'react';

export interface SubmissionState {
  isSubmitting: boolean;
  lastError: string | null;
  isSuccess: boolean;
}

export function useFormSubmissionState() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    lastError: null,
    isSuccess: false
  });

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setSubmissionState(prev => ({
      ...prev,
      isSubmitting,
      ...(isSubmitting ? { isSuccess: false, lastError: null } : {})
    }));
  }, []);

  const setSuccess = useCallback((isSuccess: boolean) => {
    setSubmissionState(prev => ({
      ...prev,
      isSuccess,
      isSubmitting: false
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setSubmissionState(prev => ({
      ...prev,
      lastError: error,
      isSubmitting: false,
      isSuccess: false
    }));
  }, []);

  const reset = useCallback(() => {
    setSubmissionState({
      isSubmitting: false,
      lastError: null,
      isSuccess: false
    });
  }, []);

  return {
    ...submissionState,
    setSubmitting,
    setSuccess,
    setError,
    reset
  };
}
