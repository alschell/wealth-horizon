
/**
 * Reusable form event handlers
 */
import { 
  FormInputChangeEvent, 
  SetFormValues, 
  ClearFieldError,
  SetFormTouched
} from './types';

/**
 * Creates a handler for input changes
 * @param setValues - Function to update form values
 * @param clearError - Optional function to clear field errors
 * @returns Event handler for input changes
 */
export const createInputChangeHandler = <T extends Record<string, any>>(
  setValues: SetFormValues<T>,
  clearError?: ClearFieldError<T>
) => {
  return (e: FormInputChangeEvent) => {
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
 * @param setTouched - Function to update touched fields
 * @returns Event handler for field blur
 */
export const createBlurHandler = <T extends Record<string, any>>(
  setTouched: SetFormTouched
) => {
  return (field: keyof T) => {
    setTouched({ [field]: true });
  };
};
