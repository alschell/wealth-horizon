
import { useCallback } from 'react';

interface UseFormFieldHandlersOptions<T> {
  setValues: (fn: (prev: T) => T) => void;
  clearError: (field: keyof T) => void;
  setTouched: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}

/**
 * Hook for handling form field changes, blur events, and value updates
 * 
 * @param options Configuration options
 * @returns Form field handlers
 */
export function useFormFieldHandlers<T extends Record<string, any>>(options: UseFormFieldHandlersOptions<T>) {
  const { setValues, clearError, setTouched } = options;
  
  // Handle input changes
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    clearError(name as keyof T);
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, [clearError, setTouched, setValues]);

  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [field as string]: true
    }));
  }, [setTouched]);

  // Set a single field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    clearError(field);
    
    setTouched(prev => ({
      ...prev,
      [field as string]: true
    }));
  }, [clearError, setTouched, setValues]);

  // Set multiple field values at once
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...fields
    }));
    
    // Clear errors for all updated fields
    Object.keys(fields).forEach(field => {
      clearError(field as keyof T);
    });
    
    setTouched(prev => {
      const touchedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      return {
        ...prev,
        ...touchedFields
      };
    });
  }, [clearError, setTouched, setValues]);

  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  };
}
