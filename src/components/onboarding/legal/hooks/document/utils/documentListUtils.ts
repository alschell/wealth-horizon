
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
   * Updates an existing document in the list with type safety
   */
  updateDocument: (
    documentFiles: DocumentFileWithMetadata[],
    editingDocumentId: string,
    updatedDocument: Partial<Omit<DocumentFileWithMetadata, 'id'>>
  ): DocumentFileWithMetadata[] => {
    return documentFiles.map(doc => {
      if (doc.id === editingDocumentId) {
        return { ...doc, ...updatedDocument };
      }
      return doc;
    });
  },

  /**
   * Safely removes a document from the list
   */
  removeDocument: (
    documentFiles: DocumentFileWithMetadata[],
    documentId: string
  ): DocumentFileWithMetadata[] => {
    if (!documentId) return documentFiles;
    return documentFiles.filter(doc => doc.id !== documentId);
  },

  /**
   * Find a document by ID with type safety
   */
  findDocumentById: (
    documentFiles: DocumentFileWithMetadata[],
    documentId: string
  ): DocumentFileWithMetadata | undefined => {
    return documentFiles.find(doc => doc.id === documentId);
  }
};
