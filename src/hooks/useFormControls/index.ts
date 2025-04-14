
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import { FormSubmissionOptions, FormSubmissionState, UseFormControlsReturn } from './types';

/**
 * Hook for managing form submission state and handlers
 */
export function useFormControls<T>(): UseFormControlsReturn<T> {
  const isMounted = useIsComponentMounted();
  const [formSubmissionState, setFormSubmissionState] = useState<FormSubmissionState>({
    isSubmitting: false,
    lastError: null,
    isSuccess: false
  });

  // Reset state handler
  const resetState = useCallback(() => {
    setFormSubmissionState({
      isSubmitting: false,
      lastError: null,
      isSuccess: false
    });
  }, []);

  // Create a submission handler
  const createSubmitHandler = useCallback(
    (
      onSubmit: (data: T) => Promise<void> | void,
      options: FormSubmissionOptions<T> = {}
    ) => {
      const {
        onSuccess,
        onError,
        successMessage = 'Form submitted successfully',
        errorMessage = 'Error submitting form',
        resetAfterSubmit = false,
        validateForm,
      } = options;

      return async (data: T) => {
        // Reset error and success states
        setFormSubmissionState(prev => ({
          ...prev,
          lastError: null,
          isSuccess: false
        }));

        // Validate form if validation function is provided
        if (validateForm) {
          const isValid = await validateForm();
          if (!isValid) return;
        }

        setFormSubmissionState(prev => ({ ...prev, isSubmitting: true }));

        try {
          await onSubmit(data);

          // Only update state if component is still mounted
          if (isMounted()) {
            setFormSubmissionState(prev => ({ ...prev, isSuccess: true }));
            showSuccess("Success", successMessage);

            if (onSuccess) {
              onSuccess();
            }
            
            if (resetAfterSubmit) {
              setTimeout(() => {
                if (isMounted()) {
                  resetState();
                }
              }, 3000);
            }
          }
        } catch (error) {
          // Only update state if component is still mounted
          if (isMounted()) {
            console.error("Form submission error:", error);
            const errorMsg = error instanceof Error ? error.message : errorMessage;
            
            setFormSubmissionState(prev => ({
              ...prev,
              lastError: errorMsg
            }));
            
            showError("Error", errorMsg);

            if (onError) {
              onError(error);
            }
          }
        } finally {
          // Only update state if component is still mounted
          if (isMounted()) {
            setFormSubmissionState(prev => ({ ...prev, isSubmitting: false }));
          }
        }
      };
    },
    [isMounted, resetState]
  );

  return {
    formSubmissionState,
    resetState,
    createSubmitHandler,
  };
}

export * from './types';
