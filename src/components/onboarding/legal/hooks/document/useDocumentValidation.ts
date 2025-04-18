
import { useCallback } from 'react';
import { validateFile } from './validation/fileValidation';
import { validateRequiredFields, hasValidationErrors } from './validation/fieldValidation';
import { DocumentValidationErrors, FileValidationResult } from './validation/types';

export function useDocumentValidation() {
  const validateDocumentFields = useCallback(
    (documentType: string, issueDate: string, selectedFile: File | null): DocumentValidationErrors => {
      return validateRequiredFields(documentType, issueDate, selectedFile);
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
