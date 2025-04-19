
import { useCallback } from 'react';
import { 
  useForm, 
  UseFormProps, 
  FieldValues, 
  DefaultValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormControls } from './useFormControls';

// Enhanced Form Options
interface UseEnhancedFormOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'defaultValues'> {
  schema?: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateBeforeSubmit?: boolean;
}

/**
 * Enhanced form hook that combines react-hook-form with submission handling
 * 
 * @param options Form options including schema, default values, and submission handlers
 * @returns Enhanced form methods and state
 */
export function enhancedUseForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Error submitting form',
  resetAfterSubmit = false,
  validateBeforeSubmit = true,
  ...formOptions
}: UseEnhancedFormOptions<T>) {
  // Get form state management from useFormControls
  const {
    isSubmitting,
    lastError,
    isSuccess,
    resetState,
    createSubmitHandler
  } = useFormControls<T>();
  
  // Initialize react-hook-form with zod resolver if schema is provided
  const methods = useForm<T>({
    ...formOptions,
    defaultValues,
    ...(schema && { resolver: zodResolver(schema) })
  });
  
  // Handle form submission
  const submitHandler = useCallback(
    createSubmitHandler(
      onSubmit || (async () => {}),
      {
        onSuccess,
        onError,
        successMessage,
        errorMessage,
        resetAfterSubmit,
        validateForm: validateBeforeSubmit ? () => methods.trigger() : undefined
      }
    ),
    [
      createSubmitHandler,
      onSubmit,
      onSuccess, 
      onError,
      successMessage,
      errorMessage,
      resetAfterSubmit,
      validateBeforeSubmit,
      methods
    ]
  );
  
  // Reset form state
  const resetFormState = useCallback(() => {
    resetState();
    methods.reset(defaultValues);
  }, [methods, defaultValues, resetState]);
  
  return {
    ...methods,
    isSubmitting,
    lastError,
    isSuccess,
    handleSubmit: methods.handleSubmit(submitHandler),
    resetFormState,
    submit: submitHandler
  };
}
