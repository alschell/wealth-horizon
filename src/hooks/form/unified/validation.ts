
import { useMemo } from 'react';

/**
 * Create a memoized error checker function
 * @param errors Error record
 * @returns Function to check if a field has an error
 */
export function createErrorChecker(errors: Record<string, string>) {
  return (field: string): boolean => {
    return Boolean(errors[field]);
  };
}

/**
 * Create a memoized error message getter function
 * @param errors Error record
 * @returns Function to get error message for a field
 */
export function createErrorMessageGetter(errors: Record<string, string>) {
  return (field: string): string => {
    return errors[field] || '';
  };
}

/**
 * Create a memoized error clearer function
 * @param setFormState Form state setter
 * @returns Function to clear error for a field
 */
export function createErrorClearer<T>(
  setFormState: React.Dispatch<React.SetStateAction<any>>
) {
  return (field: keyof T) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field as string];
      return {
        ...prev,
        errors: newErrors
      };
    });
  };
}

/**
 * Validate required fields in a form
 * @param values Form values
 * @param requiredFields Array of required field keys
 * @returns Object with field errors
 */
export function validateRequiredFields<T>(
  values: T,
  requiredFields: Array<keyof T> = []
): Record<string, string> {
  const errors: Record<string, string> = {};

  requiredFields.forEach(field => {
    const value = values[field];
    const isEmpty =
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0);

    if (isEmpty) {
      errors[field as string] = 'This field is required';
    }
  });

  return errors;
}

/**
 * Hook for form validation that memoizes validation functions
 * @param errors Current error state
 * @returns Memoized validation utilities
 */
export function useFormValidationUtils(errors: Record<string, string>) {
  const hasError = useMemo(
    () => createErrorChecker(errors),
    [errors]
  );

  const getErrorMessage = useMemo(
    () => createErrorMessageGetter(errors),
    [errors]
  );

  return {
    hasError,
    getErrorMessage
  };
}
