
import { useCallback } from 'react';

export function useDocumentId() {
  const generateDocumentId = useCallback(() => {
    return `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  return {
    generateDocumentId
  };
}
