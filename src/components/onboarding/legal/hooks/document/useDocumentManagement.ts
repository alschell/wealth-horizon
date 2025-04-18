
import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useDocumentFactory } from './useDocumentFactory';
import { DocumentFileWithMetadata } from '../../types';

export const useDocumentManagement = (
  form: any,
  formState: any,
  createDocument: ReturnType<typeof useDocumentFactory>['createDocument'],
  updateDocumentInList: ReturnType<typeof useDocumentFactory>['updateDocumentInList'],
  removeDocumentFromList: ReturnType<typeof useDocumentFactory>['removeDocumentFromList']
) => {
  const handleAddDocument = useCallback(() => {
    const { values } = form;
    const errors = form.validateForm();
    
    if (Object.keys(errors).length > 0 || !values.selectedFile) return;
    
    const newDocument = createDocument(
      values.documentType,
      values.issueDate,
      values.expiryDate,
      values.selectedFile
    );
    
    formState.setDocumentFiles(prev => [...prev, newDocument]);
    form.resetForm();
    
    toast({
      title: "Document added",
      description: "The document has been added successfully.",
    });
  }, [form, createDocument, formState]);

  const handleUpdateDocument = useCallback(() => {
    if (!formState.editingDocumentId) return;
    
    const { values } = form;
    const errors = form.validateForm();
    
    if (Object.keys(errors).length > 0 || !values.selectedFile) return;
    
    formState.setDocumentFiles(prev => 
      updateDocumentInList(
        prev,
        formState.editingDocumentId,
        values.documentType,
        values.issueDate,
        values.expiryDate,
        values.selectedFile
      )
    );
    
    form.resetForm();
    formState.setIsEditing(false);
    formState.setEditingDocumentId(null);
    
    toast({
      title: "Document updated",
      description: "The document has been updated successfully.",
    });
  }, [formState, form, updateDocumentInList]);

  return {
    handleAddDocument,
    handleUpdateDocument
  };
};

