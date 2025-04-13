
import { toast } from '@/components/ui/use-toast';
import { DocumentFileWithMetadata } from '../types';

// Define allowed file types and size
export const ALLOWED_DOCUMENT_TYPES = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
export const MAX_FILE_SIZE_MB = 10;

// Validate a file meets requirements
export const validateFile = (file: File, setFileError: React.Dispatch<React.SetStateAction<string | null>>): boolean => {
  // Check file size
  const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    setFileError(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB`);
    return false;
  }

  // Check file extension
  const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
  if (!ALLOWED_DOCUMENT_TYPES.includes(fileExtension)) {
    setFileError(`File type not supported. Allowed types: ${ALLOWED_DOCUMENT_TYPES.join(', ')}`);
    return false;
  }

  setFileError(null);
  return true;
};

// Create toast notification helper
export const showToast = (title: string, description: string, variant?: "default" | "destructive") => {
  toast({
    title,
    description,
    variant,
  });
};
