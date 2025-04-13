
import { toast } from '@/components/ui/use-toast';
import { DocumentFileWithMetadata } from '../types';
import { validateFileSize, validateFileType } from '@/utils/validation';
import { sanitizeFileName } from '@/utils/security';

// Define allowed file types and size
export const ALLOWED_DOCUMENT_TYPES = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
export const MAX_FILE_SIZE_MB = 10;

// Comprehensive file validation
export const validateFile = async (file: File, setFileError: React.Dispatch<React.SetStateAction<string | null>>): Promise<boolean> => {
  try {
    // Sanitize file name
    const sanitizedFileName = sanitizeFileName(file.name);
    if (sanitizedFileName !== file.name) {
      console.warn('File name was sanitized for security purposes', {
        original: file.name,
        sanitized: sanitizedFileName
      });
    }
    
    // Check file size
    const sizeError = validateFileSize(file, MAX_FILE_SIZE_MB);
    if (sizeError) {
      setFileError(sizeError);
      return false;
    }

    // Check file extension
    const typeError = validateFileType(file, ALLOWED_DOCUMENT_TYPES);
    if (typeError) {
      setFileError(typeError);
      return false;
    }
    
    // Validate MIME type for additional security
    const validMimeTypes = [
      'application/pdf',                                              // PDF
      'application/msword',                                           // DOC
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'image/jpeg',                                                   // JPG, JPEG
      'image/png'                                                     // PNG
    ];
    
    if (!validMimeTypes.includes(file.type)) {
      setFileError(`Invalid file format. Please upload a valid document.`);
      return false;
    }
    
    // Additional security check for file content
    try {
      // For images, verify they're valid by loading them 
      if (file.type.startsWith('image/')) {
        const isValid = await new Promise<boolean>((resolve) => {
          const img = new Image();
          const objectUrl = URL.createObjectURL(file);
          
          img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(true);
          };
          
          img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(false);
          };
          
          img.src = objectUrl;
        });
        
        if (!isValid) {
          setFileError(`The image file appears to be corrupted or invalid.`);
          return false;
        }
      }
      
      // For PDFs, we could check the magic number (binary signature)
      // This is a simplified example
      if (file.type === 'application/pdf') {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer.slice(0, 5));
        const signature = String.fromCharCode.apply(null, Array.from(bytes));
        
        if (signature !== '%PDF-') {
          setFileError(`The PDF file appears to be corrupted or invalid.`);
          return false;
        }
      }
    } catch (error) {
      console.error('Error during file content validation:', error);
      setFileError(`Error validating file. Please try again with a different file.`);
      return false;
    }

    setFileError(null);
    return true;
  } catch (error) {
    console.error('File validation error:', error);
    setFileError(`Unexpected error validating file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
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
  try {
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
  } catch (error) {
    console.error('Document metadata validation error:', error);
    return "Error validating document metadata";
  }
};
