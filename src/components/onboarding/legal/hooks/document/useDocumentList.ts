
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../../types';

export function useDocumentList() {
  const addDocumentToList = useCallback((
    documents: DocumentFileWithMetadata[],
    newDocument: DocumentFileWithMetadata
  ): DocumentFileWithMetadata[] => {
    return [...documents, newDocument];
  }, []);

  const updateDocumentInList = useCallback((
    documents: DocumentFileWithMetadata[],
    documentId: string,
    documentType: string,
    issueDate: string,
    expiryDate: string,
    file: File
  ): DocumentFileWithMetadata[] => {
    return documents.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          documentType,
          issueDate,
          expiryDate,
          file
        };
      }
      return doc;
    });
  }, []);

  const removeDocumentFromList = useCallback((
    documents: DocumentFileWithMetadata[],
    documentId: string
  ): DocumentFileWithMetadata[] => {
    return documents.filter(doc => doc.id !== documentId);
  }, []);

  return {
    addDocumentToList,
    updateDocumentInList,
    removeDocumentFromList
  };
}
