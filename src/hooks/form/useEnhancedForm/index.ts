import { useFormState } from './useFormState';
import { useFormSubmission } from './useFormSubmission';
import { useFormValidation } from './useFormValidation';
import { enhancedFormConfig } from './config';
import { EnhancedFormOptions, UseEnhancedFormReturn } from './types';
import { FieldValues, DefaultValues } from 'react-hook-form';

/**
 * Enhanced form hook that combines react-hook-form with submission handling.
 * This version is modularized for better maintainability.
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
  successMessage = enhancedFormConfig.defaultSuccessMessage,
  errorMessage = enhancedFormConfig.defaultErrorMessage,
  resetAfterSubmit = false,
  ...formOptions
}: EnhancedFormOptions<T>): UseEnhancedFormReturn<T> {
  // Get form state and methods from useFormState
  const formMethods = useFormState<T>({
    schema,
    defaultValues,
    ...formOptions
  });
  
  // Get form submission handler from useFormSubmission
  const {
    isSubmitting,
    lastError,
    isSuccess,
    resetState,
    handleSubmit: submitHandler
  } = useFormSubmission<T>({
    onSubmit: onSubmit || (async () => {}),
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    resetAfterSubmit,
    // Need to adjust this to handle Promise<boolean> correctly
    validateForm: async () => {
      const result = await formMethods.trigger();
      return result;
    }
  });
  
  // Reset form state
  const resetFormState = () => {
    resetState();
    formMethods.reset(defaultValues);
  };
  
  // Create a properly typed handleSubmit function
  const enhancedHandleSubmit = (...args: any[]) => {
    // If called with form event, prevent default and call submitHandler with form values
    if (args[0] && args[0].preventDefault) {
      args[0].preventDefault();
      return submitHandler(formMethods.getValues());
    }
    // Otherwise, use react-hook-form's handleSubmit
    return formMethods.handleSubmit(submitHandler)(...args);
  };
  
  return {
    ...formMethods,
    isSubmitting,
    lastError,
    isSuccess,
    handleSubmit: enhancedHandleSubmit,
    resetFormState,
    submit: submitHandler
  };
}

export * from './types';
