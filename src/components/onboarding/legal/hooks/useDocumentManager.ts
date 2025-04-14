
import { useState, useCallback } from 'react';
import { DocumentFileWithMetadata } from '../types';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Validates a file for document upload
 */
const validateFile = (file: File): string | null => {
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`;
  }

  // Check file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return `File type ${file.type} is not supported. Please upload PDF or image files.`;
  }

  return null;
};

/**
 * Validates required document fields and returns errors
 */
const validateDocumentFields = (
  documentType: string,
  issueDate: string,
  selectedFile: File | null
): Record<string, boolean> => {
  const errors: Record<string, boolean> = {};
  
  if (!documentType) errors.documentType = true;
  if (!issueDate) errors.issueDate = true;
  if (!selectedFile) errors.selectedFile = true;
  
  return errors;
};

/**
 * Creates a new document with metadata
 */
const createDocument = (
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
  // Document form state
  const [documentType, setDocumentType] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Document list state
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  
  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  /**
   * Handle file selection
   */
  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0]; // Only use the first file
    const error = validateFile(file);
    
    if (error) {
      setFileError(error);
      return;
    }
    
    setSelectedFile(file);
    setFileError(null);
    setErrors(prev => ({ ...prev, selectedFile: false }));
    
    showSuccess("File uploaded", "Document has been successfully uploaded.");
  }, []);
  
  /**
   * Clear selected file
   */
  const handleFileClear = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
  }, []);
  
  /**
   * Handle date changes
   */
  const handleDateChange = useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (field === 'issueDate') {
      setIssueDate(date ? date.toISOString().split('T')[0] : '');
      setErrors(prev => ({ ...prev, issueDate: false }));
    } else {
      setExpiryDate(date ? date.toISOString().split('T')[0] : '');
    }
  }, []);
  
  /**
   * Handle document type selection
   */
  const handleDocumentTypeChange = useCallback((type: string) => {
    setDocumentType(type);
    setErrors(prev => ({ ...prev, documentType: false }));
  }, []);
  
  /**
   * Add a new document
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
    
    showSuccess("Document added", "The document has been added successfully.");
  }, [documentType, issueDate, expiryDate, selectedFile]);
  
  /**
   * Edit an existing document
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
  }, [documentFiles]);
  
  /**
   * Update an existing document
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
    setDocumentFiles(prev => prev.map(doc => {
      if (doc.id === editingDocumentId) {
        return {
          ...doc,
          file: selectedFile as File,
          documentType,
          issueDate,
          expiryDate
        };
      }
      return doc;
    }));
    
    // Reset form and editing state
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
    
    showSuccess("Document updated", "The document has been updated successfully.");
  }, [editingDocumentId, documentType, issueDate, expiryDate, selectedFile]);
  
  /**
   * Cancel edit operation
   */
  const handleCancelEdit = useCallback(() => {
    resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
  }, []);
  
  /**
   * Remove a document
   */
  const handleRemoveDocument = useCallback((documentId: string) => {
    setDocumentFiles(prev => prev.filter(doc => doc.id !== documentId));
    showSuccess("Document removed", "The document has been removed successfully.");
  }, []);
  
  /**
   * Submit all documents
   */
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      if (documentFiles.length === 0) {
        showError("No documents", "Please add at least one document.");
        setIsSubmitting(false);
        return;
      }
      
      if (onSave) {
        await onSave(documentFiles);
      }
      
      showSuccess("Documents saved", "Documents have been saved successfully.");
    } catch (error) {
      console.error("Error submitting documents:", error);
      showError("Error", "An error occurred while saving documents.");
    } finally {
      setIsSubmitting(false);
    }
  }, [documentFiles, onSave]);
  
  /**
   * Reset the form
   */
  const resetForm = useCallback(() => {
    setDocumentType('');
    setIssueDate('');
    setExpiryDate('');
    setSelectedFile(null);
    setFileError(null);
    setErrors({});
  }, []);
  
  return {
    // Form state
    documentType,
    setDocumentType,
    issueDate,
    setIssueDate,
    expiryDate,
    setExpiryDate,
    selectedFile,
    setSelectedFile,
    
    // Document list state
    documentFiles,
    setDocumentFiles,
    
    // Validation state
    errors,
    setErrors,
    fileError,
    
    // Editing state
    isEditing,
    setIsEditing,
    editingDocumentId,
    setEditingDocumentId,
    
    // Submission state
    isSubmitting,
    
    // Handlers
    handleFileSelected,
    handleFileClear,
    handleDateChange,
    handleDocumentTypeChange,
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleCancelEdit,
    handleRemoveDocument,
    handleSubmit,
    resetForm
  };
}
