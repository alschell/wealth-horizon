
import { useState } from 'react';
import { DocumentFileWithMetadata } from '../../types';
import { DocumentState } from './types';

export const useDocumentFormState = (initialDocuments: DocumentFileWithMetadata[] = []): DocumentState => {
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);

  return {
    documentFiles,
    fileError,
    isEditing,
    editingDocumentId
  };
};

export const createInitialFormValues = () => ({
  documentType: '',
  issueDate: '',
  expiryDate: '',
  selectedFile: null
});
