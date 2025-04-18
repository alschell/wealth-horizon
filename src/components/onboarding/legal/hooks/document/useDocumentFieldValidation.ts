
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from './types';

export const useDocumentFieldValidation = () => {
  const validateFields = useCallback((
    documentType: string,
    issueDate: string,
    selectedFile: File | null
  ): Record<string, boolean> => {
    const errors: Record<string, boolean> = {};

    if (!documentType) errors.documentType = true;
    if (!issueDate) errors.issueDate = true;
    if (!selectedFile) errors.selectedFile = true;

    return errors;
  }, []);

  const hasErrors = useCallback((errors: Record<string, boolean>): boolean => {
    return Object.values(errors).some(Boolean);
  }, []);

  return {
    validateFields,
    hasErrors
  };
};
