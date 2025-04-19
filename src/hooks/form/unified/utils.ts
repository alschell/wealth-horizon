
/**
 * Utility functions for form handling
 */

import { ReactNode } from 'react';

/**
 * Create a function to check if a field has an error
 * 
 * @param errors Current form errors
 * @returns Function to check if a field has an error
 */
export function createErrorChecker(errors: Record<string, string>) {
  return (field: string | number | symbol): boolean => {
    return Boolean(errors[field as string]);
  };
}

/**
 * Create a function to get the error message for a field
 * 
 * @param errors Current form errors
 * @returns Function to get the error message for a field
 */
export function createErrorMessageGetter(errors: Record<string, string>) {
  return (field: string | number | symbol): string => {
    return errors[field as string] || '';
  };
}

/**
 * Validate required fields
 * 
 * @param values Form values
 * @param requiredFields List of required field keys
 * @returns Validation errors
 */
export function validateRequiredFields<T>(values: T, requiredFields: (keyof T)[]) {
  const errors: Record<string, string> = {};
  
  requiredFields.forEach(field => {
    const value = values[field];
    if (value === undefined || value === null || value === '' || 
        (Array.isArray(value) && value.length === 0)) {
      errors[field as string] = `${String(field)} is required`;
    }
  });
  
  return errors;
}

/**
 * Create a function to clear a field error
 * 
 * @param setErrors Function to set form errors
 * @returns Function to clear a field error
 */
export function createErrorClearer<T>(
  setErrors: React.Dispatch<React.SetStateAction<Record<keyof T, string>>>
) {
  return (field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };
}
