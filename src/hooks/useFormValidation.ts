
import { useState, useCallback } from 'react';

export interface ValidationRules<T> {
  [key: string]: (value: any) => string | null;
}

export interface ValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Hook for form validation
 */
export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRules<T>,
  options: ValidationOptions = {}
) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set());

  // Validate a single field
  const validateField = useCallback(
    (fieldName: keyof T, value: any): string | null => {
      const validator = validationRules[fieldName as string];
      return validator ? validator(value) : null;
    },
    [validationRules]
  );

  // Validate the entire form
  const validateForm = useCallback(
    (data: T): boolean => {
      const newErrors: Partial<Record<keyof T, string>> = {};
      let isValid = true;

      for (const field in validationRules) {
        const error = validateField(field as keyof T, data[field as keyof T]);
        if (error) {
          newErrors[field as keyof T] = error;
          isValid = false;
        }
      }

      setErrors(newErrors);
      return isValid;
    },
    [validateField, validationRules]
  );

  // Handle field change
  const handleFieldChange = useCallback(
    (field: keyof T, value: any, validateOnChange = options.validateOnChange) => {
      if (validateOnChange) {
        const error = validateField(field, value);
        setErrors(prev => ({
          ...prev,
          [field]: error
        }));
      } else if (touchedFields.has(field)) {
        // Clear error if field has been touched before
        setErrors(prev => {
          const newErrors = { ...prev };
          if (newErrors[field]) {
            delete newErrors[field];
          }
          return newErrors;
        });
      }
    },
    [options.validateOnChange, touchedFields, validateField]
  );

  // Handle field blur
  const handleFieldBlur = useCallback(
    (field: keyof T, value: any, validateOnBlur = options.validateOnBlur) => {
      // Mark field as touched
      setTouchedFields(prev => new Set([...prev, field]));
      
      if (validateOnBlur) {
        const error = validateField(field, value);
        setErrors(prev => ({
          ...prev,
          [field]: error
        }));
      }
    },
    [options.validateOnBlur, validateField]
  );

  // Set a specific error
  const setError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  // Clear a specific error
  const clearError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      if (newErrors[field]) {
        delete newErrors[field];
      }
      return newErrors;
    });
  }, []);

  // Check if there are any errors
  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    hasErrors,
    validateField,
    validateForm,
    handleFieldChange,
    handleFieldBlur,
    setError,
    clearError,
    touchedFields
  };
}
