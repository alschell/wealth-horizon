
import { useState, useCallback } from 'react';
import { createErrorClearer, validateRequiredFields } from '@/utils/form';
import { showSuccessToast, showErrorToast } from '@/utils/toast';

interface UseFormOptions<T> {
  initialValues: T;
  requiredFields?: (keyof T)[];
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<boolean> | boolean;
  successMessage?: string;
  errorMessage?: string;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  requiredFields = [],
  validate,
  onSubmit,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Please fix the errors in the form'
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Clear error for a specific field
  const clearError = createErrorClearer(setErrors);
  
  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({ ...prev, [name]: fieldValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
    clearError(name as keyof T);
  }, [clearError]);
  
  // Handle selection changes
  const handleSelectChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    clearError(field);
  }, [clearError]);
  
  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);
  
  // Validate the form
  const validateForm = useCallback(() => {
    // Check required fields
    const requiredErrors = validateRequiredFields(values, requiredFields);
    
    // Run custom validation if provided
    const customErrors = validate ? validate(values) : {};
    
    // Combine errors
    const combinedErrors = { ...requiredErrors, ...customErrors };
    
    setErrors(combinedErrors);
    return Object.keys(combinedErrors).length === 0;
  }, [values, requiredFields, validate]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>);
    
    setTouched(allTouched);
    
    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      showErrorToast('Validation Error', errorMessage);
      return false;
    }
    
    // Submit form
    setIsSubmitting(true);
    try {
      const result = await onSubmit(values);
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
  }, [values, validateForm, onSubmit, errorMessage, successMessage]);
  
  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
}

export default useForm;
