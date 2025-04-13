
import { useDocumentState } from './hooks/useDocumentState';
import { useDocumentHandlers } from './hooks/useDocumentHandlers';
import { useFormSubmission } from './hooks/useFormSubmission';
import { FormSubmissionProps } from './types';

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
    fileError,
    handleFileSelected,
    handleFileClear,
    handleDateChange,
    handleDocumentTypeChange,
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleCancelEdit,
    handleRemoveDocument
  } = useDocumentHandlers({
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
  });

  const submissionProps: FormSubmissionProps = {
    documentFiles,
    documentType,
    issueDate,
    expiryDate
  };

  const {
    handleSubmit,
    handleBack
  } = useFormSubmission(submissionProps);

  return {
    // State
    documentType,
    issueDate,
    expiryDate,
    selectedFile,
    documentFiles,
    errors,
    fileError,
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
    handleUpdateDocument,
    handleCancelEdit
  };
};
