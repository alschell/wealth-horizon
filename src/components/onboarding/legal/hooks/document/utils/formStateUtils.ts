
import { FormState, FormFieldName } from '../types/formTypes';
import { DocumentFileWithMetadata } from '../../../types';

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
  updateField: <K extends FormFieldName>(
    state: FormState,
    field: K,
    value: FormState[K]
  ): FormState => {
    return {
      ...state,
      [field]: value
    };
  },

  /**
   * Updates multiple fields at once
   */
  updateFields: (
    state: FormState,
    updates: Partial<FormState>
  ): FormState => {
    return {
      ...state,
      ...updates
    };
  }
};

