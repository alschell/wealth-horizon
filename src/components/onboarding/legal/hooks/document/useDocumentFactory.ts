
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from './types';
import { useDocumentId } from './useDocumentId';
import { useDocumentList } from './useDocumentList';

export function useDocumentFactory() {
  const { generateDocumentId } = useDocumentId();
  const { addDocumentToList, updateDocumentInList, removeDocumentFromList } = useDocumentList();

  const createDocument = useCallback((
    documentType: string,
    issueDate: string,
    expiryDate: string,
    selectedFile: File
  ): DocumentFileWithMetadata => {
    return {
      id: generateDocumentId(),
      file: selectedFile,
      documentType,
      issueDate,
      expiryDate
    };
  }, [generateDocumentId]);

  return {
    createDocument,
    updateDocumentInList,
    removeDocumentFromList
  };
}
