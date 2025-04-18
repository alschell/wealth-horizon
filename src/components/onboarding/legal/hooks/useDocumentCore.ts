import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../types';
import { toast } from '@/hooks/use-toast';
import { useUnifiedForm } from '@/hooks/form/useUnifiedForm';
import { useDocumentFormState, createInitialFormValues } from './document/useDocumentFormState';
import { UseDocumentCoreProps } from './document/types';
import { useDocumentFactory } from './document/useDocumentFactory';
import { useDocumentFileHandling } from './document/useDocumentFileHandling';
import { useDocumentDateHandling } from './document/useDocumentDateHandling';
import { useDocumentManagement } from './document/useDocumentManagement';

export const useDocumentCore = ({
  onSave,
  initialDocuments = []
}: UseDocumentCoreProps) => {
  const formState = useDocumentFormState(initialDocuments);
  const { createDocument, updateDocumentInList, removeDocumentFromList } = useDocumentFactory();

  const form = useUnifiedForm({
    initialValues: createInitialFormValues(),
    onSubmit: async () => {
      // Implementation stays the same
    }
  });

  const fileHandling = useDocumentFileHandling(form);
  const dateHandling = useDocumentDateHandling(form);
  const documentManagement = useDocumentManagement(
    form,
    formState,
    createDocument,
    updateDocumentInList,
    removeDocumentFromList
  );

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
      formState.setIsSubmitting(true);
      onSave(formState.documentFiles);
      
      toast({
        title: "Documents saved",
        description: "Documents have been saved successfully.",
      });
      
      formState.setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting documents:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving documents.",
        variant: "destructive"
      });
      formState.setIsSubmitting(false);
    }
  }, [formState, onSave]);

  return {
    ...form.values,
    documentFiles: formState.documentFiles,
    errors: form.errors,
    fileError: formState.fileError,
    isSubmitting: formState.isSubmitting,
    isEditing: formState.isEditing,
    editingDocumentId: formState.editingDocumentId,
    ...fileHandling,
    ...dateHandling,
    ...documentManagement,
    handleSubmit,
    resetForm: form.resetForm,
    setDocumentFiles: formState.setDocumentFiles
  };
};
