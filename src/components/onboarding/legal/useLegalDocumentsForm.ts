import { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

export interface DocumentFileWithMetadata {
  id: string;
  file: File;
  documentType: string;
  issueDate: string;
  expiryDate?: string;
}

export const useLegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  
  const [documentType, setDocumentType] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const initialDocuments: DocumentFileWithMetadata[] = 
    onboardingData.legalDocuments.documentFiles?.map(file => {
      if ('id' in file && 'file' in file) {
        return file as unknown as DocumentFileWithMetadata;
      }
      
      return {
        id: crypto.randomUUID(),
        file: file as File,
        documentType: (file as any).documentType || "",
        issueDate: (file as any).issueDate || "",
        expiryDate: (file as any).expiryDate || "",
      };
    }) || [];
  
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);

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

  const validateForm = () => {
    if (documentFiles.length === 0) {
      toast({
        title: "Missing documents",
        description: "Please add at least one document before proceeding.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }
      
      const filesToSave = documentFiles.map(doc => doc.file);
      
      const legalDocumentsData: LegalDocuments = {
        documentType: documentType || "",
        documentNumber: "",
        issueDate: issueDate || "",
        expiryDate: expiryDate || "",
        documentFiles: filesToSave
      };
      
      await updateLegalDocuments(legalDocumentsData);
      setCurrentStep(4); // Move to the next step (data source step)

      toast({
        title: "Information saved",
        description: "Legal documents information has been saved successfully.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "An error occurred",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(2); // Go back to the Address step
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
    documentType,
    issueDate,
    expiryDate,
    selectedFile,
    documentFiles,
    errors,
    isSubmitting,
    isEditing,
    handleDocumentTypeChange,
    handleDateChange,
    handleFileSelected,
    handleAddDocument,
    handleSubmit,
    handleBack,
    handleRemoveDocument,
    handleEditDocument,
    handleCancelEdit
  };
};
