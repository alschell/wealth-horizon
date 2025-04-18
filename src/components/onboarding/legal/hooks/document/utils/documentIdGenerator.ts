
export const generateDocumentId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `doc-${timestamp}-${random}`;
};
