
import { useCallback } from 'react';
import { showSuccess } from '@/utils/toast';
import { FileValidationResult } from './validation/types';
import { useDocumentErrorState } from './useDocumentErrorState';

interface UseDocumentFileHandlerProps {
  validateFile: (file: File) => FileValidationResult;
  setSelectedFile: (file: File | null) => void;
}

export function useDocumentFileHandler({
  validateFile,
  setSelectedFile
}: UseDocumentFileHandlerProps) {
  const { setFileError, setFieldError } = useDocumentErrorState();

  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const validationResult = validateFile(file);
    
    if (!validationResult.isValid) {
      setFileError(validationResult.error);
      return;
    }
    
    setSelectedFile(file);
    setFileError(null);
    setFieldError('selectedFile', false);
    
    showSuccess("File uploaded", "Document has been successfully uploaded.");
  }, [validateFile, setSelectedFile, setFileError, setFieldError]);
  
  const handleFileClear = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
  }, [setSelectedFile, setFileError]);

  return {
    handleFileSelected,
    handleFileClear
  };
}
