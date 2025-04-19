
import { useCallback } from 'react';
import { useFormState } from './useFormState';
import { useFormFields } from './useFormFields';
import { useFormValidation } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';
import { useFormValidationUtils } from './useFormValidationUtils';
import { Validator } from '@/utils/validation/core';
import { required } from '@/utils/validation/validators';

/**
 * Props for the useUnifiedForm hook
 */
export interface UseUnifiedFormProps<T> {
  /**
   * Initial form values
   */
  initialValues: T;
  
  /**
   * Field validators
   */
  validators?: Partial<Record<keyof T, Validator>>;
  
  /**
   * Required fields
   */
  requiredFields?: Array<keyof T>;
  
  /**
   * Form submission handler
   */
  onSubmit?: (values: T) => Promise<void> | void;
  
  /**
   * Success callback
   */
  onSuccess?: () => void;
  
  /**
   * Error callback
   */
  onError?: (error: unknown) => void;
  
  /**
   * Success message
   */
  successMessage?: string;
  
  /**
   * Error message
   */
  errorMessage?: string;
  
  /**
   * Reset form after successful submission
   */
  resetAfterSubmit?: boolean;
}

/**
 * Return type for the useUnifiedForm hook
 */
export interface UseUnifiedFormReturn<T> {
  /**
   * Form state
   */
  formState: ReturnType<typeof useFormState<T>>['formState'];
  
  /**
   * Handle input change
   */
  handleChange: ReturnType<typeof useFormFields<T>>['handleChange'];
  
  /**
   * Handle input blur
   */
  handleBlur: ReturnType<typeof useFormFields<T>>['handleBlur'];
  
  /**
   * Set a field value
   */
  setFieldValue: ReturnType<typeof useFormFields<T>>['setFieldValue'];
  
  /**
   * Set multiple field values
   */
  setFieldValues: ReturnType<typeof useFormFields<T>>['setFieldValues'];
  
  /**
   * Set a field error
   */
  setFieldError: ReturnType<typeof useFormValidation<T>>['setFieldError'];
  
  /**
   * Clear a field error
   */
  clearFieldError: ReturnType<typeof useFormValidation<T>>['clearFieldError'];
  
  /**
   * Validate the form
   */
  validateForm: () => boolean;
  
  /**
   * Handle form submission
   */
  handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
  
  /**
   * Reset the form
   */
  resetForm: () => void;
  
  /**
   * Check if a field has an error
   */
  hasError: ReturnType<typeof useFormValidationUtils>['hasError'];
  
  /**
   * Get error message for a field
   */
  getErrorMessage: ReturnType<typeof useFormValidationUtils>['getErrorMessage'];
}

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
    validators = {},
    requiredFields = [],
    onSubmit,
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully',
    errorMessage = 'An error occurred during submission',
    resetAfterSubmit = false
  } = props;
  
  // Create enhanced validators with required fields validation
  const enhancedValidators = { ...validators };
  requiredFields.forEach(field => {
    enhancedValidators[field] = validators[field] || required(String(field));
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
    setValues,
    clearError: (field) => setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    }),
    setTouched
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
