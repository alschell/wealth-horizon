
import { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

export const useLegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  
  // State for form fields and validation
  const [documentType, setDocumentType] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>(onboardingData.legalDocuments.documentFiles || []);
  
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        description: "Please select document type, issue date, and upload at least one file.",
        variant: "destructive"
      });
      return;
    }
    
    // Add the file with the current document type
    setDocumentFiles([...documentFiles, ...selectedFiles]);
    
    // Reset the form for new document
    setSelectedFiles([]);
    
    toast({
      title: "Document added",
      description: "Your document has been added successfully.",
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (documentFiles.length === 0) {
      newErrors.documentFiles = true;
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
        documentType,
        documentNumber: "",
        issueDate: issueDate || "",
        expiryDate: expiryDate || "",
        documentFiles
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
  };

  return {
    documentType,
    issueDate,
    expiryDate,
    selectedFiles,
    documentFiles,
    errors,
    isSubmitting,
    handleDocumentTypeChange,
    handleDateChange,
    handleFilesSelected,
    handleAddDocument,
    handleSubmit,
    handleBack,
    handleRemoveDocument
  };
};
