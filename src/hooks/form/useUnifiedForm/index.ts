
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
  const { validateForm: getValidationErrors } = useFormValidation(formState.values, props.validate);
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

  // Add handleBlur implementation
  const handleBlur = useCallback((field: keyof T) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));
  }, [setFormState]);

  // Add setFieldValues implementation
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setFormState(prev => {
      const touchedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      return {
        ...prev,
        values: { ...prev.values, ...fields },
        touched: { ...prev.touched, ...touchedFields },
        isDirty: true
      };
    });
    
    // Clear errors for all updated fields
    Object.keys(fields).forEach(field => {
      clearFieldError(field as keyof T);
    });
  }, [clearFieldError]);

  // Add resetForm implementation
  const resetForm = useCallback(() => {
    setFormState({
      values: props.initialValues,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    });
  }, [props.initialValues]);

  const hasError = useCallback((field: keyof T) => {
    return formState.touched[field as string] && Boolean(formState.errors[field as string]);
  }, [formState.touched, formState.errors]);

  const getErrorMessage = useCallback((field: keyof T) => {
    return hasError(field) ? formState.errors[field as string] || '' : '';
  }, [formState.errors, hasError]);
  
  // Fixed validateForm to return a boolean instead of an error object
  const validateForm = useCallback(() => {
    const errors = getValidationErrors();
    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [getValidationErrors, setFormState]);

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
