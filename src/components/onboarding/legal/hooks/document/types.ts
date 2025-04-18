
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

// Add the missing DocumentState interface that's being imported
export interface DocumentState {
  // Document data
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
  documentFiles: DocumentFileWithMetadata[];
  
  // Error state
  errors: Record<string, boolean>;
  fileError: string | null;
  
  // UI state
  isEditing: boolean;
  editingDocumentId: string | null;
  isSubmitting: boolean;
  
  // Setters
  setDocumentType: (type: string) => void;
  setIssueDate: (date: string) => void;
  setExpiryDate: (date: string) => void;
  setSelectedFile: (file: File | null) => void;
  setDocumentFiles: React.Dispatch<React.SetStateAction<DocumentFileWithMetadata[]>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setFileError: (error: string | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  setEditingDocumentId: (id: string | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  
  // Actions
  resetForm: () => void;
}
