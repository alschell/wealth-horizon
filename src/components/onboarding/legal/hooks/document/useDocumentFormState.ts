
import { useState, useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';

/**
 * Hook for managing document form state
 */
export function useDocumentFormState(initialDocuments: DocumentFileWithMetadata[] = []) {
  // Document form state
  const [documentType, setDocumentType] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Document list state
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  
  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  /**
   * Reset the form
   */
  const resetForm = useCallback(() => {
    setDocumentType('');
    setIssueDate('');
    setExpiryDate('');
    setSelectedFile(null);
    setFileError(null);
    setErrors({});
  }, []);
  
  return {
    // Form state
    documentType,
    setDocumentType,
    issueDate,
    setIssueDate,
    expiryDate,
    setExpiryDate,
    selectedFile,
    setSelectedFile,
    
    // Document list state
    documentFiles,
    setDocumentFiles,
    
    // Validation state
    errors,
    setErrors,
    fileError,
    setFileError,
    
    // Editing state
    isEditing,
    setIsEditing,
    editingDocumentId,
    setEditingDocumentId,
    
    // Submission state
    isSubmitting,
    setIsSubmitting,
    
    // Utilities
    resetForm
  };
}
