
/**
 * Utilities for handling document IDs
 */
export const documentIdUtils = {
  /**
   * Generates a unique document ID
   */
  generateId: (): string => {
    return `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Validates if a string is a valid document ID
   */
  isValidId: (id: string): boolean => {
    return id.startsWith('doc-') && id.length >= 20;
  },

  /**
   * Extracts timestamp from document ID if present
   */
  getTimestampFromId: (id: string): number | null => {
    const matches = id.match(/doc-(\d+)-/);
    return matches ? parseInt(matches[1], 10) : null;
  }
};
