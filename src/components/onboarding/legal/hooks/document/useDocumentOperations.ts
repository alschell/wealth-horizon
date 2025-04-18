
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';

interface UseDocumentOperationsProps {
  documentFiles: DocumentFileWithMetadata[];
  setDocumentFiles: React.Dispatch<React.SetStateAction<DocumentFileWithMetadata[]>>;
  resetForm: () => void;
  setIsEditing: (isEditing: boolean) => void;
  setEditingDocumentId: (id: string | null) => void;
  createDocument: (documentType: string, issueDate: string, expiryDate: string, file: File) => DocumentFileWithMetadata;
  updateDocumentInList: (documents: DocumentFileWithMetadata[], documentId: string, documentType: string, issueDate: string, expiryDate: string, file: File) => DocumentFileWithMetadata[];
  removeDocumentFromList: (documents: DocumentFileWithMetadata[], documentId: string) => DocumentFileWithMetadata[];
}

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
  const handleAddDocument = useCallback((
    documentType: string,
    issueDate: string,
    expiryDate: string,
    selectedFile: File
  ) => {
    const newDocument = createDocument(documentType, issueDate, expiryDate, selectedFile);
    setDocumentFiles(prev => [...prev, newDocument]);
    resetForm();
  }, [createDocument, setDocumentFiles, resetForm]);

  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = documentFiles.find(doc => doc.id === documentId);
    if (documentToEdit) {
      setIsEditing(true);
      setEditingDocumentId(documentId);
    }
    return documentToEdit;
  }, [documentFiles, setIsEditing, setEditingDocumentId]);

  const handleUpdateDocument = useCallback((
    documentId: string,
    documentType: string,
    issueDate: string,
    expiryDate: string,
    selectedFile: File
  ) => {
    setDocumentFiles(prev => 
      updateDocumentInList(prev, documentId, documentType, issueDate, expiryDate, selectedFile)
    );
    setIsEditing(false);
    setEditingDocumentId(null);
    resetForm();
  }, [updateDocumentInList, setDocumentFiles, setIsEditing, setEditingDocumentId, resetForm]);

  const handleRemoveDocument = useCallback((documentId: string) => {
    setDocumentFiles(prev => removeDocumentFromList(prev, documentId));
  }, [removeDocumentFromList, setDocumentFiles]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditingDocumentId(null);
    resetForm();
  }, [setIsEditing, setEditingDocumentId, resetForm]);

  return {
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleRemoveDocument,
    handleCancelEdit
  };
}
