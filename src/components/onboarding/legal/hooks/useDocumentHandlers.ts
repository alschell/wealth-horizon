import { useState, useCallback, ChangeEvent } from 'react';
import { toast } from '@/components/ui/use-toast';
import { DocumentFileWithMetadata } from '../types';

// Define allowed file types and size
const ALLOWED_DOCUMENT_TYPES = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
const MAX_FILE_SIZE_MB = 10;

export const useDocumentHandlers = (
  documentType: string,
  setDocumentType: React.Dispatch<React.SetStateAction<string>>,
  issueDate: string,
  setIssueDate: React.Dispatch<React.SetStateAction<string>>,
  expiryDate: string,
  setExpiryDate: React.Dispatch<React.SetStateAction<string>>,
  selectedFile: File | null,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  documentFiles: DocumentFileWithMetadata[],
  setDocumentFiles: React.Dispatch<React.SetStateAction<DocumentFileWithMetadata[]>>,
  errors: Record<string, boolean>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  editingDocumentId: string | null,
  setEditingDocumentId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const [fileError, setFileError] = useState<string | null>(null);

  // Validate a file meets requirements
  const validateFile = useCallback((file: File): boolean => {
    // Check file size
    const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileError(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB`);
      return false;
    }

    // Check file extension
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!ALLOWED_DOCUMENT_TYPES.includes(fileExtension)) {
      setFileError(`File type not supported. Allowed types: ${ALLOWED_DOCUMENT_TYPES.join(', ')}`);
      return false;
    }

    setFileError(null);
    return true;
  }, []);

  // Handle file selection
  const handleFileSelected = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0]; // Only use the first file since we're not using multiple
    if (!validateFile(file)) return;
    
    setSelectedFile(file);
    setErrors(prev => ({ ...prev, selectedFile: false }));
    
    toast({
      title: "File uploaded",
      description: "Document has been successfully uploaded.",
    });
  }, [validateFile, setSelectedFile, setErrors]);

  // Handle clearing the selected file
  const handleFileClear = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
  }, [setSelectedFile]);

  // Handle date change
  const handleDateChange = useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (field === 'issueDate') {
      setIssueDate(date ? date.toISOString().split('T')[0] : '');
      setErrors(prev => ({ ...prev, issueDate: false }));
    } else {
      setExpiryDate(date ? date.toISOString().split('T')[0] : '');
    }
  }, [setIssueDate, setExpiryDate, setErrors]);

  // Handle document type change
  const handleDocumentTypeChange = useCallback((type: string) => {
    setDocumentType(type);
    setErrors(prev => ({ ...prev, documentType: false }));
  }, [setDocumentType, setErrors]);

  // Handle document description change
  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    // Implementation depends on how description is stored
  }, []);

  // Add a new document
  const handleAddDocument = useCallback(() => {
    if (!documentType || !issueDate || !selectedFile) {
      const newErrors: Record<string, boolean> = {};
      if (!documentType) newErrors.documentType = true;
      if (!issueDate) newErrors.issueDate = true;
      if (!selectedFile) newErrors.selectedFile = true;
      
      setErrors(newErrors);
      return;
    }
    
    const newDocument = {
      id: isEditing && editingDocumentId ? editingDocumentId : crypto.randomUUID(),
      file: selectedFile,
      documentType,
      issueDate,
      expiryDate
    };
    
    if (isEditing && editingDocumentId) {
      setDocumentFiles(prev => 
        prev.map(doc => doc.id === editingDocumentId ? newDocument : doc)
      );
      
      toast({
        title: "Document updated",
        description: "The document has been successfully updated.",
      });
    } else {
      setDocumentFiles(prev => [...prev, newDocument]);
      
      toast({
        title: "Document added",
        description: "The document has been successfully added.",
      });
    }
    
    // Reset form
    setDocumentType("");
    setIssueDate("");
    setExpiryDate("");
    setSelectedFile(null);
    setIsEditing(false);
    setEditingDocumentId(null);
  }, [
    documentType, 
    issueDate, 
    expiryDate, 
    selectedFile, 
    isEditing, 
    editingDocumentId, 
    setDocumentType, 
    setIssueDate, 
    setExpiryDate, 
    setSelectedFile, 
    setDocumentFiles, 
    setIsEditing, 
    setEditingDocumentId, 
    setErrors
  ]);

  // Edit an existing document
  const handleEditDocument = useCallback((id: string) => {
    const documentToEdit = documentFiles.find(doc => doc.id === id);
    
    if (documentToEdit) {
      setDocumentType(documentToEdit.documentType);
      setIssueDate(documentToEdit.issueDate);
      setExpiryDate(documentToEdit.expiryDate || "");
      setSelectedFile(documentToEdit.file);
      setIsEditing(true);
      setEditingDocumentId(id);
    }
  }, [documentFiles, setDocumentType, setIssueDate, setExpiryDate, setSelectedFile, setIsEditing, setEditingDocumentId]);

  // Cancel the edit operation
  const handleCancelEdit = useCallback(() => {
    setDocumentType("");
    setIssueDate("");
    setExpiryDate("");
    setSelectedFile(null);
    setIsEditing(false);
    setEditingDocumentId(null);
    setErrors({});
  }, [setDocumentType, setIssueDate, setExpiryDate, setSelectedFile, setIsEditing, setEditingDocumentId, setErrors]);

  // Remove a document
  const handleRemoveDocument = useCallback((id: string) => {
    setDocumentFiles(prev => prev.filter(doc => doc.id !== id));
    
    toast({
      title: "Document removed",
      description: "The document has been successfully removed.",
    });
    
    // If the document being removed is also being edited, reset the form
    if (isEditing && editingDocumentId === id) {
      handleCancelEdit();
    }
  }, [setDocumentFiles, isEditing, editingDocumentId, handleCancelEdit]);

  return {
    fileError,
    validateFile,
    handleFileSelected,
    handleFileClear,
    handleDocumentTypeChange,
    handleDescriptionChange,
    handleDateChange,
    handleAddDocument,
    handleEditDocument,
    handleCancelEdit,
    handleRemoveDocument
  };
};
