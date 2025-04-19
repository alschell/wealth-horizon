
import { useCallback } from 'react';
import { createInputChangeHandler, createBlurHandler } from '@/utils/handlers/formEventHandlers';

/**
 * Hook for managing form field interactions
 */
export function useFormFields<T extends Record<string, any>>(
  setValues: React.Dispatch<React.SetStateAction<T>>,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  clearError?: (field: keyof T) => void
) {
  const handleChange = useCallback(
    createInputChangeHandler(setValues, clearError),
    [setValues, clearError]
  );

  const handleBlur = useCallback(
    createBlurHandler<T>(setTouched),
    [setTouched]
  );

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (clearError) {
      clearError(field);
    }
  }, [setValues, clearError]);

  return {
    handleChange,
    handleBlur,
    setFieldValue
  };
}
