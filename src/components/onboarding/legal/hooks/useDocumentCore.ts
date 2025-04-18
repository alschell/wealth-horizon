import { useCallback, useState } from 'react';
import { DocumentFileWithMetadata } from '../types';
import { toast } from '@/components/ui/use-toast';
import { useUnifiedForm } from '@/hooks/form/useUnifiedForm';
import { useDocumentValidationUtil } from './document/useDocumentValidationUtil';
import { useDocumentFormState, createInitialFormValues } from './document/useDocumentFormState';
import { UseDocumentCoreProps, DocumentFormValues } from './document/types';
import { useDocumentFactory } from './document/useDocumentFactory';

export const useDocumentCore = ({
  onSave,
  initialDocuments = []
}: UseDocumentCoreProps) => {
  const formState = useDocumentFormState(initialDocuments);
  const { validateFile } = useDocumentValidationUtil();
  const { createDocument, updateDocumentInList, removeDocumentFromList } = useDocumentFactory();

  const form = useUnifiedForm<DocumentFormValues>({
    initialValues: createInitialFormValues(),
    onSubmit: async () => {
      // Implementation stays the same
    }
  });

  const [fileError, setFileError] = useState<string | null>(null);
  
  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);

  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const error = validateFile(file);
    
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
  }, [form, validateFile]);

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
    const errors = form.validateForm();
    
    if (Object.keys(errors).length > 0 || !values.selectedFile) {
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
    formState.setDocumentFiles(prev => [...prev, newDocument]);
    
    // Reset form
    form.resetForm();
    
    toast({
      title: "Document added",
      description: "The document has been added successfully.",
    });
  }, [form, createDocument, formState]);
  
  // Edit an existing document
  const handleEditDocument = useCallback((documentId: string) => {
    const documentToEdit = formState.documentFiles.find(doc => doc.id === documentId);
    
    if (documentToEdit) {
      form.setFieldValue('documentType', documentToEdit.documentType);
      form.setFieldValue('issueDate', documentToEdit.issueDate);
      form.setFieldValue('expiryDate', documentToEdit.expiryDate || '');
      form.setFieldValue('selectedFile', documentToEdit.file);
      
      setIsEditing(true);
      setEditingDocumentId(documentId);
    }
  }, [formState.documentFiles, form]);
  
  // Update an existing document
  const handleUpdateDocument = useCallback(() => {
    if (!editingDocumentId) return;
    
    const { values } = form;
    const errors = form.validateForm();
    
    if (Object.keys(errors).length > 0 || !values.selectedFile) {
      return;
    }
    
    // Update document
    formState.setDocumentFiles(prev => 
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
  }, [editingDocumentId, form, updateDocumentInList, formState]);
  
  // Cancel edit operation
  const handleCancelEdit = useCallback(() => {
    form.resetForm();
    setIsEditing(false);
    setEditingDocumentId(null);
  }, [form]);
  
  // Remove a document
  const handleRemoveDocument = useCallback((documentId: string) => {
    formState.setDocumentFiles(prev => removeDocumentFromList(prev, documentId));
    
    toast({
      title: "Document removed",
      description: "The document has been removed successfully.",
    });
  }, [removeDocumentFromList, formState]);
  
  // Submit all documents
  const handleSubmit = useCallback(() => {
    if (formState.documentFiles.length === 0) {
      toast({
        title: "No documents",
        description: "Please add at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      onSave(formState.documentFiles);
      
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
  }, [formState.documentFiles, onSave]);

  return {
    ...form.formState.values,
    documentFiles: formState.documentFiles,
    errors: form.formState.errors,
    fileError: fileError,
    isSubmitting: form.formState.isSubmitting,
    isEditing: isEditing,
    editingDocumentId: editingDocumentId,
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
    resetForm: form.resetForm,
    setDocumentFiles: formState.setDocumentFiles
  };
};
