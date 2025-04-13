
import { useState, useCallback } from 'react';
import { useFormSubmission } from './useFormSubmission';
import { announceToScreenReader } from '@/utils/a11y';

type ValidationFunction<T> = (value: any) => string | null;
type ValidationRules<T> = Record<keyof T, ValidationFunction<T>>;

interface UseStandardFormProps<T extends Record<string, any>> {
  initialValues: T;
  validationRules: Partial<ValidationRules<T>>;
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useStandardForm<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted',
  errorMessage = 'An error occurred. Please try again.'
}: UseStandardFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: any): string | null => {
      const validationFn = validationRules[name];
      return validationFn ? validationFn(value) : null;
    },
    [validationRules]
  );

  // Handle change for text inputs, selects, and textareas
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      // Update form data
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Mark field as touched
      setTouched(prev => ({ ...prev, [name]: true }));
      
      // Validate the field
      const error = validateField(name as keyof T, value);
      
      // Update error state
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [validateField]
  );

  // Handle change for checkbox inputs
  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      
      // Update form data
      setFormData(prev => ({ ...prev, [name]: checked }));
      
      // Mark field as touched
      setTouched(prev => ({ ...prev, [name]: true }));
      
      // Validate the field
      const error = validateField(name as keyof T, checked);
      
      // Update error state
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [validateField]
  );

  // Set field value programmatically
  const setFieldValue = useCallback(
    (name: keyof T, value: any) => {
      // Update form data
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Validate the field
      const error = validateField(name, value);
      
      // Update error state
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name as string];
          return newErrors;
        });
      }
    },
    [validateField]
  );

  // Mark field as touched (e.g., on blur)
  const setFieldTouched = useCallback(
    (name: keyof T, isTouched: boolean = true) => {
      setTouched(prev => ({ ...prev, [name]: isTouched }));
      
      // Validate the field if it's being marked as touched
      if (isTouched) {
        const error = validateField(name, formData[name]);
        
        if (error) {
          setErrors(prev => ({ ...prev, [name]: error }));
        }
      }
    },
    [formData, validateField]
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    // Validate all fields in the form
    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof T;
      const validationFn = validationRules[fieldName];
      
      if (validationFn) {
        const error = validationFn(formData[fieldName]);
        
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    
    // If there are errors, announce them to screen readers
    if (!isValid) {
      announceToScreenReader(
        'There are validation errors in the form. Please correct them before submitting.',
        'assertive'
      );
    }
    
    return isValid;
  }, [formData, validationRules]);

  // Reset the form
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Use the form submission hook
  const {
    isSubmitting,
    submissionError,
    isSuccess,
    handleSubmit: submitForm,
    resetFormState,
  } = useFormSubmission<T>({
    onSubmit,
    onSuccess: () => {
      if (onSuccess) onSuccess();
      // Optionally reset the form on success
      // resetForm();
    },
    onError,
    successMessage,
    errorMessage,
    validateForm,
  });

  // Handle form submission
  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      submitForm(formData);
    },
    [formData, submitForm]
  );

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    submissionError,
    isSuccess,
    handleChange,
    handleCheckboxChange,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
    validateForm,
    validateField,
  };
}
