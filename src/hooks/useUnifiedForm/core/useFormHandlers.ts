
import { useCallback } from 'react';

/**
 * Hook for managing form field handlers
 */
export function useFormHandlers<T extends Record<string, any>>({
  setValues,
  clearError,
  setTouched
}: {
  setValues: (values: Partial<T>) => void;
  clearError: (field: keyof T) => void;
  setTouched: (touched: Partial<Record<keyof T, boolean>>) => void;
}) {
  // Handle input change event
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const isCheckbox = type === 'checkbox';
      const fieldValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
      
      setValues({ [name]: fieldValue } as Partial<T>);
      setTouched({ [name]: true } as Partial<Record<keyof T, boolean>>);
      clearError(name as keyof T);
    },
    [setValues, clearError, setTouched]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched({ [field]: true } as Partial<Record<keyof T, boolean>>);
    },
    [setTouched]
  );

  // Set value for a specific field
  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      setValues({ [field]: value } as Partial<T>);
      setTouched({ [field]: true } as Partial<Record<keyof T, boolean>>);
      clearError(field);
    },
    [setValues, clearError, setTouched]
  );

  // Set values for multiple fields
  const setFieldValues = useCallback(
    (fieldValues: Partial<T>) => {
      setValues(fieldValues);
      
      const touchedFields = Object.keys(fieldValues).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>
      );
      
      setTouched(touchedFields as Partial<Record<keyof T, boolean>>);
      
      Object.keys(fieldValues).forEach(key => {
        clearError(key as keyof T);
      });
    },
    [setValues, clearError, setTouched]
  );

  return {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  };
}
