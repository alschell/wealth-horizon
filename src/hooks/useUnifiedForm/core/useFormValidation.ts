
import { useCallback } from 'react';

interface ValidationOptions<T> {
  validate?: (values: T) => Record<string, string>;
  requiredFields?: Array<keyof T>;
  setErrors: (errors: Partial<Record<keyof T, string>> | ((prevErrors: Record<string, string>) => Record<string, string>)) => void;
}

/**
 * Hook for form validation
 * 
 * @param options Validation options
 * @returns Validation functions
 */
export function useFormValidation<T extends Record<string, any>>(options: ValidationOptions<T>) {
  const { validate, requiredFields = [], setErrors } = options;

  // Validate required fields
  const validateRequiredFields = useCallback((values: T): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    for (const field of requiredFields) {
      const value = values[field];
      if (value === undefined || value === null || value === '') {
        errors[field as string] = `${String(field)} is required`;
      }
    }
    
    return errors;
  }, [requiredFields]);

  // Validate form
  const validateForm = useCallback((values: T): boolean => {
    // First check required fields
    const requiredErrors = validateRequiredFields(values);
    
    // Then run custom validation if provided
    const customErrors = validate ? validate(values) : {};
    
    // Combine errors
    const allErrors = { ...requiredErrors, ...customErrors };
    
    // Update form errors
    setErrors(allErrors);
    
    // Return whether form is valid
    return Object.keys(allErrors).length === 0;
  }, [validateRequiredFields, validate, setErrors]);

  // Set field error
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors({ [field]: message } as Partial<Record<keyof T, string>>);
  }, [setErrors]);

  // Clear field error
  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, [setErrors]);

  return {
    validateForm,
    validateRequiredFields,
    setFieldError,
    clearFieldError
  };
}
