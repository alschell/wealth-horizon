
import { FILE_VALIDATION } from './constants';

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

export type AllowedFileType = typeof FILE_VALIDATION.ALLOWED_TYPES[number];
