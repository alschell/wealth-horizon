import { useCallback } from 'react';
import { useFormFields } from '../useFormFields';
import { useFormValidation } from '../useFormValidation';
import { useFormSubmission } from '../useFormSubmission';
import { useFormValidationUtils } from '../useFormValidationUtils';
import { UseUnifiedFormProps, UseUnifiedFormReturn } from './types';
import { createErrorClearer } from './utils';

/**
 * Unified form hook for handling form state, validation, and submission
 * 
 * @param props Hook props
 * @returns Form state and actions
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
    errorMessage = 'An error occurred during submission',
    requiredFields = [],
    validators = {}
  } = props;
  
  // Use the new useFormFields hook for managing form state
  const {
    values,
    errors,
    touched,
    isDirty,
    isValid,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    validateFields,
    resetForm
  } = useFormFields({
    initialValues,
    requiredFields,
    validators
  });
  
  // Get validation utils
  const { hasError, getErrorMessage } = useFormValidationUtils(errors);
  
  // Initialize form validation
  const {
    validateForm: validateWithValidators,
    setFieldError,
    clearFieldError
  } = useFormValidation<T>({
    validators: {},
    requiredFields,
    setErrors: () => {} // This is handled by useFormFields now
  });
  
  // Validate form with current values
  const validateForm = useCallback((): boolean => {
    return validateWithValidators(values);
  }, [validateWithValidators, values]);
  
  // Initialize form submission
  const {
    createSubmitHandler
  } = useFormSubmission<T>();
  
  // Create submit handler
  const submitHandler = createSubmitHandler(
    onSubmit || (async () => {}),
    {
      successMessage,
      errorMessage,
      validateForm: validateFields,
      onSuccess,
      onError,
      resetAfterSubmit: false,
      resetForm: resetForm
    }
  );
  
  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      return submitHandler(values);
    },
    [submitHandler, values]
  );
  
  // Create formState object for backwards compatibility
  const formState = {
    values,
    errors,
    touched,
    isDirty,
    isSubmitting: false, // This would be handled by useFormSubmission
    isSuccess: false     // This would be handled by useFormSubmission
  };
  
  return {
    formState,
    values,
    errors,
    touched,
    isDirty,
    isSubmitting: false,
    isSuccess: false,
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
    getErrorMessage,
    // For test compatibility
    validateFields: validateForm
  };
}
