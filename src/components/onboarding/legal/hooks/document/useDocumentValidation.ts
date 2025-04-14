
import DocumentValidationUtil from './useDocumentValidationUtil';

/**
 * Hook providing validation functions for document management
 */
export function useDocumentValidation() {
  return {
    validateFile: DocumentValidationUtil.validateFile,
    validateDocumentFields: DocumentValidationUtil.validateDocumentFields
  };
}
