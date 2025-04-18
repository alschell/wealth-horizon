
import { FileValidationResult } from './types';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, ERROR_MESSAGES } from './constants';

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
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FILE_SIZE
    };
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FILE_TYPE
    };
  }

  // File is valid
  return {
    isValid: true,
    error: null
  };
};
