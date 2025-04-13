
import { Document } from "@/types/documents";

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
