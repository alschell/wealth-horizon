
import { useCallback } from 'react';
import { useFormState } from './useFormState';
import { useFormValidation, ValidationRules } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';

export interface UseUnifiedFormProps<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useUnifiedForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  validate,
  onSubmit,
  onSuccess,
  onError,
  successMessage,
  errorMessage
}: UseUnifiedFormProps<T>) {
  const {
    formState,
    setFormState,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    resetForm
  } = useFormState(initialValues);

  const { validateField, validateForm: validateFormWithRules } = useFormValidation(
    formState.values,
    validationRules,
    errors => setFormState(prev => ({ ...prev, errors }))
  );
  
  // Combined validation function that runs both the rules-based and custom validation
  const validateForm = useCallback(() => {
    // Run rules-based validation first
    const ruleErrors = validateFormWithRules();
    
    // Run custom validation if provided
    const customErrors = validate ? validate(formState.values) : {};
    
    // Combine both sets of errors
    const combinedErrors = { ...ruleErrors, ...customErrors };
    
    // Update form state with combined errors
    if (Object.keys(combinedErrors).length > 0) {
      setFormState(prev => ({ ...prev, errors: combinedErrors }));
    }
    
    return combinedErrors;
  }, [formState.values, validateFormWithRules, validate, setFormState]);

  const { handleSubmit } = useFormSubmission<T>();

  const submitForm = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!onSubmit) return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      return false;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    const success = await handleSubmit(formState.values, onSubmit, {
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      resetForm
    });

    setFormState(prev => ({
      ...prev,
      isSubmitting: false,
      isSuccess: success
    }));

    return success;
  }, [
    formState.values,
    handleSubmit,
    onSubmit,
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    resetForm,
    setFormState,
    validateForm
  ]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFieldValue(name as keyof T, fieldValue);
    clearFieldError(name as keyof T);
  }, [setFieldValue, clearFieldError]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isSuccess: formState.isSuccess,
    isDirty: formState.isDirty,
    handleChange,
    setFieldValue,
    setFieldValues,
    handleSubmit: submitForm,
    resetForm,
    validateField,
    validateForm
  };
}
