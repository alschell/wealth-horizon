import { useState, useCallback } from 'react';
import type { Validator } from './validators/validatorUtils';

export interface UseFormFieldsOptions<T> {
  initialValues: T;
  requiredFields?: (keyof T)[];
  validators?: Partial<Record<keyof T, Validator>>;
}

/**
 * Hook for managing form field changes and updates
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
      [field as string]: true
    }));
    
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
      [field as string]: true
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

  const validateField = useCallback((field: keyof T) => {
    if (requiredFields.includes(field) && 
        (values[field] === undefined || 
         values[field] === null || 
         values[field] === '')) {
      setErrors(prev => ({
        ...prev,
        [field as string]: `${String(field)} is required`
      }));
      return false;
    }
    
    const fieldKey = field as string;
    const validator = validators[field];
    
    if (validator && typeof validator === 'function') {
      const errorMessage = validator(values[field]);
      if (errorMessage) {
        setErrors(prev => ({
          ...prev,
          [fieldKey]: errorMessage
        }));
        return false;
      }
    }
    
    clearError(field);
    return true;
  }, [values, requiredFields, validators, clearError]);

  const validateFields = useCallback(() => {
    let isValid = true;
    
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    Object.keys(validators).forEach(key => {
      const field = key as keyof T;
      const validator = validators[field];
      
      if (validator && typeof validator === 'function') {
        if (!validateField(field)) {
          isValid = false;
        }
      }
    });
    
    return isValid;
  }, [validateField, requiredFields, validators, values]);

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
    resetForm: useCallback(() => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setIsDirty(false);
    }, [initialValues])
  };
}
