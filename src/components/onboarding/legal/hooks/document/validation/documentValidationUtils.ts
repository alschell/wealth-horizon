
import { FileValidationResult, DocumentValidationErrors, AllowedFileType } from './types';
import { FILE_VALIDATION } from './constants';

export const validateDocumentFile = (file: File): FileValidationResult => {
  if (!file) {
    return {
      isValid: false,
      error: 'No file provided'
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
};

export const validateDocumentFields = (
  documentType: string,
  issueDate: string,
  selectedFile: File | null
): DocumentValidationErrors => {
  const errors: DocumentValidationErrors = {};

  if (!documentType) {
    errors.documentType = true;
  }

  if (!issueDate) {
    errors.issueDate = true;
  }

  if (!selectedFile) {
    errors.selectedFile = true;
  }

  return errors;
};

export const hasValidationErrors = (errors: DocumentValidationErrors): boolean => {
  return Object.values(errors).some(Boolean);
};
