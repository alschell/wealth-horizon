
import { useCallback } from 'react';
import { showSuccess, showError } from '@/utils/toast';
import { FormState } from './types';
import { FORM_CONFIG } from './config';

/**
 * Hook for form submission functionality
 * 
 * @param formState - Current form state
 * @param setFormState - Function to update form state
 * @param validateForm - Function to validate the form
 * @param onSubmit - Form submission handler
 * @param isMounted - Function to check if component is still mounted
 * @param onSuccess - Success callback
 * @param onError - Error callback
 * @param successMessage - Success message to display
 * @param errorMessage - Error message to display
 * @returns Form submission handlers
 */
export function useFormSubmission<T extends Record<string, any>>(
  formState: FormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  validateForm: () => boolean,
  onSubmit: ((values: T) => Promise<void> | void) | undefined,
  isMounted: () => boolean,
  onSuccess: (() => void) | undefined,
  onError: ((error: unknown) => void) | undefined,
  successMessage: string = FORM_CONFIG.defaultSuccessMessage,
  errorMessage: string = FORM_CONFIG.defaultErrorMessage
) {
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
  }, [formState.values, validateForm, onSubmit, isMounted, onSuccess, onError, successMessage, errorMessage, setFormState]);

  // Reset form to initial state
  const resetForm = useCallback((initialValues: T) => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isDirty: false,
      isSubmitting: false,
      isSuccess: false
    });
  }, [setFormState]);

  return {
    handleSubmit,
    resetForm
  };
}
