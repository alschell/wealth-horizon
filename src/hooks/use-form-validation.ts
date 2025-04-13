
// Create a common form validation hook to standardize validation across the app
import { useState, useCallback } from 'react';

type ValidationErrors = Record<string, string>;
type ValidationRules = Record<string, (value: any) => string | null>;

export function useFormValidation<T extends Record<string, any>>(
  initialState: T,
  validationRules: ValidationRules
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear a specific error
  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Validate a single field
  const validateField = useCallback(
    (field: string, value: any): string | null => {
      if (validationRules[field]) {
        return validationRules[field](value);
      }
      return null;
    },
    [validationRules]
  );

  // Handle input change with validation
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setFormData(prev => ({ ...prev, [name]: value }));
      
      const errorMessage = validateField(name, value);
      if (errorMessage) {
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
      } else {
        clearError(name);
      }
    },
    [validateField, clearError]
  );

  // Set a field value programmatically
  const setFieldValue = useCallback(
    (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      const errorMessage = validateField(field, value);
      if (errorMessage) {
        setErrors(prev => ({ ...prev, [field]: errorMessage }));
      } else {
        clearError(field);
      }
    },
    [validateField, clearError]
  );

  // Update the entire form state
  const setFormValues = useCallback(
    (values: Partial<T>) => {
      setFormData(prev => ({ ...prev, ...values }));
      
      // Validate all updated fields
      const newErrors: ValidationErrors = { ...errors };
      
      Object.entries(values).forEach(([field, value]) => {
        const errorMessage = validateField(field, value);
        if (errorMessage) {
          newErrors[field] = errorMessage;
        } else {
          delete newErrors[field];
        }
      });
      
      setErrors(newErrors);
    },
    [errors, validateField]
  );

  // Validate all form fields
  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(field => {
      const value = formData[field];
      const errorMessage = validateField(field, value);
      
      if (errorMessage) {
        newErrors[field] = errorMessage;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [formData, validateField, validationRules]);

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    setFieldValue,
    setFormValues,
    validateField,
    validateAll,
    clearError,
    clearAllErrors
  };
}
