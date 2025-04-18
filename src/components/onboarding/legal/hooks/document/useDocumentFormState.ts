
import { useState, useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';
import { DocumentState } from './types';

export const useDocumentFormState = (initialDocuments: DocumentFileWithMetadata[] = []): DocumentState => {
  // Document data state
  const [documentType, setDocumentType] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  
  // Error state
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  
  // UI state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Reset form to initial state
  const resetForm = useCallback(() => {
    setDocumentType('');
    setIssueDate('');
    setExpiryDate('');
    setSelectedFile(null);
    setErrors({});
    setFileError(null);
  }, []);

  return {
    // Document data
    documentType,
    issueDate,
    expiryDate,
    selectedFile,
    documentFiles,
    
    // Error state
    errors,
    fileError,
    
    // UI state
    isEditing,
    editingDocumentId,
    isSubmitting,
    
    // Setters
    setDocumentType,
    setIssueDate,
    setExpiryDate,
    setSelectedFile,
    setDocumentFiles,
    setErrors,
    setFileError,
    setIsEditing,
    setEditingDocumentId,
    setIsSubmitting,
    
    // Actions
    resetForm
  };
};

export const createInitialFormValues = () => ({
  documentType: '',
  issueDate: '',
  expiryDate: '',
  selectedFile: null
});
