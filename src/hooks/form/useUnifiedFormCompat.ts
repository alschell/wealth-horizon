
import { useCallback } from 'react';
import { useFormState } from './useFormState';
import { useFormFields } from './useFormFields';
import { useFormValidation } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';
import { useFormValidationUtils } from './useFormValidationUtils';
import type { Validator } from './validators';
import { required } from './validators';
import { UseUnifiedFormProps, UseUnifiedFormReturn } from './unified/types';

/**
 * Compatibility version of the unified form hook
 * This maintains the same API as the original useUnifiedForm
 * while using the new modular hooks internally
 * 
 * @param props Hook props
 * @returns Form state and actions
 */
export function useUnifiedFormCompat<T extends Record<string, any>>(
  props: UseUnifiedFormProps<T>
): UseUnifiedFormReturn<T> {
  const {
    initialValues,
    validators = {} as Partial<Record<keyof T, Validator>>,
    requiredFields = [],
    onSubmit,
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully',
    errorMessage = 'An error occurred during submission',
    resetAfterSubmit = false
  } = props;
  
  // Create enhanced validators with required fields validation
  const enhancedValidators = { ...validators } as Record<keyof T, Validator>;
  
  requiredFields.forEach(field => {
    if (!enhancedValidators[field]) {
      enhancedValidators[field] = required(String(field));
    }
  });
  
  // Initialize form state
  const {
    formState,
    setValues,
    setErrors,
    setTouched,
    resetFormState
  } = useFormState<T>(initialValues);
  
  // Initialize form field handlers
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  } = useFormFields<T>({
    initialValues: formState.values,
    validators: enhancedValidators,
    requiredFields
  });
  
  // Initialize form validation
  const {
    validateForm: validateWithValidators,
    setFieldError,
    clearFieldError
  } = useFormValidation<T>({
    validators: enhancedValidators,
    requiredFields,
    setErrors
  });
  
  // Validate form with current values
  const validateForm = useCallback(() => {
    return validateWithValidators(formState.values);
  }, [validateWithValidators, formState.values]);
  
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
      validateForm,
      onSuccess,
      onError,
      resetAfterSubmit,
      resetForm: () => resetFormState()
    }
  );
  
  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      return submitHandler(formState.values);
    },
    [submitHandler, formState.values]
  );
  
  // Reset form to initial state
  const resetForm = useCallback(() => {
    resetFormState();
  }, [resetFormState]);
  
  // Get validation utils
  const { hasError, getErrorMessage } = useFormValidationUtils(formState.errors);
  
  return {
    formState,
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isDirty: formState.isDirty,
    isSubmitting: formState.isSubmitting,
    isSuccess: formState.isSuccess,
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
