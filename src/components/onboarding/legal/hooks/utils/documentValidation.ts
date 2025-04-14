
/**
 * Validates a file for document upload
 */
export const validateFile = (file: File): string | null => {
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`;
  }

  // Check file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return `File type ${file.type} is not supported. Please upload PDF or image files.`;
  }

  return null;
};

/**
 * Validates required document fields and returns errors
 */
export const validateDocumentFields = (
  documentType: string,
  issueDate: string,
  selectedFile: File | null
): Record<string, boolean> => {
  const errors: Record<string, boolean> = {};
  
  if (!documentType) errors.documentType = true;
  if (!issueDate) errors.issueDate = true;
  if (!selectedFile) errors.selectedFile = true;
  
  return errors;
};
