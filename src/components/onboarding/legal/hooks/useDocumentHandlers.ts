
import { useCallback } from 'react';
import { DocumentHandlersProps } from '../types';
import { useDocumentManager } from './useDocumentManager';

export const useDocumentHandlers = ({
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
  isEditing,
  setIsEditing,
  editingDocumentId,
  setEditingDocumentId
}: DocumentHandlersProps) => {
  // Use the centralized document manager for all document handling logic
  const documentManager = useDocumentManager({
    initialDocuments: documentFiles
  });

  // Return only the handlers we need, using the existing state from props
  return {
    fileError: documentManager.fileError,
    handleFileSelected: useCallback((files: File[]) => {
      documentManager.handleFileSelected(files);
      // Update the parent state with the selected file
      if (files.length > 0 && !documentManager.fileError) {
        setSelectedFile(files[0]);
        setErrors(prev => ({ ...prev, selectedFile: false }));
      }
    }, [documentManager, setSelectedFile, setErrors]),
    handleFileClear: useCallback(() => {
      setSelectedFile(null);
      setErrors(prev => ({ ...prev, selectedFile: false }));
    }, [setSelectedFile, setErrors]),
    handleDateChange: useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
      if (field === 'issueDate') {
        setIssueDate(date ? date.toISOString().split('T')[0] : '');
        setErrors(prev => ({ ...prev, issueDate: false }));
      } else {
        setExpiryDate(date ? date.toISOString().split('T')[0] : '');
      }
    }, [setIssueDate, setExpiryDate, setErrors]),
    handleDocumentTypeChange: useCallback((type: string) => {
      setDocumentType(type);
      setErrors(prev => ({ ...prev, documentType: false }));
    }, [setDocumentType, setErrors]),
    handleAddDocument: documentManager.handleAddDocument,
    handleEditDocument: documentManager.handleEditDocument,
    handleUpdateDocument: documentManager.handleUpdateDocument,
    handleCancelEdit: documentManager.handleCancelEdit,
    handleRemoveDocument: documentManager.handleRemoveDocument,
    resetForm: documentManager.resetForm
  };
};
