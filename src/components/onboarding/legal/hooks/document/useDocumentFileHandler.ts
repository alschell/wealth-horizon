
import { useCallback } from 'react';
import { showSuccess } from '@/utils/toast';
import { FileValidationResult } from './validation/types';

interface UseDocumentFileHandlerProps {
  validateFile: (file: File) => FileValidationResult;
  setSelectedFile: (file: File | null) => void;
  setFileError: (error: string | null) => void;
  setErrors: (errors: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
}

/**
 * Hook for handling document file operations
 */
export function useDocumentFileHandler({
  validateFile,
  setSelectedFile,
  setFileError,
  setErrors
}: UseDocumentFileHandlerProps) {
  /**
   * Handle file selection
   */
  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0]; // Only use the first file
    const validationResult = validateFile(file);
    
    if (!validationResult.isValid) {
      setFileError(validationResult.error || "Invalid file");
      return;
    }
    
    setSelectedFile(file);
    setFileError(null);
    setErrors((prev: Record<string, boolean>) => ({ ...prev, selectedFile: false }));
    
    showSuccess("File uploaded", "Document has been successfully uploaded.");
  }, [validateFile, setSelectedFile, setFileError, setErrors]);
  
  /**
   * Clear selected file
   */
  const handleFileClear = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
  }, [setSelectedFile, setFileError]);

  return {
    handleFileSelected,
    handleFileClear
  };
}
