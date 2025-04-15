
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '@/hooks/useIsComponentMounted';
import { toast } from '@/components/ui/use-toast';
import { FieldValues } from 'react-hook-form';
import { FormSubmissionOptions } from './types';

/**
 * Hook for handling form submission with success/error handling
 */
export function useFormSubmission<T extends FieldValues>(
  onSubmit: (data: T) => Promise<void> | void,
  options: FormSubmissionOptions<T> = {}
) {
  const {
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully',
    errorMessage = 'Error submitting form',
    resetAfterSubmit = false,
    validateBeforeSubmit = true
  } = options;

  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (data: T, validate?: () => Promise<boolean>) => {
      // Reset states
      setError(null);
      setIsSuccess(false);

      // Validate if needed
      if (validateBeforeSubmit && validate) {
        const isValid = await validate();
        if (!isValid) return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(data);

        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSuccess(true);
          
          toast({
            title: 'Success',
            description: successMessage,
          });

          if (onSuccess) {
            onSuccess();
          }
          
          if (resetAfterSubmit) {
            setTimeout(() => {
              if (isMounted()) {
                setIsSuccess(false);
                setError(null);
              }
            }, 3000);
          }
        }
      } catch (error) {
        // Only update state if component is still mounted
        if (isMounted()) {
          console.error("Form submission error:", error);
          const errorMsg = error instanceof Error ? error.message : errorMessage;
          setError(errorMsg);
          
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
      validateBeforeSubmit,
      successMessage,
      errorMessage,
      resetAfterSubmit,
      isMounted
    ]
  );

  const resetState = useCallback(() => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    isSuccess,
    error,
    handleSubmit,
    resetState,
  };
}
