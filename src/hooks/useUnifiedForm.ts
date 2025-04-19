import { useState, useCallback } from 'react';
import { handleError, ErrorHandlerOptions } from '@/utils/errorHandling';
import { showSuccess } from '@/utils/toast';

export interface FormSubmissionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: (data: T) => boolean;
  resetAfterSubmit?: boolean;
  logToConsole?: boolean;
}

/**
 * Unified form hook for handling form state, validation, and submission
 */
export function useUnifiedForm<T extends Record<string, any>>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  /**
   * Update form field
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
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    updateField(name as keyof T, fieldValue);
  }, [updateField]);

  /**
   * Set field value directly
   */
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    updateField(field, value);
  }, [updateField]);

  /**
   * Set field error
   */
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  /**
   * Clear field error
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

  /**
   * Submit form
   */
  const submitForm = useCallback(async (
    submitFn: (data: T) => Promise<void>,
    options: FormSubmissionOptions<T> = {}
  ) => {
    const {
      onSuccess,
      onError,
      successMessage = 'Form submitted successfully',
      errorMessage = 'Error submitting form',
      validateForm,
      resetAfterSubmit = false,
      logToConsole = true
    } = options;

    // Validate form if validation function is provided
    if (validateForm && !validateForm(formData)) {
      return false;
    }

    setIsSubmitting(true);
    setLastError(null);

    try {
      await submitFn(formData);
      
      if (successMessage) {
        showSuccess('Success', successMessage);
      }
      
      setIsSuccess(true);
      
      if (resetAfterSubmit) {
        resetForm();
      }
      
      if (onSuccess) {
        onSuccess(formData);
      }
      
      return true;
    } catch (error) {
      setIsSuccess(false);
      
      const errorMsg = error instanceof Error ? error.message : errorMessage;
      setLastError(errorMsg);
      
      const errorHandlerOptions: ErrorHandlerOptions = {
        fallbackMessage: errorMessage,
        logError: logToConsole,
        onError: onError
      };
      
      handleError(error, errorHandlerOptions);
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resetForm]);

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
