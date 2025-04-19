
import { useCallback, useMemo } from 'react';
import { FormState } from './types';
import { createErrorClearer } from './validation';

/**
 * Hook for handling form field changes, blur events, and value updates
 * 
 * Provides field management functionality with validation support
 * 
 * @param formState - Current form state
 * @param setFormState - Function to update form state
 * @returns Form field handlers
 */
export function useFormFields<T extends Record<string, any>>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
) {
  // Create reusable error clearer
  const clearFieldError = useMemo(
    () => createErrorClearer<T>(setFormState),
    [setFormState]
  );

  // Handle input changes
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
    
    clearFieldError(name as keyof T);
  }, [clearFieldError, setFormState]);

  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));
  }, [setFormState]);

  // Set a single field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
      isDirty: true
    }));
    
    clearFieldError(field);
  }, [clearFieldError, setFormState]);

  // Set multiple field values at once
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
  }, [clearFieldError, setFormState]);

  return {
    clearFieldError,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  };
}
