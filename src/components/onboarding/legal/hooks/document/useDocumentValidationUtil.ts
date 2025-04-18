
import { DocumentFileWithMetadata } from '../../types';

export const DocumentValidationUtil = {
  validateFile: (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF, JPEG and PNG files are allowed';
    }

    return null;
  },

  validateDocumentFields: (
    documentType: string,
    issueDate: string,
    selectedFile: File | null
  ) => {
    const errors: Record<string, boolean> = {};

    if (!documentType) {
      errors.documentType = true;
    }
    if (!issueDate) {
      errors.issueDate = true;
    }
    if (!selectedFile) {
      errors.selectedFile = true;
    }

    return errors;
  }
};

