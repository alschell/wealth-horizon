
import { useCallback } from 'react';

/**
 * Options for the useFormFieldHandlers hook
 */
interface UseFormFieldHandlersOptions<T> {
  setValues: (fn: (prev: T) => T) => void;
  clearError: (field: keyof T) => void;
  setTouched: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}

/**
 * Hook for handling form field events
 * 
 * Provides reusable handlers for form field changes, blur events, and setting field values
 * 
 * @param options Hook options
 * @returns Field handling functions
 */
export function useFormFieldHandlers<T extends Record<string, any>>(
  options: UseFormFieldHandlersOptions<T>
) {
  const { setValues, clearError, setTouched } = options;

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;
      
      // Handle checkbox inputs specially
      const inputValue = type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value;
      
      // Update form values
      setValues(prev => ({
        ...prev,
        [name]: inputValue
      }));
      
      // Clear error for this field
      clearError(name as keyof T);
    },
    [setValues, clearError]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (field: keyof T) => {
      // Mark field as touched
      setTouched(prev => ({
        ...prev,
        [field as string]: true
      }));
    },
    [setTouched]
  );

  // Set a specific field value
  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      // Update form values
      setValues(prev => ({
        ...prev,
        [field]: value
      }));
      
      // Clear error for this field
      clearError(field);
    },
    [setValues, clearError]
  );

  // Set multiple field values at once
  const setFieldValues = useCallback(
    (fields: Partial<T>) => {
      // Update form values
      setValues(prev => ({
        ...prev,
        ...fields
      }));
      
      // Clear errors for all updated fields
      Object.keys(fields).forEach(field => {
        clearError(field as keyof T);
      });
    },
    [setValues, clearError]
  );

  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  };
}
