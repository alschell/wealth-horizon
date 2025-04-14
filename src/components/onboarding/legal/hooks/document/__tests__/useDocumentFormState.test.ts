
import { renderHook, act } from '@testing-library/react';
import { useDocumentFormState } from '../useDocumentFormState';
import { mockDocuments, mockFile } from './mockData';

describe('useDocumentFormState', () => {
  it('should initialize with empty state when no initial documents provided', () => {
    const { result } = renderHook(() => useDocumentFormState());
    
    expect(result.current.documentType).toBe('');
    expect(result.current.issueDate).toBe('');
    expect(result.current.expiryDate).toBe('');
    expect(result.current.selectedFile).toBeNull();
    expect(result.current.documentFiles).toEqual([]);
    expect(result.current.errors).toEqual({});
    expect(result.current.fileError).toBeNull();
    expect(result.current.isEditing).toBe(false);
    expect(result.current.editingDocumentId).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
  });
  
  it('should initialize with provided documents', () => {
    const { result } = renderHook(() => useDocumentFormState(mockDocuments));
    
    expect(result.current.documentFiles).toEqual(mockDocuments);
  });
  
  it('should reset form state when resetForm is called', () => {
    const { result } = renderHook(() => useDocumentFormState());
    
    act(() => {
      result.current.setDocumentType('passport');
      result.current.setIssueDate('2023-01-01');
      result.current.setExpiryDate('2028-01-01');
      result.current.setSelectedFile(mockFile);
      result.current.setErrors({ documentType: true });
      result.current.setFileError('Invalid file');
    });
    
    // Verify state was updated
    expect(result.current.documentType).toBe('passport');
    expect(result.current.issueDate).toBe('2023-01-01');
    expect(result.current.expiryDate).toBe('2028-01-01');
    expect(result.current.selectedFile).toBe(mockFile);
    expect(result.current.errors).toEqual({ documentType: true });
    expect(result.current.fileError).toBe('Invalid file');
    
    // Reset form
    act(() => {
      result.current.resetForm();
    });
    
    // Verify state was reset
    expect(result.current.documentType).toBe('');
    expect(result.current.issueDate).toBe('');
    expect(result.current.expiryDate).toBe('');
    expect(result.current.selectedFile).toBeNull();
    expect(result.current.errors).toEqual({});
    expect(result.current.fileError).toBeNull();
  });
  
  it('should update state values correctly', () => {
    const { result } = renderHook(() => useDocumentFormState());
    
    // Update document type
    act(() => {
      result.current.setDocumentType('passport');
    });
    expect(result.current.documentType).toBe('passport');
    
    // Update issue date
    act(() => {
      result.current.setIssueDate('2023-01-01');
    });
    expect(result.current.issueDate).toBe('2023-01-01');
    
    // Update expiry date
    act(() => {
      result.current.setExpiryDate('2028-01-01');
    });
    expect(result.current.expiryDate).toBe('2028-01-01');
    
    // Update selected file
    act(() => {
      result.current.setSelectedFile(mockFile);
    });
    expect(result.current.selectedFile).toBe(mockFile);
    
    // Update documents
    act(() => {
      result.current.setDocumentFiles(mockDocuments);
    });
    expect(result.current.documentFiles).toEqual(mockDocuments);
    
    // Update editing state
    act(() => {
      result.current.setIsEditing(true);
    });
    expect(result.current.isEditing).toBe(true);
    
    // Update editing document ID
    act(() => {
      result.current.setEditingDocumentId('doc-1');
    });
    expect(result.current.editingDocumentId).toBe('doc-1');
    
    // Update submitting state
    act(() => {
      result.current.setIsSubmitting(true);
    });
    expect(result.current.isSubmitting).toBe(true);
  });
});
