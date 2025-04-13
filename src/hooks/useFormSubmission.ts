
/**
 * useFormSubmission hook
 * 
 * A custom hook that handles form submission with loading states,
 * error handling, and success handling.
 */

import { useState, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useIsComponentMounted } from './useIsComponentMounted';

interface UseFormSubmissionProps<T> {
  /** Form submission handler function */
  onSubmit: (data: T) => Promise<void> | void;
  /** Optional callback function on successful submission */
  onSuccess?: () => void;
  /** Optional callback function on submission error */
  onError?: (error: any) => void;
  /** Success message to show to user */
  successMessage?: string;
  /** Error message to show to user */
  errorMessage?: string;
  /** Form validation function */
  validateForm?: () => boolean;
  /** Should automatically dismiss toasts */
  autoDismiss?: boolean;
}

/**
 * Hook for handling form submission logic including validation,
 * loading states, and success/error handling.
 */
export function useFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
  autoDismiss = true,
}: UseFormSubmissionProps<T>) {
  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handle form submission
   * @param data Form data to submit
   */
  const handleSubmit = useCallback(
    async (data: T) => {
      // Reset states
      setSubmissionError(null);
      setIsSuccess(false);

      // Validate form if validation function is provided
      if (validateForm && !validateForm()) {
        return;
      }

      setIsSubmitting(true);

      try {
        // Execute the submit function (could be async or sync)
        await onSubmit(data);

        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSuccess(true);
          
          toast({
            title: 'Success',
            description: successMessage,
            variant: 'default',
          });

          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        // Only update state if component is still mounted
        if (isMounted()) {
          const errorMsg = error instanceof Error ? error.message : errorMessage;
          setSubmissionError(errorMsg);
          
          toast({
            title: 'Error',
            description: errorMsg,
            variant: 'destructive',
          });

          if (onError) {
            onError(error);
          }
        }
      } finally {
        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSubmitting(false);
        }
      }
    },
    [
      onSubmit, 
      onSuccess, 
      onError, 
      validateForm, 
      successMessage, 
      errorMessage, 
      isMounted
    ]
  );

  /**
   * Reset the form submission state
   */
  const resetFormState = useCallback(() => {
    setIsSubmitting(false);
    setSubmissionError(null);
    setIsSuccess(false);
  }, []);

  return {
    isSubmitting,
    submissionError,
    isSuccess,
    handleSubmit,
    resetFormState,
  };
}
