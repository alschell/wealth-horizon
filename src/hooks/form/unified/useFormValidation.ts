
import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { validateRequiredFields } from '@/utils/validation/formValidation';
import { UnifiedFormState } from './types';

/**
 * Hook for form validation
 * @param formState - Current form state 
 * @param setFormState - Form state setter function
 * @param requiredFields - Array of required field names
 * @returns Form validation utilities
 */
export function useFormValidation<T extends FieldValues>(
  formState: UnifiedFormState<T>,
  setFormState: React.Dispatch<React.SetStateAction<UnifiedFormState<T>>>,
  requiredFields: (keyof T)[] = []
) {
  // Validate the form
  const validateForm = useCallback(() => {
    // Validate required fields
    const requiredErrors = validateRequiredFields(formState.values, requiredFields);
    
    // Update form errors
    setFormState(prev => ({
      ...prev,
      errors: requiredErrors
    }));
    
    // Return whether form is valid
    return Object.keys(requiredErrors).length === 0;
  }, [formState.values, requiredFields, setFormState]);

  return {
    validateForm
  };
}
