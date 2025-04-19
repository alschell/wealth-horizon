
import { useCallback } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { FormSubmissionState } from './types';

/**
 * Hook to create a reset state handler
 * 
 * @param setFormSubmissionState State setter function
 * @returns Reset state handler
 */
export function useResetState(
  setFormSubmissionState: Dispatch<SetStateAction<FormSubmissionState>>
) {
  return useCallback(() => {
    setFormSubmissionState({
      isSubmitting: false,
      lastError: null,
      isSuccess: false
    });
  }, [setFormSubmissionState]);
}
