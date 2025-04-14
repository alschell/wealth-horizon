
import { useCallback } from 'react';
import { DocumentFileWithMetadata } from '../types';
import { useDocumentFormState } from './document/useDocumentFormState';
import { useDocumentEventHandlers } from './document/useDocumentEventHandlers';

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
  // Use form state hook
  const formState = useDocumentFormState(initialDocuments);
  
  // Use event handlers hook
  const eventHandlers = useDocumentEventHandlers({
    ...formState,
    onSave
  });
  
  // Set submission state only when explicitly submitting
  const handleSubmit = useCallback(async () => {
    formState.setIsSubmitting(true);
    
    try {
      await eventHandlers.handleSubmit();
    } finally {
      formState.setIsSubmitting(false);
    }
  }, [eventHandlers, formState]);
  
  return {
    ...formState,
    ...eventHandlers,
    handleSubmit
  };
}
