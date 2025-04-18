
import { FileValidationResult } from './types';
import { FILE_VALIDATION } from './constants';

/**
 * Validates a file for document upload
 */
export const validateFile = (file: File): FileValidationResult => {
  // Check if file exists
  if (!file) {
    return {
      isValid: false,
      error: 'No file provided'
    };
  }

  // Check file size
  if (file.size > FILE_VALIDATION.MAX_SIZE) {
    return {
      isValid: false,
      error: FILE_VALIDATION.MESSAGES.FILE_SIZE
    };
  }

  // Check file type
  if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as any)) {
    return {
      isValid: false,
      error: FILE_VALIDATION.MESSAGES.FILE_TYPE
    };
  }

  // File is valid
  return {
    isValid: true,
    error: null
  };
};
