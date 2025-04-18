
import { useCallback } from 'react';
import { DocumentValidationErrors, FileValidationResult } from './validation/types';
import { validateDocumentValidation } from './validation/documentValidation';

export function useDocumentValidation() {
  const validateFields = useCallback(
    (documentType: string, issueDate: string, selectedFile: File | null): DocumentValidationErrors => {
      return validateDocumentValidation.fields(documentType, issueDate, selectedFile);
    },
    []
  );

  const validateFile = useCallback((file: File): FileValidationResult => {
    return validateDocumentValidation.file(file);
  }, []);

  const hasErrors = useCallback((errors: DocumentValidationErrors): boolean => {
    return validateDocumentValidation.hasErrors(errors);
  }, []);

  return {
    validateFields,
    validateFile,
    hasErrors,
    // Add these for backward compatibility with tests
    validateDocumentFields: validateFields,
    validateDocumentFile: validateFile
  };
}
