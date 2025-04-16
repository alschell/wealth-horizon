
import { useState, useCallback } from 'react';
import { validateFileSize, validateFileType } from '@/utils/validation/fileValidation';

interface UseFileUploaderOptions {
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  initialFiles?: File[];
  onFilesChange?: (files: File[]) => void;
}

export const useFileUploader = ({
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedTypes = [],
  initialFiles = [],
  onFilesChange
}: UseFileUploaderOptions = {}) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateFiles = useCallback((newFiles: File[]): { valid: File[], errors: string[] } => {
    const validFiles: File[] = [];
    const newErrors: string[] = [];
    
    // Check if adding new files would exceed maxFiles limit
    if (files.length + newFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      // Only process files up to the limit
      newFiles = newFiles.slice(0, maxFiles - files.length);
    }
    
    // Validate each file
    for (const file of newFiles) {
      // Validate file size
      const sizeValidation = validateFileSize(file, maxSizeMB);
      if (!sizeValidation.valid) {
        newErrors.push(sizeValidation.message || `File ${file.name} exceeds size limit`);
        continue;
      }
      
      // Validate file type if acceptedTypes provided
      if (acceptedTypes.length > 0) {
        const typeValidation = validateFileType(file, acceptedTypes);
        if (!typeValidation.valid) {
          newErrors.push(typeValidation.message || `File ${file.name} type not allowed`);
          continue;
        }
      }
      
      validFiles.push(file);
    }
    
    return { valid: validFiles, errors: newErrors };
  }, [files.length, maxFiles, maxSizeMB, acceptedTypes]);

  const addFiles = useCallback((newFiles: File[]) => {
    const { valid, errors: newErrors } = validateFiles(newFiles);
    
    if (valid.length > 0) {
      const updatedFiles = [...files, ...valid];
      setFiles(updatedFiles);
      
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
    }
    
    setErrors(newErrors);
    return valid.length > 0;
  }, [files, validateFiles, onFilesChange]);

  const removeFile = useCallback((indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
    
    return true;
  }, [files, onFilesChange]);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setErrors([]);
    
    if (onFilesChange) {
      onFilesChange([]);
    }
  }, [onFilesChange]);

  return {
    files,
    errors,
    isLoading,
    addFiles,
    removeFile,
    clearFiles
  };
};
