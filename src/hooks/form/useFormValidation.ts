
import { useCallback } from 'react';
import { Validator, createFormValidator } from '@/utils/validation/core';

/**
 * Options for form validation
 */
interface UseFormValidationOptions<T> {
  /**
   * Custom field validators
   */
  validators?: Partial<Record<keyof T, Validator>>;
  
  /**
   * Required fields in the form
   */
  requiredFields?: Array<keyof T>;
  
  /**
   * Function to set form errors
   */
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

/**
 * Hook for form validation
 * 
 * @param options Validation options
 * @returns Form validation utilities
 */
export function useFormValidation<T extends Record<string, any>>(
  options: UseFormValidationOptions<T>
) {
  const { validators = {}, requiredFields = [], setErrors } = options;
  
  /**
   * Validate form data
   */
  const validateForm = useCallback(
    (values: T): boolean => {
      // Create a validator function from field validators
      const validate = createFormValidator<T>(validators);
      
      // Run validation and update errors
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      // Return whether form is valid
      return Object.keys(validationErrors).length === 0;
    },
    [validators, setErrors]
  );
  
  /**
   * Set a field error
   */
  const setFieldError = useCallback(
    (field: keyof T, message: string) => {
      setErrors(prev => ({
        ...prev,
        [field as string]: message
      }));
    },
    [setErrors]
  );
  
  /**
   * Clear a field error
   */
  const clearFieldError = useCallback(
    (field: keyof T) => {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    },
    [setErrors]
  );
  
  return {
    validateForm,
    setFieldError,
    clearFieldError
  };
}
