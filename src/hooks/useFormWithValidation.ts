
import { useForm, UseFormProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback } from 'react';
import { showError, showSuccess } from '@/utils/toast';

interface UseFormWithValidationProps<T extends FieldValues> extends UseFormProps<T> {
  schema: z.ZodType<T>;
  onSubmitSuccess?: (data: T) => void | Promise<void>;
  successMessage?: {
    title: string;
    description: string;
  };
  errorMessage?: {
    title: string;
    description: string;
  };
}

/**
 * Enhanced useForm hook with Zod validation and toast notifications
 * 
 * @param props - Form configuration
 * @returns Extended useForm return value with additional methods
 */
export function useFormWithValidation<T extends FieldValues>({
  schema,
  onSubmitSuccess,
  successMessage = { title: 'Success', description: 'Form submitted successfully' },
  errorMessage = { title: 'Error', description: 'Failed to submit form' },
  ...formProps
}: UseFormWithValidationProps<T>): UseFormReturn<T> & {
  handleSubmitWithValidation: (e?: React.BaseSyntheticEvent) => Promise<void>;
} {
  // Initialize react-hook-form with zod resolver
  const methods = useForm<T>({
    ...formProps,
    resolver: zodResolver(schema),
  });

  // Custom submit handler with validation and notifications
  const handleSubmitWithValidation = useCallback(
    async (e?: React.BaseSyntheticEvent) => {
      e?.preventDefault();
      
      try {
        // Validate the form
        const isValid = await methods.trigger();
        if (!isValid) return;
        
        // Get form data
        const data = methods.getValues();
        
        // Call the success handler if provided
        if (onSubmitSuccess) {
          await onSubmitSuccess(data);
        }
        
        // Show success toast
        showSuccess(successMessage.title, successMessage.description);
      } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error toast
        showError(
          errorMessage.title,
          error instanceof Error ? error.message : errorMessage.description
        );
      }
    },
    [methods, onSubmitSuccess, successMessage, errorMessage]
  );

  return {
    ...methods,
    handleSubmitWithValidation,
  };
}
