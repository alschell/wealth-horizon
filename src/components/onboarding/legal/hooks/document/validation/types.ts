
import { FILE_VALIDATION, DOCUMENT_VALIDATION } from './validationConstants';

// Change this to use string literal type instead of referencing itself
export type AllowedFileType = 'application/pdf' | 'image/jpeg' | 'image/png';
export type RequiredField = typeof DOCUMENT_VALIDATION.REQUIRED_FIELDS[number];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface DocumentValidationErrors {
  documentType?: boolean;
  issueDate?: boolean;
  selectedFile?: boolean;
  [key: string]: boolean | undefined; // String index signature for Record compatibility
}

export interface FileValidationResult {
  isValid: boolean;
  error: string | null;
}
