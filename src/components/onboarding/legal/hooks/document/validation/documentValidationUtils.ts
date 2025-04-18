
import { FileValidationResult, DocumentValidationErrors, AllowedFileType } from './types';
import { FILE_VALIDATION } from './validationConstants';
import { validateFile } from './fileValidation';
import { validateRequiredFields, hasValidationErrors } from './fieldValidation';

export const validateDocumentFile = validateFile;

export const validateDocumentFields = (
  documentType: string,
  issueDate: string,
  selectedFile: File | null
): DocumentValidationErrors => {
  return validateRequiredFields(documentType, issueDate, selectedFile);
};

export { hasValidationErrors } from './fieldValidation';
