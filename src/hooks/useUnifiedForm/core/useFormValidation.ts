
import { useCallback } from 'react';
import { validateRequiredFields } from '../utils';

/**
 * Hook for form validation management
 */
export function useFormValidation<T extends Record<string, any>>({
  validate,
  requiredFields,
  setErrors
}: {
  validate?: (values: T) => Record<string, string>;
  requiredFields: (keyof T)[];
  setErrors: (errors: Record<string, string>) => void;
}) {
  // Validate form against validation rules
  const validateForm = useCallback(
    (values: T): boolean => {
      // First check required fields
      const requiredErrors = validateRequiredFields(values, requiredFields);
      
      // Then run custom validation if provided
      const customErrors = validate ? validate(values) : {};
      
      // Combine all errors
      const allErrors = { ...requiredErrors, ...customErrors };
      
      // Update form errors
      setErrors(allErrors);
      
      // Return whether form is valid
      return Object.keys(allErrors).length === 0;
    },
    [validate, requiredFields, setErrors]
  );

  // Set specific field error
  const setFieldError = useCallback(
    (field: keyof T, message: string) => {
      setErrors({ [field as string]: message });
    },
    [setErrors]
  );

  // Clear field error
  const clearFieldError = useCallback(
    (field: keyof T) => {
      setErrors({ [field as string]: '' });
    },
    [setErrors]
  );

  return {
    validateForm,
    setFieldError,
    clearFieldError
  };
}
