
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
