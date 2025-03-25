
import { toast } from "@/components/ui/use-toast";
import { DocumentFileWithMetadata } from "../types";

export const useDocumentHandlers = (
  documentType: string,
  setDocumentType: (value: string) => void,
  issueDate: string,
  setIssueDate: (value: string) => void,
  expiryDate: string,
  setExpiryDate: (value: string) => void,
  selectedFile: File | null,
  setSelectedFile: (file: File | null) => void,
  documentFiles: DocumentFileWithMetadata[],
  setDocumentFiles: (files: DocumentFileWithMetadata[]) => void,
  errors: Record<string, boolean>,
  setErrors: (errors: Record<string, boolean>) => void,
  isEditing: boolean,
  setIsEditing: (value: boolean) => void,
  editingDocumentId: string | null,
  setEditingDocumentId: (id: string | null) => void
) => {
  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value);
    if (errors.documentType) {
      const updatedErrors = { ...errors };
      delete updatedErrors.documentType;
      setErrors(updatedErrors);
    }
  };

  const handleDateChange = (field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (date) {
      if (field === 'issueDate') {
        setIssueDate(date.toISOString());
        if (errors.issueDate) {
          const updatedErrors = { ...errors };
          delete updatedErrors.issueDate;
          setErrors(updatedErrors);
        }
      } else {
        setExpiryDate(date.toISOString());
      }
    } else if (field === 'expiryDate') {
      setExpiryDate('');
    }
  };

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      if (errors.selectedFile) {
        const updatedErrors = { ...errors };
        delete updatedErrors.selectedFile;
        setErrors(updatedErrors);
      }
    } else {
      setSelectedFile(null);
    }
  };
  
  const handleFileClear = () => {
    setSelectedFile(null);
  };

  const validateAddDocument = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (!documentType) {
      newErrors.documentType = true;
    }
    
    if (!issueDate) {
      newErrors.issueDate = true;
    }
    
    if (!selectedFile) {
      newErrors.selectedFile = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddDocument = () => {
    if (!validateAddDocument()) {
      toast({
        title: "Missing information",
        description: "Please select document type, issue date, and upload a document.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && editingDocumentId && selectedFile) {
      const updatedDocuments = documentFiles.map(doc => {
        if (doc.id === editingDocumentId) {
          return {
            ...doc,
            file: selectedFile,
            documentType,
            issueDate,
            expiryDate: expiryDate || undefined
          };
        }
        return doc;
      });
      
      setDocumentFiles(updatedDocuments);
      
      toast({
        title: "Document updated",
        description: "Your document has been updated successfully.",
      });
    } else if (selectedFile) {
      const newDocument: DocumentFileWithMetadata = {
        id: crypto.randomUUID(),
        file: selectedFile,
        documentType,
        issueDate,
        expiryDate: expiryDate || undefined
      };
      
      setDocumentFiles([...documentFiles, newDocument]);
      
      toast({
        title: "Document added",
        description: "Your document has been added successfully.",
      });
    }
    
    resetForm();
  };

  const resetForm = () => {
    setDocumentType("");
    setIssueDate("");
    setExpiryDate("");
    setSelectedFile(null);
    setIsEditing(false);
    setEditingDocumentId(null);
  };

  const handleEditDocument = (id: string) => {
    const docToEdit = documentFiles.find(doc => doc.id === id);
    if (!docToEdit) return;
    
    setDocumentType(docToEdit.documentType || "");
    setIssueDate(docToEdit.issueDate || "");
    setExpiryDate(docToEdit.expiryDate || "");
    setSelectedFile(docToEdit.file);
    
    setIsEditing(true);
    setEditingDocumentId(id);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleRemoveDocument = (id: string) => {
    const updatedFiles = documentFiles.filter(doc => doc.id !== id);
    setDocumentFiles(updatedFiles);
    
    if (isEditing && editingDocumentId === id) {
      resetForm();
    }
    
    toast({
      title: "Document removed",
      description: "The document has been removed successfully.",
    });
  };

  return {
    handleDocumentTypeChange,
    handleDateChange,
    handleFileSelected,
    handleFileClear,
    handleAddDocument,
    handleEditDocument,
    handleCancelEdit,
    handleRemoveDocument,
    validateAddDocument,
    resetForm
  };
};
