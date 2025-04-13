
import { useState, useCallback } from 'react';
import { DocumentFileWithMetadata, DocumentHandlersProps } from '../types';
import { 
  validateFile, 
  showToast, 
  validateDocumentFields, 
  createDocument, 
  updateDocumentInList 
} from './documentHandlerUtils';

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
  const [fileError, setFileError] = useState<string | null>(null);

  /**
   * Handles file selection for document upload
   */
  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0]; // Only use the first file since we're not using multiple
    if (!validateFile(file, setFileError)) return;
    
    setSelectedFile(file);
    setErrors(prev => ({ ...prev, selectedFile: false }));
    
    showToast("File uploaded", "Document has been successfully uploaded.");
  }, [setSelectedFile, setErrors]);

  /**
   * Clears the selected file
   */
  const handleFileClear = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
  }, [setSelectedFile]);

  /**
   * Handles date changes for document dates
   */
  const handleDateChange = useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (field === 'issueDate') {
      setIssueDate(date ? date.toISOString().split('T')[0] : '');
      setErrors(prev => ({ ...prev, issueDate: false }));
    } else {
      setExpiryDate(date ? date.toISOString().split('T')[0] : '');
    }
  }, [setIssueDate, setExpiryDate, setErrors]);

  /**
   * Handles document type selection
   */
  const handleDocumentTypeChange = useCallback((type: string) => {
    setDocumentType(type);
    setErrors(prev => ({ ...prev, documentType: false }));
  }, [setDocumentType, setErrors]);

  /**
   * Adds a new document to the list
   */
  const handleAddDocument = useCallback(() => {
    // Validate required fields
    const newErrors = validateDocumentFields(documentType, issueDate, selectedFile);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create new document with metadata
    const newDocument = createDocument(
      documentType,
      issueDate,
      expiryDate,
      selectedFile as File
    );
    
    // Add to list
    setDocumentFiles(prev => [...prev, newDocument]);
    
    // Reset form
    resetForm();
    
    showToast("Document added", "The document has been added successfully.");
  }, [documentType, issueDate, expiryDate, selectedFile, setDocumentFiles, setErrors]);

  /**
   * Starts editing an existing document
   */
  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = documentFiles.find(doc => doc.id === documentId);
    
    if (documentToEdit) {
      setDocumentType(documentToEdit.documentType);
      setIssueDate(documentToEdit.issueDate);
      setExpiryDate(documentToEdit.expiryDate || '');
      setSelectedFile(documentToEdit.file);
      setIsEditing(true);
      setEditingDocumentId(documentId);
    }
  }, [documentFiles, setDocumentType, setIssueDate, setExpiryDate, setSelectedFile, setIsEditing, setEditingDocumentId]);

  /**
   * Updates an existing document
   */
  const handleUpdateDocument = useCallback(() => {
    if (!editingDocumentId) return;
    
    // Validate required fields
    const newErrors = validateDocumentFields(documentType, issueDate, selectedFile);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update document
    setDocumentFiles(prev => 
      updateDocumentInList(
        prev,
        editingDocumentId,
        documentType,
        issueDate,
        expiryDate,
        selectedFile as File
      )
    );
    
    // Reset form and editing state
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
    
    showToast("Document updated", "The document has been updated successfully.");
  }, [editingDocumentId, documentType, issueDate, expiryDate, selectedFile, setDocumentFiles, setErrors, setIsEditing, setEditingDocumentId]);

  /**
   * Cancels the current edit operation
   */
  const handleCancelEdit = useCallback(() => {
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
  }, [setIsEditing, setEditingDocumentId]);

  /**
   * Removes a document from the list
   */
  const handleRemoveDocument = useCallback((documentId: string) => {
    setDocumentFiles(prev => prev.filter(doc => doc.id !== documentId));
    showToast("Document removed", "The document has been removed successfully.");
  }, [setDocumentFiles]);

  /**
   * Resets the form to its initial state
   */
  const resetForm = useCallback(() => {
    setDocumentType('');
    setIssueDate('');
    setExpiryDate('');
    setSelectedFile(null);
    setFileError(null);
    setErrors({});
  }, [setDocumentType, setIssueDate, setExpiryDate, setSelectedFile, setErrors]);

  return {
    fileError,
    handleFileSelected,
    handleFileClear,
    handleDateChange,
    handleDocumentTypeChange,
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleCancelEdit,
    handleRemoveDocument,
    resetForm
  };
};
