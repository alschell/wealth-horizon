
import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import { 
  UseUnifiedFormProps, 
  UseUnifiedFormReturn,
  FormState,
  FormSubmissionOptions
} from './types';
import { validateRequiredFields, createErrorClearer } from './utils';

/**
 * Unified form hook for handling form state, validation, and submission
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

  const clearError = createErrorClearer((errors) => {
    setFormState(prev => ({ ...prev, errors }));
  });

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
  }, []);

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
  }, []);

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
  }, []);

  // Set a field error
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: message }
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
    
    // Mark fields with errors as touched
    const touchedFields = Object.keys(combinedErrors).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setFormState(prev => ({
      ...prev,
      errors: combinedErrors,
      touched: { ...prev.touched, ...touchedFields }
    }));
    
    return Object.keys(combinedErrors).length === 0;
  }, [formState.values, requiredFields, validate]);

  // Reset the form
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

  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Mark all fields as touched
    const allTouched = Object.keys(formState.values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, ...allTouched }
    }));
    
    // Validate form
    if (!validateForm()) {
      showError('Validation Error', errorMessage);
      return false;
    }
    
    if (!onSubmit) {
      return true;
    }
    
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      await onSubmit(formState.values);
      
      // Only update state if component is still mounted
      if (isMounted()) {
        setFormState(prev => ({ ...prev, isSuccess: true, isSubmitting: false }));
        showSuccess('Success', successMessage);
        
        if (onSuccess) {
          onSuccess();
        }
      }
      
      return true;
    } catch (error) {
      // Only update state if component is still mounted
      if (isMounted()) {
        console.error('Form submission error:', error);
        setFormState(prev => ({ ...prev, isSubmitting: false }));
        
        const errorMsg = error instanceof Error ? error.message : errorMessage;
        showError('Error', errorMsg);
        
        if (onError) {
          onError(error);
        }
      }
      
      return false;
    }
  }, [formState.values, validateForm, onSubmit, isMounted, successMessage, errorMessage, onSuccess, onError]);

  // Helper for checking if a field has been touched and has an error
  const hasError = useCallback((field: keyof T) => {
    return formState.touched[field as string] && Boolean(formState.errors[field as string]);
  }, [formState.touched, formState.errors]);

  // Helper for getting error message
  const getErrorMessage = useCallback((field: keyof T) => {
    return hasError(field) ? formState.errors[field as string] || '' : '';
  }, [formState.errors, hasError]);

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
