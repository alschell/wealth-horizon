
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { validateWithZod } from '@/utils/form/validationCore';

/**
 * Props for the useZodForm hook
 */
interface UseZodFormProps<T> {
  schema: z.ZodSchema<T>;
  defaultValues: T;
  onSubmit?: (data: T) => void | Promise<void>;
}

/**
 * Return type for the useZodForm hook
 */
interface UseZodFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  validateField: <K extends keyof T>(field: K) => string | null;
  validateForm: () => boolean;
  resetForm: () => void;
  isSubmitting: boolean;
}

/**
 * A form validation hook using Zod schemas
 */
export function useZodForm<T extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit
}: UseZodFormProps<T>): UseZodFormReturn<T> {
  const [values, setValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * Set a single field value
   */
  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
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
    
    // Handle different input types
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name as keyof T, fieldValue as any);
  }, [setValue]);
  
  /**
   * Validate a single field
   */
  const validateField = useCallback(<K extends keyof T>(field: K): string | null => {
    try {
      // Create a partial schema for just this field
      const fieldSchema = z.object({ [field]: schema.shape[field as string] } as any);
      
      // Validate just this field
      fieldSchema.parse({ [field]: values[field] });
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === field);
        return fieldError?.message || null;
      }
      return null;
    }
  }, [schema, values]);
  
  /**
   * Validate the entire form
   */
  const validateForm = useCallback((): boolean => {
    const result = validateWithZod(values, schema);
    
    if (result.errors) {
      setErrors(result.errors);
      return false;
    }
    
    setErrors({});
    return true;
  }, [values, schema]);
  
  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return false;
    }
    
    if (!onSubmit) {
      return true;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);
  
  /**
   * Reset the form to default values
   */
  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
  }, [defaultValues]);
  
  return {
    values,
    errors,
    setValues,
    setValue,
    handleChange,
    handleSubmit,
    validateField,
    validateForm,
    resetForm,
    isSubmitting
  };
}
