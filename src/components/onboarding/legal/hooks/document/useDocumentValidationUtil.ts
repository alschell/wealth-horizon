
// Export the validation utilities as named exports
export const useDocumentValidationUtil = () => {
  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    
    if (file.size > maxSize) {
      return 'File size exceeds 5MB limit';
    }
    
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Only PDF, JPEG, and PNG are allowed';
    }
    
    return null;
  };

  return { validateFile };
};

// Static utility functions for validation
export const DocumentValidationUtil = {
  validateFile: (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    
    if (file.size > maxSize) {
      return 'File size exceeds 5MB limit';
    }
    
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
    
    return null;
  },
  
  validateDocumentFields: (
    documentType: string,
    issueDate: string,
    selectedFile: File | null
  ): Record<string, boolean> => {
    const errors: Record<string, boolean> = {};
    
    if (!documentType) errors.documentType = true;
    if (!issueDate) errors.issueDate = true;
    if (!selectedFile) errors.selectedFile = true;
    
    return errors;
  }
};

export default DocumentValidationUtil;
