
import { DocumentFileWithMetadata } from '../../../types';

export interface DocumentFormState {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
  documentFiles: DocumentFileWithMetadata[];
  errors: Record<string, boolean>;
  fileError: string | null;
  isEditing: boolean;
  editingDocumentId: string | null;
  isSubmitting: boolean;
}

export interface DocumentHandlers {
  handleFileSelected: (files: File[]) => void;
  handleFileClear: () => void;
  handleDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  handleDocumentTypeChange: (type: string) => void;
  handleAddDocument: () => void;
  handleEditDocument: (documentId: string) => void;
  handleUpdateDocument: () => void;
  handleRemoveDocument: (documentId: string) => void;
  handleCancelEdit: () => void;
  handleSubmit: () => Promise<void>;
}

export interface DocumentValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
