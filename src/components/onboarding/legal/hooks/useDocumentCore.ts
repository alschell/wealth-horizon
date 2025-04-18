
import { useState, useCallback } from 'react';
import { DocumentFileWithMetadata } from '../types';
import { toast } from '@/components/ui/use-toast';
import { useUnifiedForm } from '@/hooks/form/useUnifiedForm';
import DocumentValidationUtil from './document/useDocumentValidationUtil';
import { useDocumentFactory } from './document/useDocumentFactory';

export interface UseDocumentCoreProps {
  onSave: (documents: DocumentFileWithMetadata[]) => void;
  initialDocuments?: DocumentFileWithMetadata[];
}

export interface DocumentFormValues {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
}

export const useDocumentCore = ({
  onSave,
  initialDocuments = []
}: UseDocumentCoreProps) => {
  // State for the list of documents
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  
  // State for file validation errors
  const [fileError, setFileError] = useState<string | null>(null);
  
  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  
  // Get document factory functions
  const { createDocument, updateDocumentInList, removeDocumentFromList } = useDocumentFactory();
  
  // Use unified form for document form
  const form = useUnifiedForm<DocumentFormValues>({
    initialValues: {
      documentType: '',
      issueDate: '',
      expiryDate: '',
      selectedFile: null
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      
      if (!values.documentType) errors.documentType = 'Document type is required';
      if (!values.issueDate) errors.issueDate = 'Issue date is required';
      if (!values.selectedFile) errors.selectedFile = 'A document file is required';
      
      return errors;
    },
    onSubmit: async (values) => {
      // Submit logic here
    }
  });

  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const error = DocumentValidationUtil.validateFile(file);
    
    if (error) {
      setFileError(error);
      return;
    }
    
    form.setFieldValue('selectedFile', file);
    setFileError(null);
    
    toast({
      title: "File uploaded",
      description: "Document has been successfully uploaded.",
    });
  }, [form]);

  // Update other handlers to use form.setFieldValue instead of setValue
  const handleDateChange = useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (date) {
      form.setFieldValue(field, date.toISOString().split('T')[0]);
    } else {
      form.setFieldValue(field, '');
    }
  }, [form]);

  const handleDocumentTypeChange = useCallback((type: string) => {
    form.setFieldValue('documentType', type);
  }, [form]);

  // Add a new document
  const handleAddDocument = useCallback(() => {
    const { values } = form;
    const { isValid, errors } = form.validateForm();
    
    if (!isValid || !values.selectedFile) {
      return;
    }
    
    // Create new document with metadata
    const newDocument = createDocument(
      values.documentType,
      values.issueDate,
      values.expiryDate,
      values.selectedFile
    );
    
    // Add to list
    setDocumentFiles(prev => [...prev, newDocument]);
    
    // Reset form
    form.resetForm();
    
    toast({
      title: "Document added",
      description: "The document has been added successfully.",
    });
  }, [form, createDocument]);
  
  // Edit an existing document
  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = documentFiles.find(doc => doc.id === documentId);
    
    if (documentToEdit) {
      form.setFieldValues({
        documentType: documentToEdit.documentType,
        issueDate: documentToEdit.issueDate,
        expiryDate: documentToEdit.expiryDate || '',
        selectedFile: documentToEdit.file
      });
      
      setIsEditing(true);
      setEditingDocumentId(documentId);
    }
  }, [documentFiles, form]);
  
  // Update an existing document
  const handleUpdateDocument = useCallback(() => {
    if (!editingDocumentId) return;
    
    const { values } = form;
    const { isValid } = form.validateForm();
    
    if (!isValid || !values.selectedFile) {
      return;
    }
    
    // Update document
    setDocumentFiles(prev => 
      updateDocumentInList(
        prev,
        editingDocumentId,
        values.documentType,
        values.issueDate,
        values.expiryDate,
        values.selectedFile
      )
    );
    
    // Reset form and editing state
    form.resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
    
    toast({
      title: "Document updated",
      description: "The document has been updated successfully.",
    });
  }, [editingDocumentId, form, updateDocumentInList]);
  
  // Cancel edit operation
  const handleCancelEdit = useCallback(() => {
    form.resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
  }, [form]);
  
  // Remove a document
  const handleRemoveDocument = useCallback((documentId: string) => {
    setDocumentFiles(prev => removeDocumentFromList(prev, documentId));
    
    toast({
      title: "Document removed",
      description: "The document has been removed successfully.",
    });
  }, [removeDocumentFromList]);
  
  // Submit all documents
  const handleSubmit = useCallback(() => {
    if (documentFiles.length === 0) {
      toast({
        title: "No documents",
        description: "Please add at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      onSave(documentFiles);
      
      toast({
        title: "Documents saved",
        description: "Documents have been saved successfully.",
      });
    } catch (error) {
      console.error("Error submitting documents:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving documents.",
        variant: "destructive"
      });
    }
  }, [documentFiles, onSave]);

  return {
    // Form values from unified form
    documentType: form.values.documentType,
    issueDate: form.values.issueDate,
    expiryDate: form.values.expiryDate,
    selectedFile: form.values.selectedFile,
    
    // Lists and errors
    documentFiles,
    errors: form.errors,
    fileError,
    
    // State flags
    isSubmitting: form.isSubmitting,
    isEditing,
    editingDocumentId,
    
    // Event handlers
    handleFileSelected,
    handleFileClear: () => form.setFieldValue('selectedFile', null),
    handleDateChange,
    handleDocumentTypeChange,
    handleAddDocument,
    handleEditDocument,
    handleUpdateDocument,
    handleCancelEdit,
    handleRemoveDocument,
    handleSubmit,
    
    // Form methods
    resetForm: form.resetForm,
    setDocumentFiles
  };
};
