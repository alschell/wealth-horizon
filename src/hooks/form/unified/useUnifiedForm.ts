
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '../../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import { 
  UseUnifiedFormProps, 
  UseUnifiedFormReturn,
  FormState
} from './types';
import { validateRequiredFields } from './validation';
import { useFormFields } from './useFormFields';
import { useFormValidation } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';

/**
 * Unified form hook for handling form state, validation, and submission
 * @param props - Form configuration
 * @returns Form state, actions, and helpers
 */
export function useUnifiedForm<T extends Record<string, any>>(
  props: UseUnifiedFormProps<T>
): UseUnifiedFormReturn<T> {
  const {
    initialValues,
    validate,
    onSubmit,
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully',
    errorMessage = 'An error occurred. Please try again.',
    requiredFields = []
  } = props;

  const isMounted = useIsComponentMounted();
  
  // Form state
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  });

  // Use form field handlers
  const { 
    handleChange, 
    handleBlur, 
    setFieldValue, 
    setFieldValues, 
    clearFieldError 
  } = useFormFields<T>(formState, setFormState);

  // Use form validation handlers
  const { 
    setFieldError, 
    validateForm 
  } = useFormValidation<T>(formState, setFormState, validate, requiredFields, validateRequiredFields);

  // Use form submission handler
  const { 
    handleSubmit, 
    resetForm 
  } = useFormSubmission<T>(
    formState, 
    setFormState, 
    validateForm, 
    onSubmit, 
    isMounted, 
    onSuccess, 
    onError, 
    successMessage, 
    errorMessage
  );

  // Helper to check if field has error
  const hasError = useCallback((field: keyof T) => {
    return Boolean(formState.errors[field as string]);
  }, [formState.errors]);

  // Helper to get error message for field
  const getErrorMessage = useCallback((field: keyof T) => {
    return formState.errors[field as string] || '';
  }, [formState.errors]);

  return {
    formState,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    validateForm,
    handleSubmit,
    resetForm,
    hasError,
    getErrorMessage
  };
}

export * from './types';
export * from './validation';
