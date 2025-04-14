
import { useState, useCallback } from 'react';
import { useForm, UseFormProps, FieldValues, Path, UseFormReturn, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useIsComponentMounted } from './useIsComponentMounted';
import { toast } from './use-toast';

/**
 * Core form submission options
 */
export interface FormSubmissionOptions<T> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => Promise<boolean> | boolean;
  resetAfterSubmit?: boolean;
}

/**
 * Options for the useFormSystem hook
 */
export interface UseFormSystemOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'defaultValues'> {
  defaultValues: DefaultValues<T>;
  schema?: z.ZodType<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

/**
 * Core submission handler for forms
 */
export function useFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
  resetAfterSubmit = false,
}: FormSubmissionOptions<T>) {
  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (data: T) => {
      // Reset states
      setError(null);
      setIsSuccess(false);

      // Validate form if validation function is provided
      if (validateForm) {
        const isValid = await validateForm();
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
            variant: 'default',
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
    [onSubmit, onSuccess, onError, validateForm, successMessage, errorMessage, isMounted, resetAfterSubmit]
  );

  return {
    isSubmitting,
    error,
    isSuccess,
    handleSubmit,
    resetState: useCallback(() => {
      setIsSubmitting(false);
      setError(null);
      setIsSuccess(false);
    }, []),
  };
}

/**
 * Complete form system that combines react-hook-form with submission handling
 */
export function useFormSystem<T extends FieldValues>({
  defaultValues,
  schema,
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Error submitting form',
  resetAfterSubmit = false,
  ...formOptions
}: UseFormSystemOptions<T>) {
  // Initialize react-hook-form with zod resolver if schema is provided
  const methods = useForm<T>({
    ...formOptions,
    defaultValues,
    ...(schema && { resolver: zodResolver(schema) })
  });
  
  // Use the form submission hook for handling submissions
  const {
    isSubmitting,
    error,
    isSuccess,
    handleSubmit: submitHandler,
    resetState
  } = useFormSubmission<T>({
    onSubmit: onSubmit || (async () => {}),
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    validateForm: formOptions.mode === 'onChange' ? undefined : () => methods.trigger(),
    resetAfterSubmit
  });
  
  // Reset form state
  const resetForm = useCallback(() => {
    resetState();
    methods.reset(defaultValues);
  }, [methods, defaultValues, resetState]);
  
  return {
    ...methods,
    isSubmitting,
    error,
    isSuccess,
    handleSubmit: methods.handleSubmit(submitHandler),
    resetForm,
    submit: submitHandler
  };
}
