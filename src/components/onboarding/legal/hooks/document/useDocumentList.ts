
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from './types';
import { useDocumentId } from './useDocumentId';

export const useDocumentList = () => {
  const { generateDocumentId } = useDocumentId();

  const addDocumentToList = useCallback((
    documents: DocumentFileWithMetadata[],
    documentType: string,
    issueDate: string,
    expiryDate: string,
    file: File
  ): DocumentFileWithMetadata[] => {
    const newDocument: DocumentFileWithMetadata = {
      id: generateDocumentId(),
      file,
      documentType,
      issueDate,
      expiryDate
    };
    return [...documents, newDocument];
  }, [generateDocumentId]);

  const updateDocumentInList = useCallback((
    documents: DocumentFileWithMetadata[],
    id: string,
    documentType: string,
    issueDate: string,
    expiryDate: string,
    file: File
  ): DocumentFileWithMetadata[] => {
    return documents.map(doc => 
      doc.id === id
        ? { ...doc, documentType, issueDate, expiryDate, file }
        : doc
    );
  }, []);

  const removeDocumentFromList = useCallback((
    documents: DocumentFileWithMetadata[],
    id: string
  ): DocumentFileWithMetadata[] => {
    return documents.filter(doc => doc.id !== id);
  }, []);

  return {
    addDocumentToList,
    updateDocumentInList,
    removeDocumentFromList
  };
};
