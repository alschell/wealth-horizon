import { useCallback } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';
import { formConfig } from './config';
import { useFormSubmission } from './useFormSubmission';
import { 
  UseFormOptions, 
  UseFormReturn,
  EnhancedHandleSubmit
} from './types';

/**
 * Enhanced form hook that combines react-hook-form with submission handling
 * 
 * @param options Form options including schema, default values, and submission handlers
 * @returns Enhanced form methods and state
 */
export function useForm<T extends FieldValues>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const {
    schema,
    defaultValues,
    onSubmit,
    onSuccess,
    onError,
    successMessage = formConfig.defaultSuccessMessage,
    errorMessage = formConfig.defaultErrorMessage,
    resetAfterSubmit = false,
    validateBeforeSubmit = true,
    ...formOptions
  } = options;
  
  // Initialize react-hook-form with zod resolver if schema is provided
  const methods = useReactHookForm<T>({
    ...formOptions,
    defaultValues,
    ...(schema && { resolver: zodResolver(schema) })
  });
  
  // Use form submission hook
  const {
    isSubmitting,
    isSuccess,
    error,
    handleSubmit: submitHandler,
    resetState
  } = useFormSubmission<T>(
    onSubmit || (async () => {}),
    {
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      resetAfterSubmit,
      validateBeforeSubmit
    }
  );
  
  // Submit function that directly accepts form data
  const submit = useCallback(
    (data: T) => submitHandler(data, validateBeforeSubmit ? () => methods.trigger() : undefined),
    [submitHandler, methods, validateBeforeSubmit]
  );
  
  // Reset form state
  const resetFormState = useCallback(() => {
    resetState();
    methods.reset(defaultValues);
  }, [methods, defaultValues, resetState]);
  
  // Create enhanced handleSubmit that works with form events or can be called directly
  const enhancedHandleSubmit: EnhancedHandleSubmit<T> = ((arg?: any) => {
    // If called with form event, prevent default
    if (arg && typeof arg.preventDefault === 'function') {
      arg.preventDefault();
      return submit(methods.getValues());
    }
    
    // Otherwise use as normal react-hook-form handleSubmit
    // This makes it compatible with the original handleSubmit API
    return methods.handleSubmit((data) => submit(data))(arg);
  }) as EnhancedHandleSubmit<T>;

  return {
    ...methods,
    handleSubmit: enhancedHandleSubmit,
    isSubmitting,
    isSuccess,
    error,
    resetFormState,
    submit
  };
}

// Export types
export * from './types';
export * from './config';
