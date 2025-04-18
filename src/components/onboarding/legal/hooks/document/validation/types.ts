
import { FILE_VALIDATION, DOCUMENT_VALIDATION } from './validationConstants';

export type AllowedFileType = typeof FILE_VALIDATION.ALLOWED_TYPES[number];
export type RequiredField = typeof DOCUMENT_VALIDATION.REQUIRED_FIELDS[number];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Update DocumentValidationErrors to have string index signature for better compatibility
export interface DocumentValidationErrors {
  documentType?: boolean;
  issueDate?: boolean;
  selectedFile?: boolean;
  [key: string]: boolean | undefined; // Add index signature for compatibility with Record<string, boolean>
}

export interface FileValidationResult {
  isValid: boolean;
  error: string | null;
}
