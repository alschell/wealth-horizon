
import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { DocumentFileWithMetadata } from '@/components/onboarding/legal/types';

// Define the state interface
interface DocumentState {
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

// Define the available actions
type DocumentAction =
  | { type: 'SET_DOCUMENT_TYPE'; payload: string }
  | { type: 'SET_ISSUE_DATE'; payload: string }
  | { type: 'SET_EXPIRY_DATE'; payload: string }
  | { type: 'SET_SELECTED_FILE'; payload: File | null }
  | { type: 'SET_FILE_ERROR'; payload: string | null }
  | { type: 'SET_ERRORS'; payload: Record<string, boolean> }
  | { type: 'ADD_DOCUMENT'; payload: DocumentFileWithMetadata }
  | { type: 'UPDATE_DOCUMENT'; payload: { id: string; document: DocumentFileWithMetadata } }
  | { type: 'REMOVE_DOCUMENT'; payload: string }
  | { type: 'SET_EDITING'; payload: { isEditing: boolean; documentId: string | null } }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM' };

// Define the context value type
interface DocumentContextValue {
  state: DocumentState;
  dispatch: React.Dispatch<DocumentAction>;
  setDocumentType: (type: string) => void;
  setIssueDate: (date: string) => void;
  setExpiryDate: (date: string) => void;
  setSelectedFile: (file: File | null) => void;
  setFileError: (error: string | null) => void;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  addDocument: (document: DocumentFileWithMetadata) => void;
  updateDocument: (id: string, document: DocumentFileWithMetadata) => void;
  removeDocument: (id: string) => void;
  startEditing: (documentId: string) => void;
  cancelEditing: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

// Create the context
const DocumentContext = createContext<DocumentContextValue | undefined>(undefined);

// Initial state
const initialState: DocumentState = {
  documentType: '',
  issueDate: '',
  expiryDate: '',
  selectedFile: null,
  documentFiles: [],
  errors: {},
  fileError: null,
  isEditing: false,
  editingDocumentId: null,
  isSubmitting: false,
};

// Reducer function
function documentReducer(state: DocumentState, action: DocumentAction): DocumentState {
  switch (action.type) {
    case 'SET_DOCUMENT_TYPE':
      return { ...state, documentType: action.payload };
    case 'SET_ISSUE_DATE':
      return { ...state, issueDate: action.payload };
    case 'SET_EXPIRY_DATE':
      return { ...state, expiryDate: action.payload };
    case 'SET_SELECTED_FILE':
      return { ...state, selectedFile: action.payload };
    case 'SET_FILE_ERROR':
      return { ...state, fileError: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documentFiles: [...state.documentFiles, action.payload],
        documentType: '',
        issueDate: '',
        expiryDate: '',
        selectedFile: null,
      };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documentFiles: state.documentFiles.map(doc => 
          doc.id === action.payload.id ? action.payload.document : doc
        ),
        documentType: '',
        issueDate: '',
        expiryDate: '',
        selectedFile: null,
        isEditing: false,
        editingDocumentId: null,
      };
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        documentFiles: state.documentFiles.filter(doc => doc.id !== action.payload),
      };
    case 'SET_EDITING':
      return {
        ...state,
        isEditing: action.payload.isEditing,
        editingDocumentId: action.payload.documentId,
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'RESET_FORM':
      return {
        ...state,
        documentType: '',
        issueDate: '',
        expiryDate: '',
        selectedFile: null,
        errors: {},
        fileError: null,
        isEditing: false,
        editingDocumentId: null,
      };
    default:
      return state;
  }
}

// Provider component
export function DocumentProvider({ children, initialDocuments = [] }: { children: ReactNode, initialDocuments?: DocumentFileWithMetadata[] }) {
  const [state, dispatch] = useReducer(documentReducer, {
    ...initialState,
    documentFiles: initialDocuments,
  });

  // Action creators
  const setDocumentType = useCallback((type: string) => {
    dispatch({ type: 'SET_DOCUMENT_TYPE', payload: type });
  }, []);

  const setIssueDate = useCallback((date: string) => {
    dispatch({ type: 'SET_ISSUE_DATE', payload: date });
  }, []);

  const setExpiryDate = useCallback((date: string) => {
    dispatch({ type: 'SET_EXPIRY_DATE', payload: date });
  }, []);

  const setSelectedFile = useCallback((file: File | null) => {
    dispatch({ type: 'SET_SELECTED_FILE', payload: file });
  }, []);

  const setFileError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_FILE_ERROR', payload: error });
  }, []);

  const setErrors = useCallback((
    errorAction: React.SetStateAction<Record<string, boolean>>
  ) => {
    const newErrors = typeof errorAction === 'function'
      ? errorAction(state.errors)
      : errorAction;
    
    dispatch({ type: 'SET_ERRORS', payload: newErrors });
  }, [state.errors]);

  const addDocument = useCallback((document: DocumentFileWithMetadata) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: document });
  }, []);

  const updateDocument = useCallback((id: string, document: DocumentFileWithMetadata) => {
    dispatch({ type: 'UPDATE_DOCUMENT', payload: { id, document } });
  }, []);

  const removeDocument = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_DOCUMENT', payload: id });
  }, []);

  const startEditing = useCallback((documentId: string) => {
    dispatch({ type: 'SET_EDITING', payload: { isEditing: true, documentId } });
  }, []);

  const cancelEditing = useCallback(() => {
    dispatch({ type: 'SET_EDITING', payload: { isEditing: false, documentId: null } });
  }, []);

  const setIsSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const value: DocumentContextValue = {
    state,
    dispatch,
    setDocumentType,
    setIssueDate,
    setExpiryDate,
    setSelectedFile,
    setFileError,
    setErrors,
    addDocument,
    updateDocument,
    removeDocument,
    startEditing,
    cancelEditing,
    setIsSubmitting,
    resetForm,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

// Hook to use the document context
export function useDocumentContext() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
}

// Custom hook for document management
export function useDocumentManager() {
  const {
    state,
    setDocumentType,
    setIssueDate,
    setExpiryDate,
    setSelectedFile,
    setFileError,
    setErrors,
    addDocument,
    updateDocument,
    removeDocument,
    startEditing,
    cancelEditing,
    setIsSubmitting,
    resetForm,
  } = useDocumentContext();

  return {
    // State
    documentType: state.documentType,
    issueDate: state.issueDate,
    expiryDate: state.expiryDate,
    selectedFile: state.selectedFile,
    documentFiles: state.documentFiles,
    errors: state.errors,
    fileError: state.fileError,
    isEditing: state.isEditing,
    editingDocumentId: state.editingDocumentId,
    isSubmitting: state.isSubmitting,
    
    // Actions
    setDocumentType,
    setIssueDate,
    setExpiryDate,
    setSelectedFile,
    setFileError,
    setErrors,
    addDocument,
    updateDocument,
    removeDocument,
    startEditing,
    cancelEditing,
    setIsSubmitting,
    resetForm,
  };
}
