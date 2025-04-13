
export interface DocumentFileWithMetadata {
  id: string;
  documentType: string;
  issueDate: string;
  expiryDate?: string;
  file: File;
  documentNumber?: string;
}

export interface LegalDocumentFormState {
  documents: DocumentFileWithMetadata[];
  isSubmitting: boolean;
  currentStep: number;
}

// Add this Document interface that was previously imported
export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  dateUploaded: string;
}
