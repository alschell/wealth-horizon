
import { useMemo } from 'react';

/**
 * Hook that provides memoized validation utility functions
 * 
 * @param errors Form error records
 * @returns Validation utility functions
 */
export function useFormValidationUtils(errors: Record<string, string>) {
  /**
   * Check if a field has an error
   */
  const hasError = useMemo(
    () => (field: string): boolean => {
      return Boolean(errors[field]);
    },
    [errors]
  );
  
  /**
   * Get error message for a field
   */
  const getErrorMessage = useMemo(
    () => (field: string): string => {
      return errors[field] || '';
    },
    [errors]
  );
  
  return {
    hasError,
    getErrorMessage
  };
}
