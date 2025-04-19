
import { useState, useCallback, useMemo } from 'react';
import { useIsComponentMounted } from '../../useIsComponentMounted';
import { 
  UseUnifiedFormProps, 
  UseUnifiedFormReturn,
  FormState
} from './types';
import { useFormFields } from './useFormFields';
import { useFormValidation } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';
import { createErrorChecker, createErrorMessageGetter } from './validation';
import { FORM_CONFIG } from './config';

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
    successMessage = FORM_CONFIG.defaultSuccessMessage,
    errorMessage = FORM_CONFIG.defaultErrorMessage,
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
  } = useFormValidation<T>(formState, setFormState, validate, requiredFields);

  // Use form submission handler
  const { 
    handleSubmit, 
    resetForm: resetFormSubmission 
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

  // Reset form to initial state
  const resetForm = useCallback(() => {
    resetFormSubmission(initialValues);
  }, [initialValues, resetFormSubmission]);

  // Create error helpers with memoization
  const hasError = useMemo(
    () => createErrorChecker(formState.errors),
    [formState.errors]
  );

  const getErrorMessage = useMemo(
    () => createErrorMessageGetter(formState.errors),
    [formState.errors]
  );

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
