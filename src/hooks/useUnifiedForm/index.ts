
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import { 
  UseUnifiedFormProps, 
  UseUnifiedFormReturn,
  FormState
} from './types';
import { validateRequiredFields, createErrorClearer } from './utils';

/**
 * Unified form hook for handling form state, validation, and submission
 * @param props - Form configuration
 * @returns Form state, actions, and helpers
 */
export function useUnifiedForm<T extends Record<string, any>>(props: UseUnifiedFormProps<T>): UseUnifiedFormReturn<T> {
  const {
    initialValues,
    validate,
    onSubmit,
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully',
    errorMessage = 'An error occurred. Please try again.',
    requiredFields = []
  } = props;

  const isMounted = useIsComponentMounted();
  
  // Form state
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  });

  // Create a function to clear field errors
  const clearError = useCallback((field: keyof T) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field as string];
      return {
        ...prev,
        errors: newErrors
      };
    });
  }, []);

  // Handle input changes
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: fieldValue },
      touched: { ...prev.touched, [name]: true },
      isDirty: true
    }));
    
    clearError(name as keyof T);
  }, [clearError]);

  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));
  }, []);

  // Set a single field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
      isDirty: true
    }));
    
    clearError(field);
  }, [clearError]);

  // Set multiple field values at once
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setFormState(prev => {
      const touchedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      return {
        ...prev,
        values: { ...prev.values, ...fields },
        touched: { ...prev.touched, ...touchedFields },
        isDirty: true
      };
    });
    
    // Clear errors for all updated fields
    Object.keys(fields).forEach(field => {
      clearError(field as keyof T);
    });
  }, [clearError]);

  // Set a field error
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field as string]: message }
    }));
  }, []);

  // Clear a field error
  const clearFieldError = useCallback((field: keyof T) => {
    clearError(field);
  }, [clearError]);

  // Validate the form
  const validateForm = useCallback(() => {
    // Validate required fields
    const requiredErrors = validateRequiredFields(formState.values, requiredFields);
    
    // Run custom validation if provided
    const customErrors = validate ? validate(formState.values) : {};
    
    // Combine errors
    const combinedErrors = { ...requiredErrors, ...customErrors };
    
    // Update form errors
    setFormState(prev => ({
      ...prev,
      errors: combinedErrors
    }));
    
    // Return whether form is valid
    return Object.keys(combinedErrors).length === 0;
  }, [formState.values, requiredFields, validate]);

  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    // Prevent default form submission
    if (e) {
      e.preventDefault();
    }
    
    // Mark all fields as touched
    setFormState(prev => ({
      ...prev,
      touched: Object.keys(prev.values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>)
    }));
    
    // Validate form before submission
    const isValid = validateForm();
    if (!isValid) {
      showError('Validation Error', errorMessage);
      return false;
    }
    
    // No submit handler provided
    if (!onSubmit) {
      return true;
    }
    
    // Set submitting state
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      isSuccess: false
    }));
    
    try {
      // Call submit handler
      await onSubmit(formState.values);
      
      // Update state if component is still mounted
      if (isMounted()) {
        setFormState(prev => ({
          ...prev,
          isSuccess: true,
          isSubmitting: false
        }));
        
        // Show success message
        showSuccess('Success', successMessage);
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      }
      
      return true;
    } catch (error) {
      // Only update state if component is still mounted
      if (isMounted()) {
        console.error('Form submission error:', error);
        
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          isSuccess: false
        }));
        
        // Show error message
        showError('Error', error instanceof Error ? error.message : errorMessage);
        
        // Call error callback if provided
        if (onError) {
          onError(error);
        }
      }
      
      return false;
    }
  }, [formState.values, validateForm, onSubmit, isMounted, onSuccess, onError, successMessage, errorMessage]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    });
  }, [initialValues]);

  // Helper to check if field has error
  const hasError = useCallback((field: keyof T) => {
    return Boolean(formState.errors[field as string]);
  }, [formState.errors]);

  // Helper to get error message for field
  const getErrorMessage = useCallback((field: keyof T) => {
    return formState.errors[field as string] || '';
  }, [formState.errors]);

  return {
    formState,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    validateForm,
    handleSubmit,
    resetForm,
    hasError,
    getErrorMessage
  };
}

export * from './types';
export * from './utils';
