
export interface DocumentFileWithMetadata {
  id: string;
  file: File;
  documentType: string;
  issueDate: string;
  expiryDate?: string;
}

export interface Document {
  id: string;
  type: string;
  description: string;
  file: File | null;
}
