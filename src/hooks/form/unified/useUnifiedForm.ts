
import { useState, useCallback, useMemo } from 'react';
import { useIsComponentMounted } from '../../useIsComponentMounted';
import { 
  UseUnifiedFormProps, 
  UseUnifiedFormReturn,
  FormState
} from './types';
import { createErrorChecker, createErrorMessageGetter, validateRequiredFields } from './utils';
import { FORM_CONFIG } from './config';
import { showSuccess, showError } from '@/utils/toast';
import { Validator } from '../validators';

/**
 * Unified form hook for handling form state, validation, and submission
 * @param props - Form configuration
 * @returns Form state, actions, and helpers
 */
export function useUnifiedForm<T extends Record<string, any>>(
  props: UseUnifiedFormProps<T>
): UseUnifiedFormReturn<T> {
  const {
    initialValues,
    validate,
    validators = {} as Partial<Record<keyof T, Validator>>,
    onSubmit,
    onSuccess,
    onError,
    successMessage = FORM_CONFIG.defaultSuccessMessage,
    errorMessage = FORM_CONFIG.defaultErrorMessage,
    requiredFields = [],
    resetAfterSubmit = false
  } = props;

  const isMounted = useIsComponentMounted();
  
  // Create enhanced validators with required fields validation
  const enhancedValidators = { ...validators } as Record<keyof T, Validator>;
  
  // Add required validation for required fields that don't have validators
  requiredFields.forEach(field => {
    if (!enhancedValidators[field]) {
      enhancedValidators[field] = (value: any): string | null => {
        if (value === undefined || value === null || value === '' || 
            (Array.isArray(value) && value.length === 0)) {
          return `${String(field)} is required`;
        }
        return null;
      };
    }
  });
  
  // Form state
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  });

  // Update values handler
  const setValues = useCallback((
    valuesUpdater: React.SetStateAction<T>
  ) => {
    setFormState(prev => {
      const newValues = typeof valuesUpdater === 'function'
        ? valuesUpdater(prev.values)
        : valuesUpdater;
        
      return {
        ...prev,
        values: newValues,
        isDirty: true
      };
    });
  }, []);

  // Update errors handler
  const setErrors = useCallback((
    errorsUpdater: React.SetStateAction<Record<string, string>>
  ) => {
    setFormState(prev => {
      const newErrors = typeof errorsUpdater === 'function'
        ? errorsUpdater(prev.errors)
        : errorsUpdater;
        
      return {
        ...prev,
        errors: newErrors
      };
    });
  }, []);

  // Update touched fields handler
  const setTouched = useCallback((
    touchedUpdater: React.SetStateAction<Record<string, boolean>>
  ) => {
    setFormState(prev => {
      const newTouched = typeof touchedUpdater === 'function'
        ? touchedUpdater(prev.touched)
        : touchedUpdater;
        
      return {
        ...prev,
        touched: newTouched
      };
    });
  }, []);

  // Clear a field error
  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, [setErrors]);

  // Change handler for form inputs
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    clearFieldError(name as keyof T);
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, [setValues, clearFieldError, setTouched]);

  // Blur handler for form inputs
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  }, [setTouched]);

  // Set a field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    clearFieldError(field);
    
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  }, [setValues, clearFieldError, setTouched]);

  // Set multiple field values
  const setFieldValues = useCallback((fields: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...fields
    }));
    
    // Clear errors for updated fields
    Object.keys(fields).forEach(field => {
      clearFieldError(field as keyof T);
    });
    
    // Mark updated fields as touched
    setTouched(prev => {
      const touchedFields = Object.keys(fields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      return {
        ...prev,
        ...touchedFields
      };
    });
  }, [setValues, clearFieldError, setTouched]);

  // Set a field error
  const setFieldError = useCallback((field: keyof T, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  }, [setErrors]);

  // Validate the form
  const validateForm = useCallback(() => {
    let isValid = true;
    const validationErrors: Record<string, string> = {};
    
    // Apply custom validators
    Object.entries(enhancedValidators).forEach(([field, validator]) => {
      if (validator && typeof validator === 'function') {
        const value = formState.values[field as keyof T];
        const message = validator(value);
        if (message) {
          validationErrors[field] = message;
          isValid = false;
        }
      }
    });
    
    // Apply custom validate function if provided
    if (validate) {
      const customErrors = validate(formState.values);
      Object.entries(customErrors).forEach(([field, message]) => {
        validationErrors[field] = message;
        isValid = false;
      });
    }
    
    // Update form errors
    setErrors(validationErrors);
    
    return isValid;
  }, [formState.values, enhancedValidators, validate, setErrors]);

  // Reset form to initial state
  const resetFormState = useCallback(() => {
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
    
    // Validate form before submission
    const isValid = validateForm();
    if (!isValid) {
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
        
        // Reset form if requested
        if (resetAfterSubmit) {
          resetFormState();
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
  }, [
    formState.values,
    validateForm,
    onSubmit,
    isMounted,
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    resetAfterSubmit,
    resetFormState
  ]);

  // Create error helpers with memoization
  const hasError = useMemo(
    () => createErrorChecker(formState.errors),
    [formState.errors]
  );

  const getErrorMessage = useMemo(
    () => createErrorMessageGetter(formState.errors),
    [formState.errors]
  );

  return {
    formState,
    // Direct access to form state properties
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isDirty: formState.isDirty,
    isSubmitting: formState.isSubmitting,
    isSuccess: formState.isSuccess,
    // Form actions
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    validateForm,
    handleSubmit,
    resetForm: resetFormState,
    // Error helpers
    hasError,
    getErrorMessage,
    // For test compatibility
    validateFields: validateForm
  };
}
