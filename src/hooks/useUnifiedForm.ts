
import { useState, useCallback } from 'react';
import { getErrorMessage, parseError } from '@/utils/errorHandling';
import { showSuccess } from '@/utils/toast';
import { useFormSubmission } from './form/useFormSubmission';
// Removed the conflicting import

/**
 * Options for form submission
 * @template T The type of form data being submitted
 */
export interface FormSubmissionOptions<T> {
  /** Callback executed after successful submission */
  onSuccess?: (data: T) => void;
  
  /** Callback executed when an error occurs */
  onError?: (error: unknown) => void;
  
  /** Success message to display */
  successMessage?: string;
  
  /** Error message to display on failure */
  errorMessage?: string;
  
  /** Function to validate form before submission */
  validateForm?: (data: T) => boolean;
  
  /** Whether to reset form state after submission */
  resetAfterSubmit?: boolean;
  
  /** Whether to log errors to console */
  logToConsole?: boolean;
}

/**
 * Unified form hook for handling form state, validation, and submission
 * 
 * @template T The type of form data
 * @param initialData Initial form data
 * @returns Object containing form state and methods
 */
export function useUnifiedForm<T extends Record<string, any>>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  /**
   * Update form field value
   * @param field Field name to update
   * @param value New value for the field
   */
  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  /**
   * Handle input change event
   * @param e Change event from input element
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    updateField(name as keyof T, fieldValue);
  }, [updateField]);

  /**
   * Set field value directly
   * @param field Field name to update
   * @param value New value for the field
   */
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    updateField(field, value);
  }, [updateField]);

  /**
   * Set field error message
   * @param field Field name to set error for
   * @param message Error message
   */
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  /**
   * Clear field error
   * @param field Field name to clear error for
   */
  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setIsSuccess(false);
    setLastError(null);
  }, [initialData]);

  const { createSubmitHandler } = useFormSubmission<T>();

  /**
   * Submit form data
   * @param submitFn Function to call with form data
   * @param options Form submission options
   * @returns Promise resolving to boolean indicating success
   */
  const submitForm = useCallback(async (
    submitFn: (data: T) => Promise<void>,
    options: FormSubmissionOptions<T> = {}
  ) => {
    // Create a compatible options object to pass to the form submission hook
    const formSubmissionOptions = {
      ...options,
      resetForm: resetForm
    };
    
    // Remove logToConsole as it's not part of the form submission hook options
    if ('logToConsole' in formSubmissionOptions) {
      delete (formSubmissionOptions as any).logToConsole;
    }
    
    const submitHandler = createSubmitHandler(submitFn, formSubmissionOptions);
    return submitHandler(formData);
  }, [formData, resetForm, createSubmitHandler]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    isSuccess,
    lastError,
    updateField,
    handleInputChange,
    setFieldValue,
    setFieldError,
    clearFieldError,
    resetForm,
    submitForm
  };
}
