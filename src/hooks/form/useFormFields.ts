
import { useState, useCallback } from 'react';

export interface UseFormFieldsOptions<T> {
  initialValues: T;
  requiredFields?: (keyof T)[];
  validators?: {
    [key in keyof T]?: (value: any) => string | null;
  };
}

/**
 * Hook for managing form field changes and updates
 * 
 * @param options Hook options
 * @returns Form state and field handler functions
 */
export function useFormFields<T extends Record<string, any>>(
  options: UseFormFieldsOptions<T>
) {
  const { initialValues, requiredFields = [], validators = {} } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDirty, setIsDirty] = useState(false);
  
  const clearError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    clearError(name as keyof T);
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    setIsDirty(true);
  }, [clearError]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Validate on blur
    validateField(field);
  }, []);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    clearError(field);
    
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    setIsDirty(true);
  }, [clearError]);

  const setFieldValues = useCallback((fields: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...fields
    }));
    
    Object.keys(fields).forEach(field => {
      clearError(field as keyof T);
    });
    
    setTouched(prev => {
      const touchedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      return {
        ...prev,
        ...touchedFields
      };
    });
    
    setIsDirty(true);
  }, [clearError]);

  // Validate a single field
  const validateField = useCallback((field: keyof T) => {
    // Check for required field
    if (requiredFields.includes(field) && 
        (values[field as keyof T] === undefined || 
         values[field as keyof T] === null || 
         values[field as keyof T] === '')) {
      setErrors(prev => ({
        ...prev,
        [field as string]: `${String(field)} is required`
      }));
      return false;
    }
    
    // Run custom validator if provided
    if (validators[field as keyof T]) {
      const validatorFn = validators[field as keyof T];
      const errorMessage = validatorFn?.(values[field as keyof T]);
      
      if (errorMessage) {
        setErrors(prev => ({
          ...prev,
          [field as string]: errorMessage
        }));
        return false;
      }
    }
    
    // Clear error if validation passes
    clearError(field);
    return true;
  }, [values, requiredFields, validators, clearError]);

  // Validate all fields
  const validateFields = useCallback(() => {
    let isValid = true;
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    // Validate required fields
    requiredFields.forEach(field => {
      if (values[field as keyof T] === undefined || 
          values[field as keyof T] === null || 
          values[field as keyof T] === '') {
        setErrors(prev => ({
          ...prev,
          [field as string]: `${String(field)} is required`
        }));
        isValid = false;
      }
    });
    
    // Run custom validators
    Object.keys(validators).forEach(key => {
      const field = key as keyof T;
      const validatorFn = validators[field];
      
      if (validatorFn) {
        const errorMessage = validatorFn(values[field]);
        
        if (errorMessage) {
          setErrors(prev => ({
            ...prev,
            [field as string]: errorMessage
          }));
          isValid = false;
        }
      }
    });
    
    return isValid;
  }, [values, requiredFields, validators]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isDirty,
    isValid: Object.keys(errors).length === 0,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    validateFields,
    resetForm
  };
}
