
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';
import { useDocumentValidation } from './useDocumentValidation';
import { useDocumentFactory } from './useDocumentFactory';
import { useDocumentFileHandler } from './useDocumentFileHandler';
import { useDocumentFieldHandlers } from './useDocumentFieldHandlers';
import { useDocumentOperations } from './useDocumentOperations';

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
  setDocumentFiles: React.Dispatch<React.SetStateAction<DocumentFileWithMetadata[]>>;
  errors: Record<string, boolean>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
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

  // Use the document file handler
  const fileHandler = useDocumentFileHandler({
    validateFile,
    setSelectedFile,
    setFileError,
    setErrors
  });

  // Use the document field handlers
  const fieldHandlers = useDocumentFieldHandlers({
    setDocumentType,
    setIssueDate,
    setExpiryDate,
    setErrors
  });

  // Use the document operations
  const documentOperations = useDocumentOperations({
    documentFiles,
    setDocumentFiles,
    resetForm,
    setIsEditing,
    setEditingDocumentId,
    createDocument,
    updateDocumentInList,
    removeDocumentFromList
  });

  /**
   * Add a new document
   */
  const handleAddDocument = useCallback(() => {
    // Validate required fields
    const newErrors = validateDocumentFields(documentType, issueDate, selectedFile);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }
    
    if (!selectedFile) {
      return;
    }
    
    documentOperations.handleAddDocument(documentType, issueDate, expiryDate, selectedFile);
  }, [documentType, issueDate, expiryDate, selectedFile, validateDocumentFields, setErrors, documentOperations]);
  
  /**
   * Edit an existing document
   */
  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = documentOperations.handleEditDocument(documentId);
    
    if (documentToEdit) {
      setDocumentType(documentToEdit.documentType);
      setIssueDate(documentToEdit.issueDate);
      setExpiryDate(documentToEdit.expiryDate || '');
      setSelectedFile(documentToEdit.file);
    }
  }, [documentOperations, setDocumentType, setIssueDate, setExpiryDate, setSelectedFile]);
  
  /**
   * Update an existing document
   */
  const handleUpdateDocument = useCallback(() => {
    if (!editingDocumentId) return;
    
    // Validate required fields
    const newErrors = validateDocumentFields(documentType, issueDate, selectedFile);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }
    
    if (!selectedFile) {
      return;
    }
    
    documentOperations.handleUpdateDocument(editingDocumentId, documentType, issueDate, expiryDate, selectedFile);
  }, [editingDocumentId, documentType, issueDate, expiryDate, selectedFile, validateDocumentFields, setErrors, documentOperations]);
  
  /**
   * Submit all documents
   */
  const handleSubmit = useCallback(async () => {
    if (documentFiles.length === 0) {
      console.error("No documents");
      return;
    }
    
    try {
      if (onSave) {
        await onSave(documentFiles);
      }
      
      console.log("Documents saved successfully");
    } catch (error) {
      console.error("Error submitting documents:", error);
    }
  }, [documentFiles, onSave]);
  
  return {
    fileError,
    // File handling
    handleFileSelected: fileHandler.handleFileSelected,
    handleFileClear: fileHandler.handleFileClear,
    
    // Field handling
    handleDateChange: fieldHandlers.handleDateChange,
    handleDocumentTypeChange: fieldHandlers.handleDocumentTypeChange,
    
    // Document operations
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleCancelEdit: documentOperations.handleCancelEdit,
    handleRemoveDocument: documentOperations.handleRemoveDocument,
    
    // Form submission
    handleSubmit
  };
}
