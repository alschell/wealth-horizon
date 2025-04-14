
import React, { createContext, useContext, useState, useCallback } from 'react';
import { DocumentFileWithMetadata } from '@/components/onboarding/legal/types';
import { useErrorHandler } from '@/utils/errorHandling/useErrorHandler';
import { useErrorBoundary } from '@/utils/errorHandling/useErrorBoundary';

interface DocumentContextType {
  documents: DocumentFileWithMetadata[];
  isLoading: boolean;
  error: Error | null;
  addDocument: (document: DocumentFileWithMetadata) => void;
  updateDocument: (id: string, document: Partial<DocumentFileWithMetadata>) => void;
  removeDocument: (id: string) => void;
  clearDocuments: () => void;
  saveDocuments: (callback?: (documents: DocumentFileWithMetadata[]) => Promise<void>) => Promise<boolean>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export interface DocumentProviderProps {
  children: React.ReactNode;
  initialDocuments?: DocumentFileWithMetadata[];
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ 
  children, 
  initialDocuments = [] 
}) => {
  const [documents, setDocuments] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { handleError } = useErrorHandler();
  
  const { ErrorBoundaryWrapper } = useErrorBoundary({
    componentName: 'DocumentProvider',
    message: 'There was an error with the document management system.',
    onError: (error) => {
      setError(error);
      handleError(error, { toastTitle: 'Document Error' });
    }
  });

  const addDocument = useCallback((document: DocumentFileWithMetadata) => {
    setDocuments(prev => [...prev, document]);
  }, []);

  const updateDocument = useCallback((id: string, documentUpdate: Partial<DocumentFileWithMetadata>) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, ...documentUpdate } : doc
    ));
  }, []);

  const removeDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  }, []);

  const clearDocuments = useCallback(() => {
    setDocuments([]);
  }, []);

  const saveDocuments = useCallback(async (callback?: (documents: DocumentFileWithMetadata[]) => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (callback) {
        await callback(documents);
      }
      setIsLoading(false);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to save documents');
      setError(error);
      handleError(error, { 
        toastTitle: 'Save Error',
        fallbackMessage: 'Failed to save documents'
      });
      setIsLoading(false);
      return false;
    }
  }, [documents, handleError]);

  const value = {
    documents,
    isLoading,
    error,
    addDocument,
    updateDocument,
    removeDocument,
    clearDocuments,
    saveDocuments
  };

  return (
    <ErrorBoundaryWrapper>
      <DocumentContext.Provider value={value}>
        {children}
      </DocumentContext.Provider>
    </ErrorBoundaryWrapper>
  );
};

export const useDocumentManager = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocumentManager must be used within a DocumentProvider');
  }
  return context;
};
