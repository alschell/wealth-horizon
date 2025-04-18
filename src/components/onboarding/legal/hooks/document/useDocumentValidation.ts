
import { useCallback } from 'react';
import { DocumentValidationErrors, FileValidationResult } from './validation/types';
import {
  validateDocumentFields as validateFields,
  validateDocumentFile as validateFile,
  hasValidationErrors
} from './validation/documentValidationUtils';

export function useDocumentValidation() {
  const validateDocumentFields = useCallback(
    (documentType: string, issueDate: string, selectedFile: File | null): DocumentValidationErrors => {
      return validateFields(documentType, issueDate, selectedFile);
    },
    []
  );

  const validateDocumentFile = useCallback((file: File): FileValidationResult => {
    return validateFile(file);
  }, []);

  const hasErrors = useCallback((errors: DocumentValidationErrors): boolean => {
    return hasValidationErrors(errors);
  }, []);

  return {
    validateDocumentFields,
    validateDocumentFile,
    hasErrors
  };
}
