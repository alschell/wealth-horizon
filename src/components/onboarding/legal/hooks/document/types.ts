
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
  documentFiles: DocumentFileWithMetadata[];
  fileError: string | null;
  isEditing: boolean;
  editingDocumentId: string | null;
}
