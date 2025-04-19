
import { useCallback } from 'react';
import { FormSubmissionState } from './types';

/**
 * Hook for creating form reset functionality
 * @param setFormSubmissionState - Form state setter
 * @returns Reset state handler
 */
export function useResetState(
  setFormSubmissionState: React.Dispatch<React.SetStateAction<FormSubmissionState>>
) {
  return useCallback(() => {
    setFormSubmissionState({
      isSubmitting: false,
      lastError: null,
      isSuccess: false
    });
  }, [setFormSubmissionState]);
}
