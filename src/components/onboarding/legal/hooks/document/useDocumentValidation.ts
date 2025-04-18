
import { useCallback } from 'react';
import { DocumentValidationErrors, FileValidationResult } from './validation/types';
import { 
  validateDocumentFields, 
  validateDocumentFile, 
  hasValidationErrors 
} from './validation/documentValidationUtils';

export function useDocumentValidation() {
  const validateFields = useCallback(
    (documentType: string, issueDate: string, selectedFile: File | null): DocumentValidationErrors => {
      return validateDocumentFields(documentType, issueDate, selectedFile);
    },
    []
  );

  const validateFile = useCallback((file: File): FileValidationResult => {
    return validateDocumentFile(file);
  }, []);

  const hasErrors = useCallback((errors: DocumentValidationErrors): boolean => {
    return hasValidationErrors(errors);
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
