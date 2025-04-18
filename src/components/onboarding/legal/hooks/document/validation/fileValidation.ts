
import { FileValidationResult, AllowedFileType } from './types';
import { FILE_VALIDATION } from './validationConstants';

export const validateFile = (file: File): FileValidationResult => {
  if (!file) {
    return {
      isValid: false,
      error: FILE_VALIDATION.MESSAGES.REQUIRED_FIELD
    };
  }

  // Size validation
  if (file.size > FILE_VALIDATION.MAX_SIZE) {
    return {
      isValid: false,
      error: FILE_VALIDATION.MESSAGES.FILE_SIZE
    };
  }

  // Type validation
  if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as AllowedFileType)) {
    return {
      isValid: false,
      error: FILE_VALIDATION.MESSAGES.FILE_TYPE
    };
  }

  return {
    isValid: true,
    error: null
  };
};
