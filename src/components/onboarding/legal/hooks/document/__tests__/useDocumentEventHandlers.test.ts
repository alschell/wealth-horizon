
import { renderHook, act } from '@testing-library/react-hooks';
import { useDocumentEventHandlers } from '../useDocumentEventHandlers';
import { useDocumentValidation } from '../useDocumentValidation';
import { useDocumentFactory } from '../useDocumentFactory';
import { mockDocuments, mockFile } from './mockData';

// Mock dependencies
jest.mock('../useDocumentValidation');
jest.mock('../useDocumentFactory');
jest.mock('../useDocumentFileHandler', () => ({
  useDocumentFileHandler: () => ({
    handleFileSelected: jest.fn(),
    handleFileClear: jest.fn(),
  }),
}));
jest.mock('../useDocumentFieldHandlers', () => ({
  useDocumentFieldHandlers: () => ({
    handleDateChange: jest.fn(),
    handleDocumentTypeChange: jest.fn(),
  }),
}));
jest.mock('../useDocumentOperations', () => ({
  useDocumentOperations: () => ({
    handleAddDocument: jest.fn(),
    handleEditDocument: jest.fn(() => mockDocuments[0]),
    handleUpdateDocument: jest.fn(),
    handleCancelEdit: jest.fn(),
    handleRemoveDocument: jest.fn(),
  }),
}));
jest.mock('@/utils/toast', () => ({
  showSuccess: jest.fn(),
  showError: jest.fn(),
}));

describe('useDocumentEventHandlers', () => {
  const mockProps = {
    documentType: 'passport',
    setDocumentType: jest.fn(),
    issueDate: '2023-01-01',
    setIssueDate: jest.fn(),
    expiryDate: '2028-01-01',
    setExpiryDate: jest.fn(),
    selectedFile: mockFile,
    setSelectedFile: jest.fn(),
    documentFiles: mockDocuments,
    setDocumentFiles: jest.fn(),
    errors: {},
    setErrors: jest.fn(),
    fileError: null,
    setFileError: jest.fn(),
    isEditing: false,
    setIsEditing: jest.fn(),
    editingDocumentId: null,
    setEditingDocumentId: jest.fn(),
    resetForm: jest.fn(),
    onSave: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDocumentValidation as jest.Mock).mockReturnValue({
      validateFields: jest.fn(() => ({})),
      validateFile: jest.fn(() => ({ isValid: true, error: null })),
      hasErrors: jest.fn(() => false),
      // These are needed for backward compatibility with tests
      validateDocumentFields: jest.fn(() => ({})),
      validateDocumentFile: jest.fn(() => ({ isValid: true, error: null }))
    });
    (useDocumentFactory as jest.Mock).mockReturnValue({
      createDocument: jest.fn(),
      updateDocumentInList: jest.fn(),
      removeDocumentFromList: jest.fn(),
    });
  });

  it('should handle adding a document successfully', () => {
    const { result } = renderHook(() => useDocumentEventHandlers(mockProps));
    
    act(() => {
      result.current.handleAddDocument();
    });
    
    // We expect validation to be called
    expect(useDocumentValidation().validateFields).toHaveBeenCalledWith(
      mockProps.documentType,
      mockProps.issueDate,
      mockProps.selectedFile
    );
  });

  it('should handle document edit', () => {
    const { result } = renderHook(() => useDocumentEventHandlers(mockProps));
    
    act(() => {
      result.current.handleEditDocument('doc-1');
    });
    
    // After editing, we should set the form values
    expect(mockProps.setDocumentType).toHaveBeenCalled();
    expect(mockProps.setIssueDate).toHaveBeenCalled();
    expect(mockProps.setExpiryDate).toHaveBeenCalled();
    expect(mockProps.setSelectedFile).toHaveBeenCalled();
  });

  it('should handle document update', () => {
    const mockPropsWithEditing = {
      ...mockProps,
      editingDocumentId: 'doc-1',
    };
    
    const { result } = renderHook(() => useDocumentEventHandlers(mockPropsWithEditing));
    
    act(() => {
      result.current.handleUpdateDocument();
    });
    
    // Validation should be called
    expect(useDocumentValidation().validateFields).toHaveBeenCalled();
  });

  it('should handle form submission', async () => {
    const { result } = renderHook(() => useDocumentEventHandlers(mockProps));
    
    await act(async () => {
      await result.current.handleSubmit();
    });
    
    // onSave should be called with document files
    expect(mockProps.onSave).toHaveBeenCalledWith(mockProps.documentFiles);
  });

  it('should validate fields and show errors if validation fails', () => {
    (useDocumentValidation as jest.Mock).mockReturnValue({
      validateFields: jest.fn(() => ({
        documentType: true,
        issueDate: true,
      })),
      validateFile: jest.fn(() => ({ isValid: false, error: 'Error' })),
      hasErrors: jest.fn(() => true),
      // For backward compatibility
      validateDocumentFields: jest.fn(() => ({
        documentType: true,
        issueDate: true,
      })),
      validateDocumentFile: jest.fn(() => ({ isValid: false, error: 'Error' }))
    });
    
    const { result } = renderHook(() => useDocumentEventHandlers(mockProps));
    
    act(() => {
      result.current.handleAddDocument();
    });
    
    // setErrors should be called with validation errors
    expect(mockProps.setErrors).toHaveBeenCalled();
  });
});
