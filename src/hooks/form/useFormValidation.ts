
import { useCallback } from 'react';
import type { Validator } from './validators';

/**
 * Options for form validation hook
 */
interface UseFormValidationOptions<T> {
  validators: Record<string, Validator>;
  requiredFields: (keyof T)[];
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

/**
 * Hook for form validation
 * 
 * @param options Validation options
 * @returns Validation functions
 */
export function useFormValidation<T extends Record<string, any>>(options: UseFormValidationOptions<T>) {
  const { validators, requiredFields, setErrors } = options;

  const validateForm = useCallback((values: T) => {
    const errors: Record<string, string> = {};
    
    // Validate required fields
    requiredFields.forEach(field => {
      const value = values[field];
      if (value === undefined || value === null || value === '' || 
          (Array.isArray(value) && value.length === 0)) {
        errors[field as string] = `${String(field)} is required`;
      }
    });
    
    // Apply custom validators
    Object.entries(validators).forEach(([field, validator]) => {
      if (!errors[field] && validator && typeof validator === 'function') {
        const message = validator(values[field as keyof T]);
        if (message) {
          errors[field] = message;
        }
      }
    });
    
    // Replace all errors with the validation results
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [validators, requiredFields, setErrors]);

  // Set a specific field error
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field as string]: message
    }));
  }, [setErrors]);

  // Clear a specific field error
  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, [setErrors]);

  return {
    validateForm,
    setFieldError,
    clearFieldError
  };
}
