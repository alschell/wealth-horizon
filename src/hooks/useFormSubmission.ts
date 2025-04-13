
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { announceToScreenReader } from '@/utils/a11y';

interface UseFormSubmissionProps<T> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
}

export function useFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
}: UseFormSubmissionProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (data: T, event?: React.FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      // Reset states
      setSubmissionError(null);
      setIsSuccess(false);

      // Validate form if validation function provided
      if (validateForm && !validateForm()) {
        setSubmissionError('Please fix the validation errors before submitting.');
        announceToScreenReader('Form has validation errors. Please fix them before submitting.', 'assertive');
        return;
      }

      try {
        setIsSubmitting(true);

        // Handle both async and sync onSubmit
        const result = onSubmit(data);
        
        if (result instanceof Promise) {
          await result;
        }

        // Success path
        setIsSuccess(true);
        toast.success(successMessage);
        announceToScreenReader(successMessage, 'polite');

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        // Error path
        const errorMsg = error instanceof Error ? error.message : errorMessage;
        setSubmissionError(errorMsg);
        toast.error(errorMsg);
        announceToScreenReader(`Error: ${errorMsg}`, 'assertive');
        
        if (onError) {
          onError(error);
        }
        
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, onSuccess, onError, successMessage, errorMessage, validateForm]
  );

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
