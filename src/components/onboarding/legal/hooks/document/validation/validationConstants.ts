
import { FormFieldName } from '../types/formTypes';
import { AllowedFileType } from './types';

export const FILE_VALIDATION = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png'] as AllowedFileType[],
  MESSAGES: {
    REQUIRED_FIELD: 'Please select a file',
    FILE_SIZE: 'File size must not exceed 5MB',
    FILE_TYPE: 'File type must be PDF or image (JPEG/PNG)'
  }
} as const;

export const DOCUMENT_VALIDATION = {
  REQUIRED_FIELDS: ['documentType', 'issueDate', 'selectedFile'] as FormFieldName[],
  MESSAGES: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_DATE: 'Please enter a valid date',
    FUTURE_DATE: 'Date cannot be in the future'
  }
} as const;
