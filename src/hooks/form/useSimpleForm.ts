
import { useState, useCallback } from 'react';

/**
 * Simple form state interface
 */
interface SimpleFormState<T> {
  values: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

/**
 * Props for useSimpleForm hook
 */
interface UseSimpleFormProps<T> {
  /**
   * Initial form values
   */
  initialValues: T;
  
  /**
   * Form validation function
   */
  validate?: (values: T) => Record<string, string>;
  
  /**
   * Form submission handler
   */
  onSubmit?: (values: T) => Promise<void> | void;
  
  /**
   * Success callback
   */
  onSuccess?: () => void;
  
  /**
   * Error callback
   */
  onError?: (error: unknown) => void;
}

/**
 * A lightweight form handling hook for simple forms
 * 
 * @param props Hook props
 * @returns Form state and handlers
 */
export function useSimpleForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
  onSuccess,
  onError
}: UseSimpleFormProps<T>) {
  // Initialize form state
  const [formState, setFormState] = useState<SimpleFormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false
  });
  
  /**
   * Handle input change
   */
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: fieldValue },
      errors: { ...prev.errors, [name]: '' }
    }));
  }, []);
  
  /**
   * Set a field value
   */
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      errors: { ...prev.errors, [field]: '' }
    }));
  }, []);
  
  /**
   * Set multiple field values
   */
  const setFieldValues = useCallback((values: Partial<T>) => {
    setFormState(prev => {
      const clearedErrors = Object.keys(values).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as Record<string, string>);
      
      return {
        ...prev,
        values: { ...prev.values, ...values },
        errors: { ...prev.errors, ...clearedErrors }
      };
    });
  }, []);
  
  /**
   * Validate the form
   */
  const validateForm = useCallback(() => {
    if (!validate) return true;
    
    const errors = validate(formState.values);
    setFormState(prev => ({ ...prev, errors }));
    
    return Object.keys(errors).length === 0;
  }, [validate, formState.values]);
  
  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Validate form
    if (!validateForm()) {
      return false;
    }
    
    if (!onSubmit) {
      return true;
    }
    
    // Set submitting state
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Submit form
      await onSubmit(formState.values);
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
      
      // Update state
      setFormState(prev => ({ ...prev, isSubmitting: false }));
      
      return true;
    } catch (error) {
      // Call error callback
      if (onError) {
        onError(error);
      }
      
      // Update state
      setFormState(prev => ({ ...prev, isSubmitting: false }));
      
      // Log error
      console.error('Form submission error:', error);
      
      return false;
    }
  }, [validateForm, onSubmit, formState.values, onSuccess, onError]);
  
  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      isSubmitting: false
    });
  }, [initialValues]);
  
  return {
    values: formState.values,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    handleChange,
    setFieldValue,
    setFieldValues,
    handleSubmit,
    resetForm
  };
}
