
import { useState, useCallback } from 'react';

interface UseStandardFormProps<T> {
  initialValues: T;
  validationRules?: Record<keyof T, (value: any) => string | null>;
  onSubmit: (data: T) => void | Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useStandardForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {} as Record<keyof T, (value: any) => string | null>,
  onSubmit,
  onSuccess,
  onError
}: UseStandardFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle field change
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }, [errors]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setIsSuccess(false);
  }, [initialValues]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;

    // Apply validation rules to each field
    Object.keys(validationRules).forEach(key => {
      const fieldName = key as keyof T;
      const validateField = validationRules[fieldName];
      if (validateField) {
        const error = validateField(formData[fieldName]);
        newErrors[key] = error;
        if (error) isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validationRules]);

  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (isSubmitting) return;
    
    const isValid = validateForm();
    if (!isValid) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, validateForm, onSubmit, onSuccess, onError]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    validateForm
  };
}

export default useStandardForm;
