
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Document } from '../types';

// Define allowed file types and size
const ALLOWED_DOCUMENT_TYPES = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
const MAX_FILE_SIZE_MB = 10;

export const useDocumentHandlers = (
  documents: Document[],
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
) => {
  const [fileError, setFileError] = useState<string | null>(null);

  // Validate a file meets requirements
  const validateFile = useCallback((file: File): boolean => {
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
  }, []);

  // Handle file selection
  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0]; // Only use the first file since we're not using multiple
    if (!validateFile(file)) return;
    
    setDocuments(prevDocs => {
      const currentDoc = prevDocs[0] || { 
        id: Date.now().toString(),
        type: '',
        description: '',
        file: null
      };
      
      return [{ ...currentDoc, file }];
    });
    
    toast({
      title: "File uploaded",
      description: "Document has been successfully uploaded.",
    });
  }, [validateFile, setDocuments]);

  // Handle clearing the selected file
  const handleFileClear = useCallback(() => {
    setDocuments(prevDocs => {
      if (prevDocs.length === 0) return prevDocs;
      
      const currentDoc = prevDocs[0];
      return [{ ...currentDoc, file: null }];
    });
    
    setFileError(null);
  }, [setDocuments]);

  // Handle document type change
  const handleDocumentTypeChange = useCallback((type: string) => {
    setDocuments(prevDocs => {
      const currentDoc = prevDocs[0] || { 
        id: Date.now().toString(),
        type: '',
        description: '',
        file: null
      };
      
      return [{ ...currentDoc, type }];
    });
  }, [setDocuments]);

  // Handle document description change
  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    
    setDocuments(prevDocs => {
      const currentDoc = prevDocs[0] || { 
        id: Date.now().toString(),
        type: '',
        description: '',
        file: null
      };
      
      return [{ ...currentDoc, description }];
    });
  }, [setDocuments]);

  return {
    fileError,
    validateFile,
    handleFileSelected,
    handleFileClear,
    handleDocumentTypeChange,
    handleDescriptionChange
  };
};
