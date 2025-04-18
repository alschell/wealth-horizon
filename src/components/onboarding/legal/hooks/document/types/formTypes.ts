
import { DocumentFileWithMetadata } from '../../../types';

export interface DocumentValidationState {
  errors: Record<string, boolean>;
  fileError: string | null;
}

export interface DocumentEditingState {
  isEditing: boolean;
  editingDocumentId: string | null;
  isSubmitting: boolean;
}

export interface DocumentFormFields {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
  documentFiles: DocumentFileWithMetadata[];
}

export type FormState = DocumentFormFields & DocumentValidationState & DocumentEditingState;

export type FormFieldName = keyof DocumentFormFields;

