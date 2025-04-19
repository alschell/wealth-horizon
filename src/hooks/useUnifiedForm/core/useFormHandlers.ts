
import { useCallback } from 'react';
import { FormState } from '../types';

interface FormHandlersOptions<T> {
  setValues: (values: Partial<T>) => void;
  clearError: (field: keyof T) => void;
  setTouched: (touched: Partial<Record<keyof T, boolean>>) => void;
}

/**
 * Hook for form field handlers
 * 
 * @param options Handlers options
 * @returns Form field handlers
 */
export function useFormHandlers<T extends Record<string, any>>(options: FormHandlersOptions<T>) {
  const { setValues, clearError, setTouched } = options;

  // Handle input change
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues({ [name]: fieldValue } as Partial<T>);
    clearError(name as keyof T);
  }, [setValues, clearError]);

  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => {
    setTouched({ [field]: true } as Partial<Record<keyof T, boolean>>);
  }, [setTouched]);

  // Set field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues({ [field]: value } as Partial<T>);
    clearError(field);
  }, [setValues, clearError]);

  // Set multiple field values
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setValues(fields);
    
    // Clear errors for all updated fields
    Object.keys(fields).forEach(field => {
      clearError(field as keyof T);
    });
  }, [setValues, clearError]);

  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  };
}
