
import { useState } from 'react';

interface UseStandardFormOptions<T> {
  initialValues: T;
  validationRules?: { [K in keyof T]?: (value: T[K], formData?: T) => string | undefined };
  onSubmit: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface UseStandardFormResult<T> {
  formData: T;
  errors: { [K in keyof T]?: string };
  isSubmitting: boolean;
  isSuccess: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  validateField: (field: keyof T) => string | undefined;
  validateForm: () => boolean;
  resetForm: () => void;
}

/**
 * Custom hook for form state management with validation and submission handling
 * 
 * @param options Configuration options for the form
 * @returns An object with form state and handlers
 */
export function useStandardForm<T extends Record<string, any>>(
  options: UseStandardFormOptions<T>
): UseStandardFormResult<T> {
  const { initialValues, validationRules = {}, onSubmit, onSuccess, onError } = options;
  
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const validateField = (field: keyof T): string | undefined => {
    const validateFn = validationRules[field];
    if (!validateFn) return undefined;
    
    const errorMessage = validateFn(formData[field], formData);
    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));
    
    return errorMessage;
  };
  
  const validateForm = (): boolean => {
    const newErrors: { [K in keyof T]?: string } = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(key => {
      const field = key as keyof T;
      const validateFn = validationRules[field];
      if (validateFn) {
        const errorMessage = validateFn(formData[field], formData);
        if (errorMessage) {
          newErrors[field] = errorMessage;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFieldValue(
      name as keyof T,
      type === 'checkbox' ? checked : value
    );
  };
  
  const setFieldValue = (field: keyof T, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing again
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      await onSubmit(formData);
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitting(false);
    setIsSuccess(false);
  };
  
  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    setFieldValue,
    handleSubmit,
    validateField,
    validateForm,
    resetForm,
  };
}

export default useStandardForm;
