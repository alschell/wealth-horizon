
import { useState, useCallback } from 'react';

/**
 * Hook for managing form state
 * 
 * @param initialValues Initial form values
 * @returns Form state and state update functions
 */
export function useFormState<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formState = {
    values,
    errors,
    touched,
    isDirty,
    isSubmitting,
    isSuccess
  };

  const resetFormState = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
    setIsSubmitting(false);
    setIsSuccess(false);
  }, [initialValues]);

  return {
    formState,
    setValues,
    setErrors,
    setTouched,
    setIsDirty,
    setIsSubmitting,
    setIsSuccess,
    resetFormState
  };
}
