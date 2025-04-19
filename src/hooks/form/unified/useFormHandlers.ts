
import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormState } from './types';
import { createInputChangeHandler, createBlurHandler } from '@/utils/handlers/formEventHandlers';

/**
 * Hook for creating form field handlers
 * @param formState - Current form state
 * @param setFormState - Form state setter function
 * @returns Form field handlers
 */
export function useFormHandlers<T extends FieldValues>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
) {
  const clearError = useCallback((field: keyof T) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field as string];
      return {
        ...prev,
        errors: newErrors
      };
    });
  }, [setFormState]);

  // Create input change handler
  const handleChange = createInputChangeHandler<T>(
    (values: T) => setFormState(prev => ({
      ...prev,
      values: values as T
    })),
    clearError
  );

  // Create field blur handler
  const handleBlur = createBlurHandler<T>(
    (touched: Record<string, boolean>) => setFormState(prev => ({
      ...prev,
      touched
    }))
  );

  // Set a single field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value } as T,
      touched: { ...prev.touched, [field]: true },
      isDirty: true
    }));
    
    clearError(field);
  }, [clearError, setFormState]);

  // Set multiple field values at once
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setFormState(prev => {
      const touchedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      return {
        ...prev,
        values: { ...prev.values, ...fields } as T,
        touched: { ...prev.touched, ...touchedFields },
        isDirty: true
      };
    });
    
    // Clear errors for all updated fields
    Object.keys(fields).forEach(field => {
      clearError(field as keyof T);
    });
  }, [clearError, setFormState]);

  // Set a field error
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field as string]: message }
    }));
  }, [setFormState]);

  // Clear a field error
  const clearFieldError = useCallback((field: keyof T) => {
    clearError(field);
  }, [clearError]);

  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    clearError
  };
}
