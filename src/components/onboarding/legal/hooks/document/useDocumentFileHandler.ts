
import { useCallback } from 'react';

interface UseDocumentFileHandlerProps {
  validateFile: (file: File) => string | null;
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
    const error = validateFile(file);
    
    if (error) {
      setFileError(error);
      return;
    }
    
    setSelectedFile(file);
    setFileError(null);
    setErrors((prev: Record<string, boolean>) => ({ ...prev, selectedFile: false }));
    
    console.log("File uploaded successfully");
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
