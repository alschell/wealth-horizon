
import { DocumentFileWithMetadata } from '../../types';

/**
 * Creates a new document with metadata
 */
export const createDocument = (
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
 * Updates an existing document in the document list
 */
export const updateDocumentInList = (
  documentFiles: DocumentFileWithMetadata[],
  editingDocumentId: string,
  documentType: string,
  issueDate: string,
  expiryDate: string,
  selectedFile: File
): DocumentFileWithMetadata[] => {
  return documentFiles.map(doc => {
    if (doc.id === editingDocumentId) {
      return {
        ...doc,
        file: selectedFile,
        documentType,
        issueDate,
        expiryDate
      };
    }
    return doc;
  });
};

/**
 * Removes a document from the document list
 */
export const removeDocumentFromList = (
  documentFiles: DocumentFileWithMetadata[],
  documentId: string
): DocumentFileWithMetadata[] => {
  return documentFiles.filter(doc => doc.id !== documentId);
};
