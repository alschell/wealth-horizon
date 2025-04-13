
import { toast } from "@/components/ui/use-toast";
import { DocumentFileWithMetadata } from "../types";

/**
 * Validates a file for document upload
 */
export const validateFile = (file: File, setFileError: (error: string | null) => void): boolean => {
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    setFileError(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
    return false;
  }

  // Check file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    setFileError(`File type ${file.type} is not supported. Please upload PDF or image files.`);
    return false;
  }

  setFileError(null);
  return true;
};

/**
 * Shows a toast notification for document operations
 */
export const showToast = (title: string, description: string) => {
  toast({
    title,
    description,
  });
};

/**
 * Validates required document fields and returns errors if any
 */
export const validateDocumentFields = (
  documentType: string,
  issueDate: string,
  selectedFile: File | null
): Record<string, boolean> => {
  const errors: Record<string, boolean> = {};
  
  if (!documentType) errors.documentType = true;
  if (!issueDate) errors.issueDate = true;
  if (!selectedFile) errors.selectedFile = true;
  
  return errors;
};

/**
 * Creates a new document with metadata
 */
export const createDocument = (
  documentType: string,
  issueDate: string,
  expiryDate: string,
  selectedFile: File
): DocumentFileWithMetadata => {
  return {
    id: `doc-${Date.now()}`,
    file: selectedFile,
    documentType,
    issueDate,
    expiryDate
  };
};

/**
 * Updates an existing document in the document list
 */
export const updateDocumentInList = (
  documentFiles: DocumentFileWithMetadata[],
  editingDocumentId: string,
  documentType: string,
  issueDate: string,
  expiryDate: string,
  selectedFile: File
): DocumentFileWithMetadata[] => {
  return documentFiles.map(doc => {
    if (doc.id === editingDocumentId) {
      return {
        ...doc,
        file: selectedFile,
        documentType,
        issueDate,
        expiryDate
      };
    }
    return doc;
  });
};
