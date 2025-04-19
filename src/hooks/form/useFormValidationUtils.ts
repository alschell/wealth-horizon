
import { useCallback } from 'react';

/**
 * Hook for form validation utility functions
 * 
 * @param errors Current form errors
 * @returns Validation utility functions
 */
export function useFormValidationUtils(errors: Record<string, string>) {
  // Check if a field has an error
  const hasError = useCallback((field: string | number | symbol) => {
    return Boolean(errors[field as string]);
  }, [errors]);

  // Get error message for a field
  const getErrorMessage = useCallback((field: string | number | symbol) => {
    return errors[field as string] || '';
  }, [errors]);

  // Create an error checker function
  const createErrorChecker = () => hasError;

  // Create an error message getter function
  const createErrorMessageGetter = () => getErrorMessage;

  return {
    hasError,
    getErrorMessage,
    createErrorChecker,
    createErrorMessageGetter
  };
}
