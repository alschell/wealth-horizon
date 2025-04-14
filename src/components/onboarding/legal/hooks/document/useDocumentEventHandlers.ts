
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';
import { showSuccess, showError } from '@/utils/toast';
import { useDocumentValidation } from './useDocumentValidation';
import { useDocumentFactory } from './useDocumentFactory';

interface UseDocumentEventHandlersProps {
  documentType: string;
  setDocumentType: (type: string) => void;
  issueDate: string;
  setIssueDate: (date: string) => void;
  expiryDate: string;
  setExpiryDate: (date: string) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  documentFiles: DocumentFileWithMetadata[];
  setDocumentFiles: (files: DocumentFileWithMetadata[] | ((prev: DocumentFileWithMetadata[]) => DocumentFileWithMetadata[])) => void;
  errors: Record<string, boolean>;
  setErrors: (errors: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  fileError: string | null;
  setFileError: (error: string | null) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  editingDocumentId: string | null;
  setEditingDocumentId: (id: string | null) => void;
  resetForm: () => void;
  onSave?: (documents: DocumentFileWithMetadata[]) => void | Promise<void>;
}

/**
 * Hook providing event handlers for document management
 */
export function useDocumentEventHandlers({
  documentType,
  setDocumentType,
  issueDate,
  setIssueDate,
  expiryDate,
  setExpiryDate,
  selectedFile,
  setSelectedFile,
  documentFiles,
  setDocumentFiles,
  errors,
  setErrors,
  fileError,
  setFileError,
  isEditing,
  setIsEditing,
  editingDocumentId,
  setEditingDocumentId,
  resetForm,
  onSave
}: UseDocumentEventHandlersProps) {
  // Get validation functions
  const { validateFile, validateDocumentFields } = useDocumentValidation();
  
  // Get document factory functions
  const { createDocument, updateDocumentInList, removeDocumentFromList } = useDocumentFactory();

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
    
    showSuccess("File uploaded", "Document has been successfully uploaded.");
  }, [validateFile, setSelectedFile, setFileError, setErrors]);
  
  /**
   * Clear selected file
   */
  const handleFileClear = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
  }, [setSelectedFile, setFileError]);
  
  /**
   * Handle date changes
   */
  const handleDateChange = useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (field === 'issueDate') {
      setIssueDate(date ? date.toISOString().split('T')[0] : '');
      setErrors((prev: Record<string, boolean>) => ({ ...prev, issueDate: false }));
    } else {
      setExpiryDate(date ? date.toISOString().split('T')[0] : '');
    }
  }, [setIssueDate, setExpiryDate, setErrors]);
  
  /**
   * Handle document type selection
   */
  const handleDocumentTypeChange = useCallback((type: string) => {
    setDocumentType(type);
    setErrors((prev: Record<string, boolean>) => ({ ...prev, documentType: false }));
  }, [setDocumentType, setErrors]);
  
  /**
   * Add a new document
   */
  const handleAddDocument = useCallback(() => {
    // Validate required fields
    const newErrors = validateDocumentFields(documentType, issueDate, selectedFile);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create new document with metadata
    const newDocument = createDocument(
      documentType,
      issueDate,
      expiryDate,
      selectedFile as File
    );
    
    // Add to list
    setDocumentFiles((prev: DocumentFileWithMetadata[]) => [...prev, newDocument]);
    
    // Reset form
    resetForm();
    
    showSuccess("Document added", "The document has been added successfully.");
  }, [documentType, issueDate, expiryDate, selectedFile, createDocument, validateDocumentFields, setErrors, setDocumentFiles, resetForm]);
  
  /**
   * Edit an existing document
   */
  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = documentFiles.find(doc => doc.id === documentId);
    
    if (documentToEdit) {
      setDocumentType(documentToEdit.documentType);
      setIssueDate(documentToEdit.issueDate);
      setExpiryDate(documentToEdit.expiryDate || '');
      setSelectedFile(documentToEdit.file);
      setIsEditing(true);
      setEditingDocumentId(documentId);
    }
  }, [documentFiles, setDocumentType, setIssueDate, setExpiryDate, setSelectedFile, setIsEditing, setEditingDocumentId]);
  
  /**
   * Update an existing document
   */
  const handleUpdateDocument = useCallback(() => {
    if (!editingDocumentId) return;
    
    // Validate required fields
    const newErrors = validateDocumentFields(documentType, issueDate, selectedFile);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update document
    setDocumentFiles((prev: DocumentFileWithMetadata[]) => 
      updateDocumentInList(
        prev,
        editingDocumentId,
        documentType,
        issueDate,
        expiryDate,
        selectedFile as File
      )
    );
    
    // Reset form and editing state
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
    
    showSuccess("Document updated", "The document has been updated successfully.");
  }, [editingDocumentId, documentType, issueDate, expiryDate, selectedFile, updateDocumentInList, validateDocumentFields, setErrors, setDocumentFiles, resetForm, setIsEditing, setEditingDocumentId]);
  
  /**
   * Cancel edit operation
   */
  const handleCancelEdit = useCallback(() => {
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
  }, [resetForm, setIsEditing, setEditingDocumentId]);
  
  /**
   * Remove a document
   */
  const handleRemoveDocument = useCallback((documentId: string) => {
    setDocumentFiles((prev: DocumentFileWithMetadata[]) => removeDocumentFromList(prev, documentId));
    showSuccess("Document removed", "The document has been removed successfully.");
  }, [removeDocumentFromList, setDocumentFiles]);
  
  /**
   * Submit all documents
   */
  const handleSubmit = useCallback(async () => {
    if (documentFiles.length === 0) {
      showError("No documents", "Please add at least one document.");
      return;
    }
    
    try {
      if (onSave) {
        await onSave(documentFiles);
      }
      
      showSuccess("Documents saved", "Documents have been saved successfully.");
    } catch (error) {
      console.error("Error submitting documents:", error);
      showError("Error", "An error occurred while saving documents.");
    }
  }, [documentFiles, onSave]);
  
  return {
    handleFileSelected,
    handleFileClear,
    handleDateChange,
    handleDocumentTypeChange,
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleCancelEdit,
    handleRemoveDocument,
    handleSubmit
  };
}
