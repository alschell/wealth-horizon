
import { FileValidationResult, DocumentValidationErrors, AllowedFileType } from './types';
import { FILE_VALIDATION } from './validationConstants';

export const enhancedDocumentValidation = {
  /**
   * Validates a document file against size and type constraints
   */
  validateFile: (file: File): FileValidationResult => {
    if (!file) {
      return {
        isValid: false,
        error: FILE_VALIDATION.MESSAGES.REQUIRED_FIELD
      };
    }

    if (file.size > FILE_VALIDATION.MAX_SIZE) {
      return {
        isValid: false,
        error: FILE_VALIDATION.MESSAGES.FILE_SIZE
      };
    }

    if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as AllowedFileType)) {
      return {
        isValid: false,
        error: FILE_VALIDATION.MESSAGES.FILE_TYPE
      };
    }

    return {
      isValid: true,
      error: null
    };
  },

  /**
   * Validates required document fields
   */
  validateFields: (
    documentType: string,
    issueDate: string,
    selectedFile: File | null
  ): DocumentValidationErrors => {
    const errors: DocumentValidationErrors = {};
    
    if (!documentType) errors.documentType = true;
    if (!issueDate) errors.issueDate = true;
    if (!selectedFile) errors.selectedFile = true;
    
    return errors;
  },

  /**
   * Checks if there are any validation errors
   */
  hasErrors: (errors: DocumentValidationErrors): boolean => {
    return Object.values(errors).some(error => error === true);
  }
};
