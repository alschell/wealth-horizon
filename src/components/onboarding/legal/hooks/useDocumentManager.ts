
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../types';
import { useDocumentFormState } from './document/useDocumentFormState';
import { useDocumentEventHandlers } from './document/useDocumentEventHandlers';

export interface UseDocumentManagerProps {
  onSave?: (documents: DocumentFileWithMetadata[]) => void | Promise<void>;
  initialDocuments?: DocumentFileWithMetadata[];
}

/**
 * Comprehensive hook for document management
 */
export function useDocumentManager({
  onSave,
  initialDocuments = []
}: UseDocumentManagerProps = {}) {
  // Use form state hook
  const formState = useDocumentFormState({ initialDocuments });
  
  // Use event handlers hook with all required properties from formState
  const eventHandlers = useDocumentEventHandlers({
    documentType: formState.documentType,
    setDocumentType: formState.setDocumentType,
    issueDate: formState.issueDate,
    setIssueDate: formState.setIssueDate,
    expiryDate: formState.expiryDate,
    setExpiryDate: formState.setExpiryDate,
    selectedFile: formState.selectedFile,
    setSelectedFile: formState.setSelectedFile,
    documentFiles: formState.documentFiles,
    setDocumentFiles: formState.setDocumentFiles,
    errors: formState.errors as Record<string, boolean>,  // Type assertion to ensure compatibility
    setErrors: formState.setErrors as React.Dispatch<React.SetStateAction<Record<string, boolean>>>,  // Type assertion
    fileError: formState.fileError,
    setFileError: formState.setFileError,
    isEditing: formState.isEditing,
    setIsEditing: formState.setIsEditing,
    editingDocumentId: formState.editingDocumentId,
    setEditingDocumentId: formState.setEditingDocumentId,
    resetForm: formState.resetForm,
    onSave
  });
  
  // Set submission state only when explicitly submitting
  const handleSubmit = useCallback(async () => {
    formState.setIsSubmitting(true);
    
    try {
      await eventHandlers.handleSubmit();
    } finally {
      formState.setIsSubmitting(false);
    }
  }, [eventHandlers, formState]);
  
  return {
    ...formState,
    ...eventHandlers,
    handleSubmit
  };
}
