
import { useCallback } from 'react';

/**
 * Hook for form validation utilities
 * 
 * @param errors Current form errors
 * @returns Validation utility functions
 */
export function useFormValidationUtils(errors: Record<string, string>) {
  const hasError = useCallback(
    (field: string) => Boolean(errors[field]),
    [errors]
  );

  const getErrorMessage = useCallback(
    (field: string) => errors[field] || '',
    [errors]
  );

  return {
    hasError,
    getErrorMessage
  };
}
