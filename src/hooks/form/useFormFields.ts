
import { useState, useCallback } from 'react';
import { validateRequiredFields } from '@/utils/validation/formValidation';

// Define a validator function type
type ValidatorFn = (value: any) => string | null;

interface UseFormFieldsOptions<T> {
  initialValues: T;
  requiredFields?: Array<keyof T>;
  validators?: Partial<Record<keyof T, ValidatorFn>>;
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
    const fieldKey = field as string;
    if (Object.prototype.hasOwnProperty.call(validators, fieldKey)) {
      const validator = validators[fieldKey as keyof typeof validators];
      if (validator) {
        const validationResult = validator(value);
        if (validationResult) {
          setErrors(prev => ({ ...prev, [field]: validationResult }));
        }
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
    const fieldKey = field as string;
    if (Object.prototype.hasOwnProperty.call(validators, fieldKey)) {
      const validator = validators[fieldKey as keyof typeof validators];
      if (validator) {
        const validationResult = validator(values[field]);
        if (validationResult) {
          setErrors(prev => ({ ...prev, [field]: validationResult }));
        }
      }
    }
  }, [validators, values]);
  
  /**
   * Validate all form fields
   */
  const validateFields = useCallback(() => {
    // Validate required fields
    const requiredErrors = validateRequiredFields(values, requiredFields as Array<keyof T>);
    
    // Run field-specific validators
    const validationErrors: Record<string, string> = { ...requiredErrors };
    
    Object.keys(validators).forEach((fieldName) => {
      const field = fieldName as string;
      if (Object.prototype.hasOwnProperty.call(validators, field)) {
        const validator = validators[field as keyof typeof validators];
        
        if (validator && field in values) {
          const validationResult = validator(values[field as keyof T]);
          if (validationResult) {
            validationErrors[field] = validationResult;
          }
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
