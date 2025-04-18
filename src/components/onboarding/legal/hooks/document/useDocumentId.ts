
import { useCallback } from 'react';
import { generateDocumentId } from './utils/documentIdGenerator';

export function useDocumentId() {
  const generateNewDocumentId = useCallback(() => {
    return generateDocumentId();
  }, []);

  return {
    generateDocumentId: generateNewDocumentId
  };
}
