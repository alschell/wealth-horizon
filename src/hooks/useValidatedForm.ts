
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { parseError } from '@/utils/errorHandling';
import { validateWithZod } from '@/utils/form/validationCore';

interface UseValidatedFormOptions<T> {
  schema: z.ZodSchema<T>;
  defaultValues: T;
  onSubmit?: (data: T) => void | Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
}

/**
 * A comprehensive form hook combining Zod validation, form state management,
 * error handling, and submission handling.
 */
export function useValidatedForm<T extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Error submitting form',
  resetOnSuccess = false
}: UseValidatedFormOptions<T>) {
  const { toast } = useToast();
  const [values, setValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  /**
   * Set a single field value
   */
  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Clear error for this field
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);
  
  /**
   * Handle input change event
   */
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name as keyof T, fieldValue as any);
  }, [setValue]);
  
  /**
   * Handle blur event - mark field as touched
   */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    validateField(name as keyof T);
  }, []);
  
  /**
   * Validate a single field
   */
  const validateField = useCallback(<K extends keyof T>(field: K): string | null => {
    try {
      // Create partial schema for just this field
      const partialData = { [field]: values[field] };
      const result = schema.safeParse(partialData);
      
      if (!result.success) {
        const fieldError = result.error.errors.find(err => err.path[0] === field);
        if (fieldError) {
          setErrors(prev => ({ 
            ...prev, 
            [field as string]: fieldError.message 
          }));
          return fieldError.message;
        }
      } else if (errors[field as string]) {
        // Clear error if validation passes
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
      
      return null;
    } catch (error) {
      console.error(`Error validating field ${String(field)}:`, error);
      return "Validation error";
    }
  }, [schema, values, errors]);
  
  /**
   * Validate entire form
   */
  const validateForm = useCallback((): boolean => {
    const result = validateWithZod(values, schema);
    
    if (result.errors) {
      setErrors(result.errors);
      
      // Mark fields with errors as touched
      const touchedFields = Object.keys(result.errors).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(prev => ({ ...prev, ...touchedFields }));
      
      return false;
    }
    
    setErrors({});
    return true;
  }, [values, schema]);
  
  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e?: React.FormEvent): Promise<boolean> => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) {
      return false;
    }
    
    if (!onSubmit) {
      return true;
    }
    
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      await onSubmit(values);
      
      setIsSuccess(true);
      toast({
        title: "Success",
        description: successMessage,
        variant: "default"
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (resetOnSuccess) {
        resetForm();
      }
      
      return true;
    } catch (error) {
      const parsedError = parseError(error);
      console.error('Form submission error:', parsedError);
      
      toast({
        title: "Error",
        description: parsedError.message || errorMessage,
        variant: "destructive"
      });
      
      if (onError) {
        onError(error);
      }
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [
    validateForm, 
    values, 
    onSubmit, 
    successMessage, 
    errorMessage, 
    resetOnSuccess, 
    onSuccess, 
    onError, 
    toast
  ]);
  
  /**
   * Reset the form to default values
   */
  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setTouched({});
    setIsSuccess(false);
  }, [defaultValues]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    setValue,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    handleSubmit,
    resetForm,
    
    // Utility for checking if a field has error and was touched
    hasFieldError: useCallback((field: keyof T) => 
      touched[field as string] && Boolean(errors[field as string])
    , [touched, errors]),
    
    // Get field error message if touched
    getFieldError: useCallback((field: keyof T) => 
      touched[field as string] ? errors[field as string] : undefined
    , [touched, errors])
  };
}
