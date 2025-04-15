
import { useState, useCallback } from 'react';
import { FormError } from './types';

/**
 * Hook for form validation with custom validation rules
 * 
 * @param rules Validation rules for form fields
 * @returns Form validation state and methods
 */
export function useFormValidation<T extends Record<string, any>>(
  initialErrors: Record<string, string> = {}
) {
  const [errors, setErrors] = useState<Record<string, string>>(initialErrors);
  
  // Validate form against rules
  const validateForm = useCallback((
    values: T,
    rules: Record<string, (value: any) => string | null>
  ): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Check each field against its validation rule
    Object.entries(rules).forEach(([field, validate]) => {
      if (validate) {
        const error = validate(values[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, []);
  
  // Set a specific field error
  const setFieldError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);
  
  // Clear a specific field error
  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);
  
  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);
  
  return {
    errors,
    validateForm,
    setFieldError,
    clearFieldError,
    clearErrors,
    hasErrors: Object.keys(errors).length > 0
  };
}
