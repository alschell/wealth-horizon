
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from './useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';

type ValidationFunction<T> = (value: any) => string | undefined;

interface FormValidationRules<T extends Record<string, any>> {
  [K in keyof T]?: ValidationFunction<T[K]>;
}

interface UseStandardFormProps<T extends Record<string, any>> {
  initialValues: T;
  validationRules?: FormValidationRules<T>;
  onSubmit: (values: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

export function useStandardForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
  onSuccess,
  onError,
  successMessage = "Form submitted successfully",
  errorMessage = "An error occurred while submitting the form",
  resetAfterSubmit = false
}: UseStandardFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMounted = useIsComponentMounted();

  // Validate a specific field
  const validateField = useCallback((name: keyof T, value: any) => {
    const validator = validationRules[name];
    if (!validator) return undefined;
    return validator(value);
  }, [validationRules]);

  // Validate all fields and return true if valid
  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    // Mark all fields as touched during form validation
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    
    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, formData[fieldName]);
      allTouched[fieldName] = true;
      
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    
    // Clear error when value changes
    if (errors[name as keyof T]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof T];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle field blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name as keyof T, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validateField]);

  // Handle manual field blur (when not using native events)
  const handleFieldBlur = useCallback((name: keyof T) => {
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, formData[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [formData, validateField]);

  // Set field value programmatically
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when value changes programmatically
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitted(true);
    
    // Validate all fields before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      
      // Only update state if component is still mounted
      if (isMounted()) {
        if (successMessage) {
          showSuccess("Success", successMessage);
        }
        
        if (resetAfterSubmit) {
          resetForm();
        }
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      // Only update state if component is still mounted
      if (isMounted()) {
        console.error("Form submission error:", error);
        const message = error instanceof Error ? error.message : errorMessage;
        showError("Error", message);
        
        if (onError) {
          onError(error);
        }
      }
    } finally {
      // Only update state if component is still mounted
      if (isMounted()) {
        setIsSubmitting(false);
      }
    }
  }, [formData, validateForm, onSubmit, isMounted, successMessage, resetAfterSubmit, onSuccess, errorMessage, onError, resetForm]);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleFieldBlur,
    setFieldValue,
    resetForm,
    handleSubmit,
    validateForm
  };
}
