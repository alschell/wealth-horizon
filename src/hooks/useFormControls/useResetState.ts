
import { useCallback } from 'react';
import { FormSubmissionState } from './types';

/**
 * A hook that provides a reset state function for form submission state
 * 
 * @param setFormSubmissionState - State setter function
 * @returns Function to reset state to default values
 */
export function useResetState(
  setFormSubmissionState: React.Dispatch<React.SetStateAction<FormSubmissionState>>
): () => void {
  /**
   * Reset form submission state to default values
   */
  const resetState = useCallback(() => {
    setFormSubmissionState({
      isSubmitting: false,
      lastError: null,
      isSuccess: false
    });
  }, [setFormSubmissionState]);

  return resetState;
}
