
import { useCallback } from 'react';
import { useFormState } from './useFormState';
import { useFormValidation, ValidationRules } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';

export interface UseUnifiedFormProps<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useUnifiedForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
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
    setFieldError,
    clearFieldError,
    resetForm
  } = useFormState(initialValues);

  const { validateField, validateForm } = useFormValidation(
    formState.values,
    validationRules,
    errors => setFormState(prev => ({ ...prev, errors }))
  );

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
    handleSubmit: submitForm,
    resetForm,
    validateField,
    validateForm
  };
}
