
import { DocumentValidationErrors } from './types';
import { ERROR_MESSAGES } from './constants';

export const validateRequiredFields = (
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
