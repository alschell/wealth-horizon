
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';
import { showSuccess } from '@/utils/toast';

interface UseDocumentOperationsProps {
  documentFiles: DocumentFileWithMetadata[];
  setDocumentFiles: React.Dispatch<React.SetStateAction<DocumentFileWithMetadata[]>>;
  resetForm: () => void;
  setIsEditing: (isEditing: boolean) => void;
  setEditingDocumentId: (id: string | null) => void;
  createDocument: (
    documentType: string,
    issueDate: string,
    expiryDate: string,
    selectedFile: File
  ) => DocumentFileWithMetadata;
  updateDocumentInList: (
    documents: DocumentFileWithMetadata[],
    id: string,
    documentType: string,
    issueDate: string,
    expiryDate: string,
    file: File
  ) => DocumentFileWithMetadata[];
  removeDocumentFromList: (
    documents: DocumentFileWithMetadata[],
    id: string
  ) => DocumentFileWithMetadata[];
}

/**
 * Hook for handling document CRUD operations
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
   * Add a document to the list
   */
  const handleAddDocument = useCallback((
    documentType: string,
    issueDate: string,
    expiryDate: string,
    selectedFile: File
  ) => {
    // Create new document with metadata
    const newDocument = createDocument(documentType, issueDate, expiryDate, selectedFile);
    
    // Add to list
    setDocumentFiles(prev => [...prev, newDocument]);
    
    // Reset form after adding
    resetForm();
    
    showSuccess("Document added", "The document has been added successfully.");
  }, [createDocument, setDocumentFiles, resetForm]);
  
  /**
   * Begin editing a document
   */
  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = documentFiles.find(doc => doc.id === documentId);
    
    if (documentToEdit) {
      setIsEditing(true);
      setEditingDocumentId(documentId);
    }
    
    return documentToEdit;
  }, [documentFiles, setIsEditing, setEditingDocumentId]);
  
  /**
   * Update a document in the list
   */
  const handleUpdateDocument = useCallback((
    id: string,
    documentType: string,
    issueDate: string,
    expiryDate: string,
    selectedFile: File
  ) => {
    setDocumentFiles(prev => 
      updateDocumentInList(prev, id, documentType, issueDate, expiryDate, selectedFile)
    );
    
    // Reset form after updating
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
    
    showSuccess("Document updated", "The document has been updated successfully.");
  }, [updateDocumentInList, setDocumentFiles, resetForm, setIsEditing, setEditingDocumentId]);
  
  /**
   * Cancel editing a document
   */
  const handleCancelEdit = useCallback(() => {
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
  }, [resetForm, setIsEditing, setEditingDocumentId]);
  
  /**
   * Remove a document from the list
   */
  const handleRemoveDocument = useCallback((id: string) => {
    setDocumentFiles(prev => removeDocumentFromList(prev, id));
    
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
