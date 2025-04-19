
import { useState, useCallback } from 'react';
import { validateRequiredFields } from '@/utils/validation/formValidation';

interface UseFormFieldsOptions<T> {
  initialValues: T;
  requiredFields?: Array<keyof T>;
  validators?: Partial<Record<keyof T, (value: any) => string | null>>;
}

/**
 * A lightweight hook for managing form fields
 * @param options - Hook configuration options
 * @returns Form field state and utility functions
 */
export function useFormFields<T extends Record<string, any>>(
  options: UseFormFieldsOptions<T>
) {
  const { initialValues, requiredFields = [], validators = {} } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  /**
   * Update a single form field
   */
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Clear error for this field
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
    
    // Run field-specific validator if exists
    const validator = validators[field];
    if (validator) {
      const error = validator(value);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  }, [errors, validators]);
  
  /**
   * Handle input change events
   */
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFieldValue(name as keyof T, fieldValue);
  }, [setFieldValue]);
  
  /**
   * Handle field blur events
   */
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate field on blur
    const validator = validators[field];
    if (validator) {
      const error = validator(values[field]);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  }, [validators, values]);
  
  /**
   * Validate all form fields
   */
  const validateFields = useCallback(() => {
    // Validate required fields
    const requiredErrors = validateRequiredFields(values, requiredFields);
    
    // Run field-specific validators
    const validationErrors: Record<string, string> = { ...requiredErrors };
    
    Object.entries(validators).forEach(([field, validator]) => {
      if (validator) {
        const error = validator(values[field as keyof T]);
        if (error) {
          validationErrors[field] = error;
        }
      }
    });
    
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    return Object.keys(validationErrors).length === 0;
  }, [values, requiredFields, validators]);
  
  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    validateFields,
    resetForm,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialValues),
    isValid: Object.keys(errors).length === 0
  };
}
