
import { useState } from 'react';
import { DocumentFileWithMetadata } from '../../types';
import { DocumentValidationErrors } from './validation/types';

export interface UseDocumentFormStateProps {
  initialDocuments?: DocumentFileWithMetadata[];
}

export function useDocumentFormState({ initialDocuments = [] }: UseDocumentFormStateProps = {}) {
  const [documentType, setDocumentType] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  const [errors, setErrors] = useState<DocumentValidationErrors>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setDocumentType('');
    setIssueDate('');
    setExpiryDate('');
    setSelectedFile(null);
    setErrors({});
    setFileError(null);
    setIsEditing(false);
    setEditingDocumentId(null);
  };

  return {
    documentType,
    setDocumentType,
    issueDate,
    setIssueDate,
    expiryDate,
    setExpiryDate,
    selectedFile,
    setSelectedFile,
    documentFiles,
    setDocumentFiles,
    errors,
    setErrors,
    fileError,
    setFileError,
    isEditing,
    setIsEditing,
    editingDocumentId,
    setEditingDocumentId,
    isSubmitting,
    setIsSubmitting,
    resetForm
  };
}

// Add this function for backward compatibility with useDocumentCore.ts
export const createInitialFormValues = () => ({
  documentType: '',
  issueDate: '',
  expiryDate: '',
  selectedFile: null
});
