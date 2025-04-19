
/**
 * Reusable form event handlers
 */
import { ChangeEvent } from 'react';

/**
 * Creates a handler for input changes
 */
export const createInputChangeHandler = <T extends Record<string, any>>(
  setValues: (values: T) => void,
  clearError?: (field: keyof T) => void
) => {
  return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setValues({ [name]: fieldValue } as unknown as T);
    if (clearError) {
      clearError(name as keyof T);
    }
  };
};

/**
 * Creates a handler for field blur events
 */
export const createBlurHandler = <T extends Record<string, any>>(
  setTouched: (touched: Record<string, boolean>) => void
) => {
  return (field: keyof T) => {
    setTouched({ [field]: true });
  };
};
