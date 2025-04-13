
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

// Additional security check for file content
const performSecurityScan = async (file: File): Promise<boolean> => {
  // In a real application, this would integrate with a virus scanning service
  // or content verification API. For now, we'll implement basic checks.
  
  // Check if file is empty
  if (file.size === 0) {
    return false;
  }
  
  // For images, we could check dimensions or verify they're valid images
  if (file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  }
  
  // For simplicity, we'll assume other file types pass this check
  return true;
};

// Comprehensive file validation
export const validateFile = async (file: File, setFileError: React.Dispatch<React.SetStateAction<string | null>>): Promise<boolean> => {
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
  
  // Perform content security validation 
  try {
    const isSecure = await performSecurityScan(file);
    if (!isSecure) {
      setFileError(`The file could not be validated for security reasons.`);
      return false;
    }
  } catch (error) {
    console.error('Error during file security validation:', error);
    setFileError(`Error validating file security. Please try again.`);
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

// Helper function to validate document metadata
export const validateDocumentMetadata = (
  document: Partial<DocumentFileWithMetadata>
): string | null => {
  if (!document.documentType?.trim()) {
    return "Document type is required";
  }
  
  if (!document.issueDate?.trim()) {
    return "Issue date is required";
  }
  
  if (document.documentType === "passport" && !document.expiryDate?.trim()) {
    return "Expiry date is required for passports";
  }
  
  // Validate document number if required for specific document types
  if (["passport", "drivingLicense", "nationalID"].includes(document.documentType) && 
      !document.documentNumber?.trim()) {
    return "Document number is required";
  }
  
  return null;
};
