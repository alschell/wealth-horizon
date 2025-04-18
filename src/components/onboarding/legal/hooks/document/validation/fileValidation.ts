
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, ERROR_MESSAGES } from './constants';
import { FileValidationResult } from './types';

export const validateFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};

export const validateFileType = (file: File): boolean => {
  return ALLOWED_FILE_TYPES.includes(file.type);
};

export const validateFile = (file: File): FileValidationResult => {
  if (!validateFileSize(file)) {
    return { isValid: false, error: ERROR_MESSAGES.FILE_SIZE };
  }

  if (!validateFileType(file)) {
    return { isValid: false, error: ERROR_MESSAGES.FILE_TYPE };
  }

  return { isValid: true, error: null };
};
