
import { DocumentFileWithMetadata } from '../../../types';

export const documentOperations = {
  /**
   * Creates a new document with metadata
   */
  createDocument: (
    documentType: string,
    issueDate: string,
    expiryDate: string,
    file: File,
    id: string
  ): DocumentFileWithMetadata => {
    return {
      id,
      file,
      documentType,
      issueDate,
      expiryDate
    };
  },

  /**
   * Updates an existing document in the list
   */
  updateDocument: (
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
          file,
          documentType,
          issueDate,
          expiryDate
        };
      }
      return doc;
    });
  },

  /**
   * Removes a document from the list
   */
  removeDocument: (
    documents: DocumentFileWithMetadata[],
    documentId: string
  ): DocumentFileWithMetadata[] => {
    return documents.filter(doc => doc.id !== documentId);
  }
};
