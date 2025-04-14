
import { useCallback } from 'react';

interface UseDocumentFieldHandlersProps {
  setDocumentType: (type: string) => void;
  setIssueDate: (date: string) => void;
  setExpiryDate: (date: string) => void;
  setErrors: (errors: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
}

/**
 * Hook for handling document field changes (type, dates)
 */
export function useDocumentFieldHandlers({
  setDocumentType,
  setIssueDate,
  setExpiryDate,
  setErrors
}: UseDocumentFieldHandlersProps) {
  /**
   * Handle date changes
   */
  const handleDateChange = useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (field === 'issueDate') {
      setIssueDate(date ? date.toISOString().split('T')[0] : '');
      setErrors((prev: Record<string, boolean>) => ({ ...prev, issueDate: false }));
    } else {
      setExpiryDate(date ? date.toISOString().split('T')[0] : '');
    }
  }, [setIssueDate, setExpiryDate, setErrors]);
  
  /**
   * Handle document type selection
   */
  const handleDocumentTypeChange = useCallback((type: string) => {
    setDocumentType(type);
    setErrors((prev: Record<string, boolean>) => ({ ...prev, documentType: false }));
  }, [setDocumentType, setErrors]);

  return {
    handleDateChange,
    handleDocumentTypeChange
  };
}
