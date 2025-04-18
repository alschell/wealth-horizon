import { useCallback } from 'react';
import { FormActions, FormState } from './types';

export function useFormActions<T>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
): FormActions<T> {
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: fieldValue },
      touched: { ...prev.touched, [name]: true },
      isDirty: true
    }));
  }, [setFormState]);

  const handleBlur = useCallback((field: keyof T) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));
  }, [setFormState]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
      isDirty: true
    }));
  }, [setFormState]);

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
  }, [setFormState]);

  const setFieldError = useCallback((field: keyof T, message: string) => {
    setFormState(prev => {
      const updatedErrors = { ...prev.errors };
      updatedErrors[field as string] = message;
      return {
        ...prev,
        errors: updatedErrors
      };
    });
  }, [setFormState]);

  const clearFieldError = useCallback((field: keyof T) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field as string];
      return {
        ...prev,
        errors: newErrors
      };
    });
  }, [setFormState]);

  const validateForm = useCallback(() => {
    // This is a placeholder, implement your validation logic here
    return true;
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    // This is a placeholder, implement your submission logic here
    return true;
  }, []);

  const resetForm = useCallback(() => {
    // This is a placeholder, implement your reset logic here
  }, []);

  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    validateForm,
    handleSubmit,
    resetForm
  };
}
