
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';
import { showSuccess } from '@/utils/toast';

interface UseDocumentOperationsProps {
  documentFiles: DocumentFileWithMetadata[];
  setDocumentFiles: (files: DocumentFileWithMetadata[] | ((prev: DocumentFileWithMetadata[]) => DocumentFileWithMetadata[])) => void;
  resetForm: () => void;
  setIsEditing: (isEditing: boolean) => void;
  setEditingDocumentId: (id: string | null) => void;
  createDocument: (documentType: string, issueDate: string, expiryDate: string, file: File) => DocumentFileWithMetadata;
  updateDocumentInList: (documents: DocumentFileWithMetadata[], id: string, type: string, issueDate: string, expiryDate: string, file: File) => DocumentFileWithMetadata[];
  removeDocumentFromList: (documents: DocumentFileWithMetadata[], id: string) => DocumentFileWithMetadata[];
}

/**
 * Hook for document list operations (add, edit, update, delete)
 */
export function useDocumentOperations({
  documentFiles,
  setDocumentFiles,
  resetForm,
  setIsEditing,
  setEditingDocumentId,
  createDocument,
  updateDocumentInList,
  removeDocumentFromList
}: UseDocumentOperationsProps) {
  /**
   * Add a new document
   */
  const handleAddDocument = useCallback((documentType: string, issueDate: string, expiryDate: string, selectedFile: File) => {
    // Create new document with metadata
    const newDocument = createDocument(
      documentType,
      issueDate,
      expiryDate,
      selectedFile
    );
    
    // Add to list
    setDocumentFiles((prev: DocumentFileWithMetadata[]) => [...prev, newDocument]);
    
    // Reset form
    resetForm();
    
    showSuccess("Document added", "The document has been added successfully.");
  }, [createDocument, setDocumentFiles, resetForm]);
  
  /**
   * Edit an existing document
   */
  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = documentFiles.find(doc => doc.id === documentId);
    
    if (documentToEdit) {
      setIsEditing(true);
      setEditingDocumentId(documentId);
      return documentToEdit;
    }
    return null;
  }, [documentFiles, setIsEditing, setEditingDocumentId]);
  
  /**
   * Update an existing document
   */
  const handleUpdateDocument = useCallback((
    editingDocumentId: string, 
    documentType: string, 
    issueDate: string, 
    expiryDate: string, 
    selectedFile: File
  ) => {
    // Update document
    setDocumentFiles((prev: DocumentFileWithMetadata[]) => 
      updateDocumentInList(
        prev,
        editingDocumentId,
        documentType,
        issueDate,
        expiryDate,
        selectedFile
      )
    );
    
    // Reset form and editing state
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
    
    showSuccess("Document updated", "The document has been updated successfully.");
  }, [updateDocumentInList, setDocumentFiles, resetForm, setIsEditing, setEditingDocumentId]);
  
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

  return {
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleCancelEdit,
    handleRemoveDocument
  };
}
