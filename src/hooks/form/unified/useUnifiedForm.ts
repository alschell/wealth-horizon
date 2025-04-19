import { useState, useCallback } from 'react';
import { useIsComponentMounted } from '../../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';
import { UseUnifiedFormOptions, UnifiedFormState } from './types';
import { validateRequiredFields, createErrorClearer } from './utils/validation';

/**
 * Enhanced form hook that combines react-hook-form with submission handling
 * @param options Configuration options for the form
 * @returns Form state and handlers
 */
export function useUnifiedForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Error submitting form',
  resetAfterSubmit = false,
  ...formOptions
}: UseUnifiedFormOptions<T>) {
  const isMounted = useIsComponentMounted();
  const [formState, setFormState] = useState<UnifiedFormState<T>>({
    values: defaultValues as T,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  });

  // Initialize react-hook-form with zod resolver if schema is provided
  const methods = useForm<T>({
    ...formOptions,
    defaultValues,
    ...(schema && { resolver: zodResolver(schema) })
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
    const requiredErrors = validateRequiredFields(formState.values, []);
    
    // Run custom validation if provided
    const customErrors = {};
    
    // Combine errors
    const combinedErrors = { ...requiredErrors, ...customErrors };
    
    // Update form errors
    setFormState(prev => ({
      ...prev,
      errors: combinedErrors
    }));
    
    // Return whether form is valid
    return Object.keys(combinedErrors).length === 0;
  }, [formState.values]);

  // Handle form submission
  const handleSubmit = useCallback(async (data: T) => {
    // No submit handler provided
    if (!onSubmit) {
      return;
    }
    
    // Set submitting state
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      isSuccess: false
    }));
    
    try {
      // Call submit handler
      await onSubmit(data);
      
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
    }
  }, [onSubmit, isMounted, onSuccess, onError, successMessage, errorMessage]);

  // Reset form to initial state
  const resetFormState = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      values: defaultValues as T,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    }));
  }, [defaultValues]);

  return {
    ...methods,
    formState,
    handleSubmit: methods.handleSubmit(handleSubmit),
    resetFormState,
    submit: handleSubmit
  };
}
