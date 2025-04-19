
import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { useIsComponentMounted } from '../../useIsComponentMounted';
import { showSuccess, showError } from '@/utils/toast';
import { UnifiedFormState } from './types';

/**
 * Hook for handling form submission
 * @param formState - Current form state
 * @param setFormState - Form state setter function
 * @param onSubmit - Form submission handler
 * @param onSuccess - Success callback
 * @param onError - Error callback
 * @param successMessage - Success message
 * @param errorMessage - Error message
 * @returns Form submission handler
 */
export function useFormSubmission<T extends FieldValues>(
  formState: UnifiedFormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<UnifiedFormState<T>>>,
  onSubmit?: (data: T) => Promise<void> | void,
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
  successMessage: string = 'Form submitted successfully',
  errorMessage: string = 'Error submitting form'
) {
  const isMounted = useIsComponentMounted();

  // Handle form submission
  const handleSubmit = useCallback(async () => {
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
  }, [
    formState.values,
    isMounted,
    onSubmit,
    onSuccess,
    onError,
    setFormState,
    successMessage,
    errorMessage
  ]);

  return {
    handleSubmit
  };
}
