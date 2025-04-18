
import { DocumentValidationErrors, FileValidationResult } from './types';
import { validateFile as validateFileUtil } from './fileValidation';
import { validateRequiredFields as validateFields } from './fieldValidation';

export const validateDocumentFields = (
  documentType: string,
  issueDate: string,
  selectedFile: File | null
): DocumentValidationErrors => {
  return validateFields(documentType, issueDate, selectedFile);
};

export const validateDocumentFile = (file: File): FileValidationResult => {
  return validateFileUtil(file);
};

export const hasValidationErrors = (errors: DocumentValidationErrors): boolean => {
  return Object.values(errors).some(Boolean);
};
