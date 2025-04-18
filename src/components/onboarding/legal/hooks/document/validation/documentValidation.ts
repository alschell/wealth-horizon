
import { DocumentValidationErrors, FileValidationResult } from './types';
import { FILE_VALIDATION, DOCUMENT_VALIDATION } from './validationConstants';

export const validateDocumentValidation = {
  file: (file: File): FileValidationResult => {
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

    if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as any)) {
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

  fields: (
    documentType: string,
    issueDate: string,
    selectedFile: File | null
  ): DocumentValidationErrors => {
    const errors: DocumentValidationErrors = {};
    
    DOCUMENT_VALIDATION.REQUIRED_FIELDS.forEach(field => {
      if (field === 'documentType' && !documentType) {
        errors.documentType = true;
      }
      if (field === 'issueDate' && !issueDate) {
        errors.issueDate = true;
      }
      if (field === 'selectedFile' && !selectedFile) {
        errors.selectedFile = true;
      }
    });
    
    return errors;
  },

  hasErrors: (errors: DocumentValidationErrors): boolean => {
    return Object.values(errors).some(error => error === true);
  }
};
