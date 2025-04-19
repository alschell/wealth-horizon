
import { useMemo } from 'react';
import { DocumentValidationErrors, FileValidationResult, AllowedFileType } from './validation/types';
import { FILE_VALIDATION } from './validation/validationConstants';

/**
 * Hook to provide document validation utilities with memoization
 */
export function useDocumentValidationUtil() {
  /**
   * Validates a file against size and type constraints
   */
  const validateFile = useMemo(() => (file: File): FileValidationResult => {
    if (!file) {
      return {
        isValid: false,
        error: FILE_VALIDATION.MESSAGES.REQUIRED_FIELD
      };
    }

    if (file.size > FILE_VALIDATION.MAX_SIZE) {
      return {
        isValid: false,
        error: FILE_VALIDATION.MESSAGES.FILE_SIZE
      };
    }

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
  }, []);

  /**
   * Validates required document fields
   */
  const validateFields = useMemo(() => (
    documentType: string,
    issueDate: string,
    selectedFile: File | null
  ): DocumentValidationErrors => {
    const errors: DocumentValidationErrors = {};
    
    if (!documentType) errors.documentType = true;
    if (!issueDate) errors.issueDate = true;
    if (!selectedFile) errors.selectedFile = true;
    
    return errors;
  }, []);

  /**
   * Checks if there are any validation errors
   */
  const hasErrors = useMemo(() => (errors: DocumentValidationErrors): boolean => {
    return Object.values(errors).some(error => error === true);
  }, []);

  return {
    validateFile,
    validateFields,
    hasErrors
  };
}

/**
 * Static utility for document validation (for use outside hooks)
 */
export const DocumentValidationUtil = {
  /**
   * Validates a file against size and type constraints
   */
  validateFile(file: File): string | null {
    if (!file) {
      return FILE_VALIDATION.MESSAGES.REQUIRED_FIELD;
    }

    if (file.size > FILE_VALIDATION.MAX_SIZE) {
      return FILE_VALIDATION.MESSAGES.FILE_SIZE;
    }

    if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type as AllowedFileType)) {
      return FILE_VALIDATION.MESSAGES.FILE_TYPE;
    }

    return null;
  },

  /**
   * Validates required document fields
   */
  validateDocumentFields(
    documentType: string,
    issueDate: string,
    selectedFile: File | null
  ): DocumentValidationErrors {
    const errors: DocumentValidationErrors = {};
    
    if (!documentType) errors.documentType = true;
    if (!issueDate) errors.issueDate = true;
    if (!selectedFile) errors.selectedFile = true;
    
    return errors;
  },

  /**
   * Checks if there are any validation errors
   */
  hasValidationErrors(errors: DocumentValidationErrors): boolean {
    return Object.values(errors).some(error => error === true);
  }
};
