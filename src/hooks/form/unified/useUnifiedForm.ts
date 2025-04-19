
import { useCallback } from 'react';
import { FieldValues, UseFormProps, DefaultValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseUnifiedFormOptions, UnifiedFormState } from './types';
import { useFormState } from './useFormState';
import { useFormHandlers } from './useFormHandlers';
import { useFormValidation } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';

/**
 * Enhanced form hook that combines react-hook-form with submission handling
 * @param options - Form configuration options
 * @returns Form state, methods, and handlers
 */
export function useUnifiedForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Error submitting form',
  resetAfterSubmit = false,
  ...formOptions
}: UseUnifiedFormOptions<T>) {
  // Initialize form state
  const { formState, setFormState } = useFormState<T>();

  // Initialize form state with default values
  useCallback(() => {
    setFormState({
      values: defaultValues as T,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    });
  }, [defaultValues, setFormState])();

  // Initialize react-hook-form with zod resolver if schema is provided
  const methods = useForm<T>({
    ...formOptions,
    defaultValues: defaultValues as DefaultValues<T>,
    ...(schema && { resolver: zodResolver(schema) })
  });

  // Get form handlers
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError
  } = useFormHandlers<T>(formState, setFormState);

  // Get form validation
  const { validateForm } = useFormValidation<T>(
    formState,
    setFormState,
    [] // Pass required fields if needed
  );

  // Get form submission handler
  const { handleSubmit: submitHandler } = useFormSubmission<T>(
    formState,
    setFormState,
    onSubmit,
    onSuccess,
    onError,
    successMessage,
    errorMessage
  );

  // Reset form to initial state
  const resetFormState = useCallback(() => {
    setFormState({
      values: defaultValues as T,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    });
  }, [defaultValues, setFormState]);

  return {
    ...methods,
    formState,
    handleSubmit: methods.handleSubmit(submitHandler),
    resetFormState,
    submit: submitHandler,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    validateForm
  };
}
