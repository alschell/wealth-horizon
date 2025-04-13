
import { useState, useCallback } from 'react';

/**
 * Custom hook for handling form state and validation
 * 
 * @param initialState - Initial form state
 * @param validationSchema - Optional validation schema function
 * @returns Form state, handlers, and validation utilities
 */
export function useFormHandler<T extends Record<string, any>>(
  initialState: T,
  validationSchema?: (formData: T) => Partial<Record<keyof T, string>>
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  // Handle input changes
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear the error for this field when it changes
    if (errors[name as keyof T]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof T];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle selection changes
  const handleSelectionChange = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Clear the error for this field when it changes
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Validate the form
  const validateForm = useCallback(() => {
    if (!validationSchema) return true;
    
    const newErrors = validationSchema(formData);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }, [formData, validationSchema]);

  // Reset the form
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  // Check if a field has been touched and has an error
  const hasError = useCallback((field: keyof T) => {
    return touched[field] && Boolean(errors[field]);
  }, [errors, touched]);

  // Get the error message for a field
  const getErrorMessage = useCallback((field: keyof T) => {
    return hasError(field) ? errors[field] : '';
  }, [errors, hasError]);

  return {
    formData,
    errors,
    touched,
    handleInputChange,
    handleSelectionChange,
    validateForm,
    resetForm,
    hasError,
    getErrorMessage,
    setFormData
  };
}
