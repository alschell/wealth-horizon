
import { useCallback } from 'react';
import { FormState } from './types';
import { showError } from '@/utils/toast';

/**
 * Centralized error handling for forms
 *
 * @param formState Current form state
 * @param setFormState Form state setter
 * @param options Error handling options
 * @returns Error handling methods
 */
export function useFormErrorHandling<T extends Record<string, any>>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  options: {
    errorMessage?: string;
    logErrors?: boolean;
  } = {}
) {
  const { errorMessage = 'Please fix the errors in the form', logErrors = true } = options;

  /**
   * Set a field error
   */
  const setFieldError = useCallback(
    (field: keyof T, message: string) => {
      if (logErrors) {
        console.debug(`Form error (${String(field)}):`, message);
      }

      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field as string]: message }
      }));
    },
    [setFormState, logErrors]
  );

  /**
   * Clear a field error
   */
  const clearFieldError = useCallback(
    (field: keyof T) => {
      setFormState(prev => {
        const newErrors = { ...prev.errors };
        delete newErrors[field as string];
        return {
          ...prev,
          errors: newErrors
        };
      });
    },
    [setFormState]
  );

  /**
   * Show validation errors to the user
   */
  const showValidationErrors = useCallback(() => {
    const errorCount = Object.keys(formState.errors).length;
    
    if (errorCount > 0) {
      showError(
        'Validation Error', 
        errorCount === 1
          ? `There is 1 error in the form. ${errorMessage}`
          : `There are ${errorCount} errors in the form. ${errorMessage}`
      );
      
      return true;
    }
    
    return false;
  }, [formState.errors, errorMessage]);

  /**
   * Handle a form error
   */
  const handleFormError = useCallback(
    (error: unknown) => {
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      if (logErrors) {
        console.error('Form submission error:', error);
      }
      
      showError('Error', errorMsg);
      
      return errorMsg;
    },
    [logErrors]
  );

  return {
    setFieldError,
    clearFieldError,
    showValidationErrors,
    handleFormError
  };
}
