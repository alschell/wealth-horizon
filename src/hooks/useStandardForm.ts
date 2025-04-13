
import { useState, useCallback } from 'react';

interface FormValidationRules<T> {
  [K in keyof T]?: (value: T[K]) => string | null;
}

interface UseStandardFormProps<T extends Record<string, any>> {
  initialValues: T;
  validationRules: FormValidationRules<T>;
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useStandardForm<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
  onSuccess,
  onError
}: UseStandardFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field if there's a validation rule
    if (validationRules[name as keyof T]) {
      const validationFunc = validationRules[name as keyof T];
      const error = validationFunc ? validationFunc(value as any) : null;
      
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validationRules]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitting(false);
    setIsSuccess(false);
  }, [initialValues]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;

    // Check each field with a validation rule
    Object.entries(validationRules).forEach(([field, validateFunc]) => {
      if (validateFunc) {
        const error = validateFunc(formData[field as keyof T]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validationRules]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      await onSubmit(formData);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit, onSuccess, onError]);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    isSubmitting,
    isSuccess,
    setFormData
  };
}
