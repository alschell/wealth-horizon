
import { DocumentFileWithMetadata } from '../../../types';

export const documentListOperations = {
  addDocument: (
    documentFiles: DocumentFileWithMetadata[],
    newDocument: DocumentFileWithMetadata
  ): DocumentFileWithMetadata[] => {
    return [...documentFiles, newDocument];
  },

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

  removeDocument: (
    documentFiles: DocumentFileWithMetadata[],
    documentId: string
  ): DocumentFileWithMetadata[] => {
    return documentFiles.filter(doc => doc.id !== documentId);
  }
};
