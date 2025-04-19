
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form errors
 * 
 * @returns Error handling functions and state
 */
export function useFormErrors<T extends Record<string, any>>() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field as string]: message
    }));
  }, []);
  
  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);
  
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);
  
  const hasErrors = useCallback(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);
  
  return {
    errors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    hasErrors,
    setErrors
  };
}
