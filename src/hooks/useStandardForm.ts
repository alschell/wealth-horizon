
import { useState, useCallback } from 'react';

// Define validation rules type differently to avoid mapped type syntax issue
interface FormValidationRules<T> {
  [key: string]: ((value: any) => string | null) | undefined;
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

  // Handle input change without validation (except for password fields)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Only validate password fields while typing
    if (type === 'password' && validationRules[name]) {
      const validationFunc = validationRules[name];
      const error = validationFunc ? validationFunc(value) : null;
      
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
      if (validateFunc && field in formData) {
        const error = validateFunc(formData[field]);
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
