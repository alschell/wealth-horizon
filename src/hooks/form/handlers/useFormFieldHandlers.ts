
import { useCallback } from 'react';

interface UseFormFieldHandlersOptions<T> {
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  clearError: (field: keyof T) => void;
}

export function useFormFieldHandlers<T extends Record<string, any>>(
  options: UseFormFieldHandlersOptions<T>
) {
  const { setValues, setTouched, clearError } = options;

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    clearError(name as keyof T);
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, [setValues, clearError, setTouched]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  }, [setTouched]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    clearError(field);
    
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  }, [setValues, clearError, setTouched]);

  const setFieldValues = useCallback((fields: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...fields
    }));
    
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
  }, [setValues, clearError, setTouched]);

  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  };
}
