
import { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

interface DocumentFile extends File {
  documentType: string;
  issueDate: string;
  expiryDate?: string;
}

export const useLegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  
  // State for form fields and validation
  const [documentType, setDocumentType] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<DocumentFile[]>(onboardingData.legalDocuments.documentFiles as DocumentFile[] || []);
  
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    if (errors.selectedFiles) {
      const updatedErrors = { ...errors };
      delete updatedErrors.selectedFiles;
      setErrors(updatedErrors);
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
    
    if (selectedFiles.length === 0) {
      newErrors.selectedFiles = true;
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

    // Create enhanced file objects with metadata
    const enhancedFiles = selectedFiles.map(file => {
      // Create a new object that has both File properties and our custom properties
      const enhancedFile = Object.assign(Object.create(Object.getPrototypeOf(file)), file) as DocumentFile;
      enhancedFile.documentType = documentType;
      enhancedFile.issueDate = issueDate;
      enhancedFile.expiryDate = expiryDate || "";
      return enhancedFile;
    });
    
    if (isEditing && editingIndex !== null) {
      // Update existing document
      const updatedDocuments = [...documentFiles];
      updatedDocuments[editingIndex] = enhancedFiles[0];
      setDocumentFiles(updatedDocuments);
      
      toast({
        title: "Document updated",
        description: "Your document has been updated successfully.",
      });
    } else {
      // Add new document
      setDocumentFiles([...documentFiles, ...enhancedFiles]);
      
      toast({
        title: "Document added",
        description: "Your document has been added successfully.",
      });
    }
    
    // Reset the form for new document
    resetForm();
  };

  const resetForm = () => {
    setDocumentType("");
    setIssueDate("");
    setExpiryDate("");
    setSelectedFiles([]);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditDocument = (index: number) => {
    const docToEdit = documentFiles[index];
    setDocumentType(docToEdit.documentType || "");
    setIssueDate(docToEdit.issueDate || "");
    setExpiryDate(docToEdit.expiryDate || "");
    
    // Create a plain File object from the DocumentFile for the file uploader
    const fileBlob = new Blob([docToEdit], { type: docToEdit.type });
    const plainFile = new File([fileBlob], docToEdit.name, { 
      type: docToEdit.type,
      lastModified: docToEdit.lastModified
    });
    
    setSelectedFiles([plainFile]);
    setIsEditing(true);
    setEditingIndex(index);
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
      
      const legalDocumentsData: LegalDocuments = {
        documentType: documentType || "",
        documentNumber: "",
        issueDate: issueDate || "",
        expiryDate: expiryDate || "",
        documentFiles: documentFiles
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

  const handleRemoveDocument = (index: number) => {
    const updatedFiles = [...documentFiles];
    updatedFiles.splice(index, 1);
    setDocumentFiles(updatedFiles);
    
    // If removing a document that's currently being edited, reset the form
    if (isEditing && editingIndex === index) {
      resetForm();
    }
  };

  return {
    documentType,
    issueDate,
    expiryDate,
    selectedFiles,
    documentFiles,
    errors,
    isSubmitting,
    isEditing,
    handleDocumentTypeChange,
    handleDateChange,
    handleFilesSelected,
    handleAddDocument,
    handleSubmit,
    handleBack,
    handleRemoveDocument,
    handleEditDocument,
    handleCancelEdit
  };
};
