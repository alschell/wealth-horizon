
import { useState, useCallback } from 'react';
import { useFormState } from './useFormState';
import { useFormFieldHandlers } from './useFormFieldHandlers';
import { useFormValidation } from './useFormValidation';
import { useFormSubmit } from './useFormSubmit';
import { UseUnifiedFormProps, UseUnifiedFormReturn } from './types';

export function useUnifiedForm<T extends Record<string, any>>(
  props: UseUnifiedFormProps<T>
): UseUnifiedFormReturn<T> {
  const [formState, setFormState] = useState(useFormState<T>(props.initialValues));
  const { setFieldValue, setFieldError, clearFieldError } = useFormFieldHandlers(formState, setFormState);
  const { validateForm } = useFormValidation(formState.values, props.validate);
  const handleSubmit = useFormSubmit(
    formState,
    setFormState,
    props.onSubmit,
    props.onSuccess,
    props.onError,
    props.successMessage,
    props.errorMessage
  );

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFieldValue(name as keyof T, fieldValue);
    clearFieldError(name as keyof T);
  }, [setFieldValue, clearFieldError]);

  const hasError = useCallback((field: keyof T) => {
    return formState.touched[field as string] && Boolean(formState.errors[field as string]);
  }, [formState.touched, formState.errors]);

  const getErrorMessage = useCallback((field: keyof T) => {
    return hasError(field) ? formState.errors[field as string] || '' : '';
  }, [formState.errors, hasError]);

  return {
    formState,
    handleChange,
    setFieldValue,
    setFieldError,
    clearFieldError,
    validateForm,
    handleSubmit,
    hasError,
    getErrorMessage
  };
}

export * from './types';
