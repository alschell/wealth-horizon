
import { useState, useCallback } from 'react';
import { DocumentValidationErrors } from './validation/types';

export function useDocumentErrorState() {
  const [errors, setErrors] = useState<DocumentValidationErrors>({});
  const [fileError, setFileError] = useState<string | null>(null);

  const clearErrors = useCallback(() => {
    setErrors({});
    setFileError(null);
  }, []);

  const setFieldError = useCallback((field: keyof DocumentValidationErrors, hasError: boolean) => {
    setErrors(prev => ({ ...prev, [field]: hasError }));
  }, []);

  return {
    errors,
    setErrors,
    fileError,
    setFileError,
    clearErrors,
    setFieldError
  };
}
