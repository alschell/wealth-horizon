import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { DocumentFileWithMetadata } from './types';
import { useDocumentFactory } from './useDocumentFactory';
import { useDocumentFieldValidation } from './useDocumentFieldValidation';

export const useDocumentManagement = (
  form: any,
  formState: any,
  createDocument: ReturnType<typeof useDocumentFactory>['createDocument'],
  updateDocumentInList: ReturnType<typeof useDocumentFactory>['updateDocumentInList'],
  removeDocumentFromList: ReturnType<typeof useDocumentFactory>['removeDocumentFromList']
) => {
  const { validateFields, hasErrors } = useDocumentFieldValidation();

  const handleAddDocument = useCallback(() => {
    const { values } = form;
    const errors = validateFields(values.documentType, values.issueDate, values.selectedFile);
    
    if (hasErrors(errors) || !values.selectedFile) return;
    
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
  }, [form, createDocument, formState, validateFields, hasErrors]);

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
