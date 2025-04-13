
import { useDocumentState } from './hooks/useDocumentState';
import { useDocumentHandlers } from './hooks/useDocumentHandlers';
import { useFormSubmission } from './hooks/useFormSubmission';
import { DocumentFileWithMetadata } from './types';

export interface DocumentFileWithMetadata {
  id: string;
  file: File;
  documentType: string;
  issueDate: string;
  expiryDate?: string;
}

export const useLegalDocumentsForm = () => {
  const {
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
    isSubmitting,
    setIsSubmitting,
    isEditing,
    setIsEditing,
    editingDocumentId,
    setEditingDocumentId
  } = useDocumentState();

  const {
    handleDocumentTypeChange,
    handleDateChange,
    handleFileSelected,
    handleFileClear,
    handleAddDocument,
    handleEditDocument,
    handleCancelEdit,
    handleRemoveDocument
  } = useDocumentHandlers(
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
  );

  const {
    handleSubmit,
    handleBack
  } = useFormSubmission(documentFiles, documentType, issueDate, expiryDate);

  return {
    // State
    documentType,
    issueDate,
    expiryDate,
    selectedFile,
    documentFiles,
    errors,
    isSubmitting,
    isEditing,
    
    // Handlers
    handleDocumentTypeChange,
    handleDateChange,
    handleFileSelected,
    handleFileClear,
    handleAddDocument,
    handleSubmit,
    handleBack,
    handleRemoveDocument,
    handleEditDocument,
    handleCancelEdit
  };
};
