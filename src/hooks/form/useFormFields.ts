import { useState, useCallback } from 'react';
import type { Validator } from './validators/validatorUtils';
import { validateField, validateFields as validateMultipleFields, createErrorClearer } from '@/utils/form/validation/formValidationUtils';

export interface UseFormFieldsOptions<T> {
  initialValues: T;
  requiredFields?: (keyof T)[];
  validators?: Partial<Record<keyof T, Validator>>;
}

export function useFormFields<T extends Record<string, any>>(
  options: UseFormFieldsOptions<T>
) {
  const { 
    initialValues, 
    requiredFields = [], 
    validators = {} as Partial<Record<keyof T, Validator>> 
  } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDirty, setIsDirty] = useState(false);
  
  const clearError = useCallback(createErrorClearer<T>(setErrors), []);

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
    
    validateSingleField(field);
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

  const validateSingleField = useCallback((field: keyof T) => {
    if (requiredFields.includes(field) && 
        (values[field] === undefined || 
         values[field] === null || 
         values[field] === '' ||
         (Array.isArray(values[field]) && values[field].length === 0))) {
      setErrors(prev => ({
        ...prev,
        [field as string]: `${String(field)} is required`
      }));
      return false;
    }
    
    if (field in validators && validators[field]) {
      const error = validateField(field, values[field], validators[field]!);
      if (error) {
        setErrors(prev => ({
          ...prev,
          [field as string]: error
        }));
        return false;
      }
    }
    
    clearError(field);
    return true;
  }, [values, requiredFields, validators, clearError]);

  const validateAllFields = useCallback(() => {
    const errors = validateMultipleFields(values, validators, requiredFields);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [values, validators, requiredFields]);

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
    validateFields: validateAllFields,
    resetForm
  };
}
