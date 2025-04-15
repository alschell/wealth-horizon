
/**
 * Represents a document file with associated metadata
 */
export interface DocumentFileWithMetadata {
  id: string;
  file: File;
  documentType: string;
  issueDate: string;
  expiryDate: string;
}

/**
 * Legal documents form state
 */
export interface LegalDocumentsState {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
  documentFiles: DocumentFileWithMetadata[];
  errors: Record<string, boolean>;
  isSubmitting: boolean;
  isEditing: boolean;
  editingDocumentId: string | null;
}

/**
 * Document handlers props type
 */
export interface DocumentHandlersProps {
  documentType: string;
  setDocumentType: (value: string) => void;
  issueDate: string;
  setIssueDate: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  documentFiles: DocumentFileWithMetadata[];
  setDocumentFiles: React.Dispatch<React.SetStateAction<DocumentFileWithMetadata[]>>;
  errors: Record<string, boolean>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  editingDocumentId: string | null;
  setEditingDocumentId: (id: string | null) => void;
}

/**
 * Form submission props type
 */
export interface FormSubmissionProps {
  documentFiles: DocumentFileWithMetadata[];
  documentType: string;
  issueDate: string;
  expiryDate: string;
}
