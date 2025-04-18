
import { useCallback } from 'react';
import { FileValidationResult, DocumentValidationErrors } from './types';
import { validateDocumentFields, validateDocumentFile } from './documentValidationUtils';

export function useDocumentValidationState() {
  const validateFields = useCallback(
    (documentType: string, issueDate: string, selectedFile: File | null): DocumentValidationErrors => {
      return validateDocumentFields(documentType, issueDate, selectedFile);
    },
    []
  );

  const validateFile = useCallback((file: File): FileValidationResult => {
    return validateDocumentFile(file);
  }, []);

  return {
    validateFields,
    validateFile
  };
}
