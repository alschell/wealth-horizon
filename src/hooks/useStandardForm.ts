
import { useState, useCallback, useEffect } from 'react';
import { showSuccess, showError } from '@/utils/toast';
import { useIsComponentMounted } from './useIsComponentMounted';

type ValidationRule<T> = (value: T) => string | null;

interface ValidationRules<T> {
  [key: string]: ValidationRule<any> | undefined;
}

interface StandardFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (values: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

/**
 * Standard form hook for consistent form handling across the application
 * 
 * @param options Form options
 * @returns Form state and handlers
 */
export function useStandardForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Form submitted successfully',
  errorMessage = 'An error occurred. Please try again.',
  resetAfterSubmit = false
}: StandardFormOptions<T>) {
  const isMounted = useIsComponentMounted();
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Handle input change
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setIsDirty(true);
    
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Set field value directly
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    setIsDirty(true);
    
    // Clear error for the field being changed
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  // Track field blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate the field if it has a validation rule
    if (validationRules[name]) {
      const error = validationRules[name]?.(formData[name]);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  }, [formData, validationRules]);

  // Validate the entire form
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Check each field with a validation rule
    Object.entries(validationRules).forEach(([field, validate]) => {
      if (validate) {
        const error = validate(formData[field as keyof T]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    
    // Mark all fields as touched if there are errors
    if (!isValid) {
      const allTouched = Object.keys(validationRules).reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {}
      );
      setTouched(prev => ({ ...prev, ...allTouched }));
    }
    
    return isValid;
  }, [formData, validationRules]);

  // Reset the form
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setIsDirty(false);
  }, [initialValues]);

  // Submit the form
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Validate the form
    if (!validateForm()) {
      return;
    }
    
    if (!onSubmit) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      
      // Only update state if component is still mounted
      if (isMounted()) {
        setIsSuccess(true);
        
        if (successMessage) {
          showSuccess("Success", successMessage);
        }
        
        if (onSuccess) {
          onSuccess();
        }
        
        if (resetAfterSubmit) {
          resetForm();
        }
      }
    } catch (error) {
      // Only update state if component is still mounted
      if (isMounted()) {
        console.error("Form submission error:", error);
        
        if (errorMessage) {
          const msg = error instanceof Error ? error.message : errorMessage;
          showError("Error", msg);
        }
        
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
  }, [formData, validateForm, onSubmit, isMounted, successMessage, errorMessage, onSuccess, onError, resetAfterSubmit, resetForm]);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    isDirty,
    handleChange,
    handleBlur,
    setFieldValue,
    validateForm,
    resetForm,
    handleSubmit,
    setFormData
  };
}
