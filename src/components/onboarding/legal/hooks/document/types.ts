
export interface DocumentFormValues {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
}

export interface UseDocumentCoreProps {
  onSave?: (documents: DocumentFileWithMetadata[]) => void;
  initialDocuments?: DocumentFileWithMetadata[];
}

export interface DocumentFileWithMetadata {
  id: string;
  file: File;
  documentType: string;
  issueDate: string;
  expiryDate: string;
}

