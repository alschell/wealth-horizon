
/**
 * useFormSubmission hook
 * 
 * A custom hook that handles form submission with loading states,
 * error handling, and success handling. Works with useStandardForm
 * to provide a complete form management solution.
 * 
 * @module hooks/useFormSubmission
 */

import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { announceToScreenReader } from '@/utils/a11y';

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
}

/**
 * Hook for handling form submission logic including validation,
 * loading states, and success/error handling.
 * 
 * @example
 * ```tsx
 * const {
 *   isSubmitting,
 *   submissionError,
 *   isSuccess,
 *   handleSubmit,
 *   resetFormState
 * } = useFormSubmission({
 *   onSubmit: async (data) => await api.submitForm(data),
 *   onSuccess: () => router.push('/success'),
 *   validateForm: () => !Object.keys(errors).length,
 *   successMessage: 'Form submitted successfully',
 *   errorMessage: 'Error submitting form'
 * });
 * ```
 */
export function useFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
}: UseFormSubmissionProps<T>) {
  const { toast } = useToast();
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

        // Handle success
        setIsSuccess(true);
        
        toast({
          title: 'Success',
          description: successMessage,
          variant: 'default',
        });
        
        announceToScreenReader(successMessage, 'polite');

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        // Handle error
        const errorMsg = error instanceof Error ? error.message : errorMessage;
        setSubmissionError(errorMsg);
        
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        
        announceToScreenReader(`Error: ${errorMsg}`, 'assertive');

        if (onError) {
          onError(error);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, onSuccess, onError, validateForm, successMessage, errorMessage, toast]
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
