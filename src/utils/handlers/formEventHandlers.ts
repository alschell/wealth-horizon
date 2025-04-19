
/**
 * Reusable form event handlers
 */
import { ChangeEvent } from 'react';

/**
 * Creates a handler for input changes
 */
export const createInputChangeHandler = <T extends Record<string, any>>(
  setValues: React.Dispatch<React.SetStateAction<T>>,
  clearError?: (field: keyof T) => void
) => {
  return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setValues(prev => ({ ...prev, [name]: fieldValue }));
    if (clearError) {
      clearError(name as keyof T);
    }
  };
};

/**
 * Creates a handler for field blur events
 */
export const createBlurHandler = <T extends Record<string, any>>(
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  return (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
};
