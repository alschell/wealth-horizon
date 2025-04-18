
import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { DocumentValidationUtil } from './useDocumentValidationUtil';
import { DocumentFormValues } from './types';

export const useDocumentFileHandling = (form: any) => {
  const { validateFile } = DocumentValidationUtil;

  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const error = validateFile(file);
    
    if (error) {
      form.setFieldError('selectedFile', error);
      return;
    }
    
    form.setFieldValue('selectedFile', file);
    form.clearFieldError('selectedFile');
    
    toast({
      title: "File uploaded",
      description: "Document has been successfully uploaded.",
    });
  }, [form, validateFile]);

  const handleFileClear = useCallback(() => {
    form.setFieldValue('selectedFile', null);
    form.clearFieldError('selectedFile');
  }, [form]);

  return {
    handleFileSelected,
    handleFileClear
  };
};

