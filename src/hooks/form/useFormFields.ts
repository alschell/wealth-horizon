
import { useCallback } from 'react';

/**
 * Types for form field handling
 */
interface UseFormFieldsOptions<T> {
  /**
   * Function to update form values
   */
  setValues: React.Dispatch<React.SetStateAction<T>>;
  
  /**
   * Function to clear field errors
   */
  clearError?: (field: keyof T) => void;
  
  /**
   * Function to set touched fields
   */
  setTouched?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

/**
 * Hook for handling form field interactions
 * 
 * @param options Hook configuration options
 * @returns Form field event handlers
 */
export function useFormFields<T extends Record<string, any>>(options: UseFormFieldsOptions<T>) {
  const { setValues, clearError, setTouched } = options;
  
  /**
   * Handle input change events
   */
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    if (clearError) {
      clearError(name as keyof T);
    }
    
    if (setTouched) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }
  }, [setValues, clearError, setTouched]);
  
  /**
   * Handle input blur events to mark field as touched
   */
  const handleBlur = useCallback((field: keyof T) => {
    if (setTouched) {
      setTouched(prev => ({
        ...prev,
        [field]: true
      }));
    }
  }, [setTouched]);
  
  /**
   * Set a specific field value
   */
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (clearError) {
      clearError(field);
    }
    
    if (setTouched) {
      setTouched(prev => ({
        ...prev,
        [field]: true
      }));
    }
  }, [setValues, clearError, setTouched]);
  
  /**
   * Set multiple field values at once
   */
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...fields
    }));
    
    if (clearError) {
      Object.keys(fields).forEach(field => {
        clearError(field as keyof T);
      });
    }
    
    if (setTouched) {
      setTouched(prev => ({
        ...prev,
        ...Object.keys(fields).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      }));
    }
  }, [setValues, clearError, setTouched]);
  
  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  };
}
