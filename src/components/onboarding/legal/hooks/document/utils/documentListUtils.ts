
import { DocumentFileWithMetadata } from '../../../types';

export const documentListOperations = {
  /**
   * Adds a new document to the list
   */
  addDocument: (
    documentFiles: DocumentFileWithMetadata[],
    newDocument: DocumentFileWithMetadata
  ): DocumentFileWithMetadata[] => {
    return [...documentFiles, newDocument];
  },

  /**
   * Updates an existing document in the list
   */
  updateDocument: (
    documentFiles: DocumentFileWithMetadata[],
    editingDocumentId: string,
    updatedDocument: Partial<DocumentFileWithMetadata>
  ): DocumentFileWithMetadata[] => {
    return documentFiles.map(doc => {
      if (doc.id === editingDocumentId) {
        return { ...doc, ...updatedDocument };
      }
      return doc;
    });
  },

  /**
   * Removes a document from the list
   */
  removeDocument: (
    documentFiles: DocumentFileWithMetadata[],
    documentId: string
  ): DocumentFileWithMetadata[] => {
    return documentFiles.filter(doc => doc.id !== documentId);
  }
};
