
import { FILE_VALIDATION, DOCUMENT_VALIDATION } from './validationConstants';

export type AllowedFileType = typeof FILE_VALIDATION.ALLOWED_TYPES[number];
export type RequiredField = typeof DOCUMENT_VALIDATION.REQUIRED_FIELDS[number];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface DocumentValidationErrors {
  documentType?: boolean;
  issueDate?: boolean;
  selectedFile?: boolean;
}

export interface FileValidationResult {
  isValid: boolean;
  error: string | null;
}
