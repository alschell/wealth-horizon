
import { useState, useCallback } from 'react';
import { showErrorToast } from '@/utils/toast';

interface UseFormStateOptions<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
}

/**
 * Hook for managing form state with controlled components
 */
export function useFormState<T extends Record<string, any>>({
  initialValues,
  validate
}: UseFormStateOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDirty, setIsDirty] = useState(false);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  }, [initialValues]);

  // Handle input change for controlled inputs
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setIsDirty(true);
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Set a field value programmatically
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    setIsDirty(true);
    
    // Clear error when field is modified
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  // Set multiple field values at once
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setValues(prev => ({ ...prev, ...fields }));
    
    // Mark all modified fields as touched
    const touchedFields = Object.keys(fields).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(prev => ({ ...prev, ...touchedFields }));
    setIsDirty(true);
    
    // Clear errors for modified fields
    Object.keys(fields).forEach((field) => {
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    });
  }, [errors]);

  // Validate the form
  const validateForm = useCallback((): boolean => {
    if (!validate) return true;
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    // Mark all fields with errors as touched
    if (Object.keys(validationErrors).length > 0) {
      const touchedFields = Object.keys(validationErrors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      setTouched(prev => ({ ...prev, ...touchedFields }));
    }
    
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  // Handle form submission
  const handleSubmit = useCallback((e?: React.FormEvent) => {
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
      showErrorToast("Validation Error", "Please correct the errors in the form");
      return false;
    }
    
    return true;
  }, [values, validateForm]);

  return {
    values,
    errors,
    touched,
    isDirty,
    handleChange,
    setFieldValue,
    setFieldValues,
    handleSubmit,
    resetForm,
    validateForm,
    // Helper for checking if a field has been touched and has an error
    hasError: useCallback((field: keyof T) => touched[field as string] && Boolean(errors[field as string]), [touched, errors]),
    // Helper for getting error message
    getErrorMessage: useCallback((field: keyof T) => errors[field as string] || '', [errors])
  };
}
