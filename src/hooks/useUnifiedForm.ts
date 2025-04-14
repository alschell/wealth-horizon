
import { useState, useCallback } from 'react';
import { showSuccess, showError } from '@/utils/toast';

export interface FormValidationErrors<T> {
  [key: string]: string;
}

export interface UseUnifiedFormProps<T extends Record<string, any>> {
  initialValues: T;
  onSubmit?: (values: T) => Promise<boolean> | boolean;
  validate?: (values: T) => FormValidationErrors<T>;
  requiredFields?: (keyof T)[];
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A unified form hook that combines the best aspects of multiple form hooks
 * Provides form state management, validation, and submission handling
 */
export function useUnifiedForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  requiredFields = [],
  successMessage = 'Form submitted successfully',
  errorMessage = 'Please fix the errors in the form'
}: UseUnifiedFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormValidationErrors<T>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate required fields
  const validateRequiredFields = useCallback((data: T): FormValidationErrors<T> => {
    const fieldErrors: FormValidationErrors<T> = {};
    
    requiredFields.forEach(field => {
      const value = data[field];
      if (value === undefined || value === null || value === '') {
        fieldErrors[field as string] = `${String(field)} is required`;
      }
    });
    
    return fieldErrors;
  }, [requiredFields]);

  // Handle input changes
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle field value changes directly (for custom inputs)
  const setFieldValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Validate form
  const validateForm = useCallback((): boolean => {
    // Start with required field validation
    const requiredErrors = validateRequiredFields(values);
    
    // Add custom validation if provided
    const customErrors = validate ? validate(values) : {};
    
    // Combine errors
    const allErrors = { ...requiredErrors, ...customErrors };
    setErrors(allErrors);
    
    return Object.keys(allErrors).length === 0;
  }, [values, validate, validateRequiredFields]);

  // Handle form submission
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
      showError('Validation Error', errorMessage);
      return false;
    }
    
    if (!onSubmit) return true;
    
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      const result = await onSubmit(values);
      setIsSuccess(result);
      
      if (result) {
        showSuccess('Success', successMessage);
      } else {
        showError('Error', 'Form submission failed');
      }
      
      return result;
    } catch (error) {
      console.error('Form submission error:', error);
      showError('Error', error instanceof Error ? error.message : 'Form submission failed');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit, successMessage, errorMessage]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSuccess(false);
  }, [initialValues]);

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
