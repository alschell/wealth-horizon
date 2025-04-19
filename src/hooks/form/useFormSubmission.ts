
import { useCallback, useState } from 'react';
import { handleError } from '@/utils/errorHandling/errorHandlingCore';
import { showSuccess } from '@/utils/toast';

/**
 * Form submission state
 */
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  lastError: Error | null;
}

/**
 * Options for form submission
 */
export interface FormSubmissionOptions<T> {
  /**
   * Success message to show after submission
   */
  successMessage?: string;
  
  /**
   * Error message to show if submission fails
   */
  errorMessage?: string;
  
  /**
   * Function to validate the form before submission
   * @returns Whether the form is valid
   */
  validateForm?: () => boolean;
  
  /**
   * Callback to run after successful submission
   */
  onSuccess?: (data: T) => void;
  
  /**
   * Callback to run if submission fails
   */
  onError?: (error: unknown) => void;
  
  /**
   * Reset form after successful submission
   */
  resetAfterSubmit?: boolean;
  
  /**
   * Optional function to reset the form
   */
  resetForm?: () => void;
}

/**
 * Hook for managing form submission with loading state and error handling
 * 
 * @returns Form submission state and handler functions
 */
export function useFormSubmission<T>() {
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    lastError: null
  });
  
  /**
   * Reset the submission state
   */
  const resetSubmissionState = useCallback(() => {
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      lastError: null
    });
  }, []);
  
  /**
   * Create a form submission handler
   * 
   * @param onSubmit Function that performs the submission
   * @param options Submission options
   * @returns Form submission handler
   */
  const createSubmitHandler = useCallback(
    <TData extends Record<string, any>>(
      onSubmit: (data: TData) => Promise<void> | void,
      options: FormSubmissionOptions<TData> = {}
    ) => {
      return async (data: TData): Promise<boolean> => {
        const {
          successMessage = 'Form submitted successfully',
          errorMessage = 'An error occurred during submission',
          validateForm,
          onSuccess,
          onError,
          resetAfterSubmit = false,
          resetForm
        } = options;
        
        // Validate form if validation function is provided
        if (validateForm && !validateForm()) {
          return false;
        }
        
        // Set submitting state
        setSubmissionState(prev => ({
          ...prev,
          isSubmitting: true,
          isSuccess: false,
          lastError: null
        }));
        
        try {
          // Perform submission
          await onSubmit(data);
          
          // Update state after successful submission
          setSubmissionState(prev => ({
            ...prev,
            isSubmitting: false,
            isSuccess: true
          }));
          
          // Show success message
          showSuccess('Success', successMessage);
          
          // Call success callback if provided
          if (onSuccess) {
            onSuccess(data);
          }
          
          // Reset form if requested
          if (resetAfterSubmit && resetForm) {
            resetForm();
          }
          
          return true;
        } catch (error) {
          // Handle error
          handleError(error, {
            fallbackMessage: errorMessage,
            onError
          });
          
          // Update state after failed submission
          setSubmissionState(prev => ({
            ...prev,
            isSubmitting: false,
            isSuccess: false,
            lastError: error instanceof Error ? error : new Error(String(error))
          }));
          
          return false;
        }
      };
    },
    []
  );
  
  return {
    ...submissionState,
    resetSubmissionState,
    createSubmitHandler
  };
}
