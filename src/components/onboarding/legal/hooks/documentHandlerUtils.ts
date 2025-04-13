
import { toast } from '@/components/ui/use-toast';
import { DocumentFileWithMetadata } from '../types';

// Define allowed file types and size
export const ALLOWED_DOCUMENT_TYPES = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
export const MAX_FILE_SIZE_MB = 10;

// Validate file extension
const isValidFileExtension = (fileName: string): boolean => {
  const fileExtension = `.${fileName.split('.').pop()?.toLowerCase()}`;
  return ALLOWED_DOCUMENT_TYPES.includes(fileExtension);
};

// Validate file size
const isValidFileSize = (fileSize: number): boolean => {
  const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
};

// Validate file MIME type
const isValidMimeType = (file: File): boolean => {
  const validMimeTypes = [
    'application/pdf',                                              // PDF
    'application/msword',                                           // DOC
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'image/jpeg',                                                   // JPG, JPEG
    'image/png'                                                     // PNG
  ];
  
  return validMimeTypes.includes(file.type);
};

// Comprehensive file validation
export const validateFile = (file: File, setFileError: React.Dispatch<React.SetStateAction<string | null>>): boolean => {
  // Check file size
  if (!isValidFileSize(file.size)) {
    setFileError(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB`);
    return false;
  }

  // Check file extension
  if (!isValidFileExtension(file.name)) {
    setFileError(`File type not supported. Allowed types: ${ALLOWED_DOCUMENT_TYPES.join(', ')}`);
    return false;
  }
  
  // Check MIME type for additional security
  if (!isValidMimeType(file)) {
    setFileError(`Invalid file format. Please upload a valid document.`);
    return false;
  }

  setFileError(null);
  return true;
};

// Create toast notification helper with better error handling
export const showToast = (title: string, description: string, variant?: "default" | "destructive") => {
  try {
    toast({
      title,
      description,
      variant,
    });
  } catch (error) {
    console.error('Failed to show toast notification:', error);
    // Fallback alert if toast fails
    if (variant === "destructive") {
      alert(`Error: ${title}\n${description}`);
    }
  }
};
