
import { useCallback } from 'react';

export const useDocumentId = () => {
  const generateDocumentId = useCallback(() => {
    return `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  return {
    generateDocumentId
  };
};
