
import { useState, useCallback } from 'react';
import { showSuccessToast, showErrorToast } from '@/utils/toast';

export interface FormControlOptions<T> {
  initialValues: T;
  onSubmit?: (values: T) => Promise<boolean> | boolean;
  validate?: (values: T) => Record<string, string>;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A hook for managing form state, validation and submission with consistent feedback
 */
export function useFormControls<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  successMessage = 'Form submitted successfully',
  errorMessage = 'There was an error submitting the form'
}: FormControlOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSuccess(false);
  }, [initialValues]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const setFieldValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Clear error when field is modified
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    if (!validate) return true;
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    if (!validateForm()) {
      showErrorToast('Validation Error', errorMessage);
      return false;
    }
    
    if (!onSubmit) return true;
    
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      const result = await onSubmit(values);
      setIsSuccess(result);
      
      if (result) {
        showSuccessToast('Success', successMessage);
      } else {
        showErrorToast('Error', 'Form submission failed');
      }
      
      return result;
    } catch (error) {
      console.error('Form submission error:', error);
      showErrorToast('Error', error instanceof Error ? error.message : 'Form submission failed');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit, successMessage, errorMessage]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    setValues,
    validateForm,
    // Helper for checking if a field has been touched and has an error
    hasError: useCallback((field: string) => touched[field] && Boolean(errors[field]), [touched, errors]),
    // Helper for getting error message
    getErrorMessage: useCallback((field: string) => errors[field] || '', [errors])
  };
}
