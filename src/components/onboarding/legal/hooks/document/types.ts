
import { DocumentFileWithMetadata } from '../../types';

export interface UseDocumentCoreProps {
  onSave: (documents: DocumentFileWithMetadata[]) => void;
  initialDocuments?: DocumentFileWithMetadata[];
}

export interface DocumentFormValues {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
}

export interface DocumentState {
  // Document data fields
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
  
  // Setter functions
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
  
  // Form actions
  resetForm: () => void;
}
