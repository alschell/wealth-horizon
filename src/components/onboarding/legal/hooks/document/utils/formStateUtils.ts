
import { DocumentFileWithMetadata } from '../../../types';

export const formStateUtils = {
  /**
   * Creates initial form state
   */
  createInitialState: () => ({
    documentType: '',
    issueDate: '',
    expiryDate: '',
    selectedFile: null as File | null,
    documentFiles: [] as DocumentFileWithMetadata[],
    errors: {} as Record<string, boolean>,
    fileError: null as string | null,
    isEditing: false,
    editingDocumentId: null as string | null,
    isSubmitting: false
  }),

  /**
   * Resets form state to initial values
   */
  resetFormState: (setState: (value: any) => void) => {
    setState(formStateUtils.createInitialState());
  }
};
