
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from './useIsComponentMounted';
import { showSuccessToast, showErrorToast } from '@/utils/toast';
import { useForm, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Enhanced Form Submission Options
interface UseEnhancedFormSubmissionOptions<T> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  resetAfterSubmit?: boolean;
}

// Enhanced Form Options
interface UseEnhancedFormOptions<T extends FieldValues> extends UseFormProps<T> {
  schema?: z.ZodType<T>;
  defaultValues: T;
  onSubmit?: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

/**
 * Enhanced form hook that combines react-hook-form with submission handling
 */
export function useEnhancedForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Error submitting form',
  resetAfterSubmit = false,
  ...formOptions
}: UseEnhancedFormOptions<T>) {
  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Initialize react-hook-form with zod resolver if schema is provided
  const methods = useForm<T>({
    ...formOptions,
    defaultValues,
    ...(schema && { resolver: zodResolver(schema) })
  });
  
  // Handle form submission
  const handleSubmit = useCallback(async (data: T) => {
    if (!onSubmit) return;
    
    // Reset error and success states
    setLastError(null);
    setIsSuccess(false);
    setIsSubmitting(true);
    
    try {
      await onSubmit(data);
      
      // Only update state if component is still mounted
      if (isMounted()) {
        setIsSuccess(true);
        showSuccessToast("Success", successMessage);
        
        if (onSuccess) {
          onSuccess();
        }
        
        if (resetAfterSubmit) {
          methods.reset(defaultValues);
        }
      }
    } catch (error) {
      // Only update state if component is still mounted
      if (isMounted()) {
        console.error("Form submission error:", error);
        const errorMsg = error instanceof Error ? error.message : errorMessage;
        setLastError(errorMsg);
        showErrorToast("Error", errorMsg);
        
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
  }, [onSubmit, onSuccess, onError, successMessage, errorMessage, isMounted, methods, defaultValues, resetAfterSubmit]);
  
  // Reset form state
  const resetFormState = useCallback(() => {
    setIsSubmitting(false);
    setLastError(null);
    setIsSuccess(false);
    methods.reset(defaultValues);
  }, [methods, defaultValues]);
  
  return {
    ...methods,
    isSubmitting,
    lastError,
    isSuccess,
    handleSubmit: methods.handleSubmit(handleSubmit),
    resetFormState,
    submit: handleSubmit
  };
}

/**
 * Hook for enhanced form submission with better error handling
 */
export function useEnhancedFormSubmission<T>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.',
  validateForm,
  resetAfterSubmit = false,
}: UseEnhancedFormSubmissionOptions<T>) {
  const isMounted = useIsComponentMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (data: T) => {
      // Reset error and success states
      setLastError(null);
      setIsSuccess(false);

      // Validate form if validation function is provided
      if (validateForm && !validateForm()) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(data);

        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSuccess(true);
          showSuccessToast("Success", successMessage);

          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        // Only update state if component is still mounted
        if (isMounted()) {
          console.error("Form submission error:", error);
          const errorMsg = error instanceof Error ? error.message : errorMessage;
          setLastError(errorMsg);
          showErrorToast("Error", errorMsg);

          if (onError) {
            onError(error);
          }
        }
      } finally {
        // Only update state if component is still mounted
        if (isMounted()) {
          setIsSubmitting(false);
          
          // Reset success state after a delay if configured
          if (resetAfterSubmit && isSuccess) {
            setTimeout(() => {
              if (isMounted()) {
                setIsSuccess(false);
              }
            }, 3000);
          }
        }
      }
    },
    [onSubmit, onSuccess, onError, validateForm, successMessage, errorMessage, isMounted, resetAfterSubmit, isSuccess]
  );

  const resetState = useCallback(() => {
    setIsSubmitting(false);
    setLastError(null);
    setIsSuccess(false);
  }, []);

  return {
    isSubmitting,
    lastError,
    isSuccess,
    handleSubmit,
    resetState,
  };
}
