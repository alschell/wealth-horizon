
import { DocumentFileWithMetadata } from '../../types';

/**
 * Hook providing factory functions for document management
 */
export function useDocumentFactory() {
  /**
   * Creates a new document with metadata
   */
  const createDocument = (
    documentType: string,
    issueDate: string,
    expiryDate: string,
    selectedFile: File
  ): DocumentFileWithMetadata => {
    return {
      id: `doc-${Date.now()}`,
      file: selectedFile,
      documentType,
      issueDate,
      expiryDate
    };
  };

  /**
   * Updates a document in a list of documents
   */
  const updateDocumentInList = (
    documents: DocumentFileWithMetadata[],
    id: string,
    documentType: string,
    issueDate: string,
    expiryDate: string,
    file: File
  ): DocumentFileWithMetadata[] => {
    return documents.map(doc => {
      if (doc.id === id) {
        return {
          ...doc,
          file,
          documentType,
          issueDate,
          expiryDate
        };
      }
      return doc;
    });
  };

  /**
   * Removes a document from a list of documents
   */
  const removeDocumentFromList = (
    documents: DocumentFileWithMetadata[],
    id: string
  ): DocumentFileWithMetadata[] => {
    return documents.filter(doc => doc.id !== id);
  };

  return {
    createDocument,
    updateDocumentInList,
    removeDocumentFromList
  };
}
