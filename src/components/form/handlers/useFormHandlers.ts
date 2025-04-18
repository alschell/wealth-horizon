
import { useCallback } from 'react';

export function useFormHandlers<T extends Record<string, any>>(
  setValues: (values: T) => void,
  clearError: (field: keyof T) => void
) {
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setValues(prev => ({ ...prev, [name]: fieldValue }));
    clearError(name as keyof T);
  }, [setValues, clearError]);

  const handleSelectChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    clearError(field);
  }, [setValues, clearError]);

  return {
    handleInputChange,
    handleSelectChange
  };
}
