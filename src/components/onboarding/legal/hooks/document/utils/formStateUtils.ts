
import { DocumentFileWithMetadata } from '../../../types';

export interface FormState {
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

export const formStateUtils = {
  /**
   * Creates initial form state with proper typing
   */
  createInitialState: (): FormState => ({
    documentType: '',
    issueDate: '',
    expiryDate: '',
    selectedFile: null,
    documentFiles: [],
    errors: {},
    fileError: null,
    isEditing: false,
    editingDocumentId: null,
    isSubmitting: false
  }),

  /**
   * Resets form state to initial values safely
   */
  resetFormState: (setState: (value: FormState) => void): void => {
    setState(formStateUtils.createInitialState());
  },

  /**
   * Updates a single field in the form state
   */
  updateField: <K extends keyof FormState>(
    state: FormState,
    field: K,
    value: FormState[K]
  ): FormState => {
    return {
      ...state,
      [field]: value
    };
  }
};
