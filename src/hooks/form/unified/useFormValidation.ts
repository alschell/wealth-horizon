
import { useCallback } from 'react';
import { FormState } from './types';

/**
 * Hook for form validation functionality
 * 
 * @param formState - Current form state
 * @param setFormState - Function to update form state
 * @param validate - Custom validation function
 * @param requiredFields - Array of required field names
 * @param validateRequiredFields - Function to validate required fields
 * @returns Form validation handlers
 */
export function useFormValidation<T extends Record<string, any>>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  validate: ((values: T) => Record<string, string>) | undefined,
  requiredFields: Array<keyof T>,
  validateRequiredFields: (values: T, requiredFields: Array<keyof T>) => Record<string, string>
) {
  // Set a field error
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field as string]: message }
    }));
  }, [setFormState]);

  // Validate the form
  const validateForm = useCallback(() => {
    // Validate required fields
    const requiredErrors = validateRequiredFields(formState.values, requiredFields);
    
    // Run custom validation if provided
    const customErrors = validate ? validate(formState.values) : {};
    
    // Combine errors
    const combinedErrors = { ...requiredErrors, ...customErrors };
    
    // Update form errors
    setFormState(prev => ({
      ...prev,
      errors: combinedErrors
    }));
    
    // Return whether form is valid
    return Object.keys(combinedErrors).length === 0;
  }, [formState.values, requiredFields, validate, setFormState, validateRequiredFields]);

  return {
    setFieldError,
    validateForm
  };
}
