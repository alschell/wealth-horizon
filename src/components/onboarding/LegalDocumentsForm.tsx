
import React, { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { File, Plus } from "lucide-react";
import FormHeader from "./common/FormHeader";
import { DocumentTypeField, DocumentDetailsFields, DocumentUploadField } from "./legal";
import FormFooter from "./common/FormFooter";
import { Button } from "@/components/ui/button";

const LegalDocumentsForm = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          <FormHeader 
            icon={<File className="h-7 w-7 text-black" />}
            title="Legal Documents"
            description="Please provide legal formation documents for your family office entity."
          />

          <div className="space-y-5 border p-5 rounded-md">
            <h3 className="font-medium text-lg">Add a Legal Document</h3>
            
            <DocumentTypeField
              value={documentType}
              onChange={handleDocumentTypeChange}
              error={errors.documentType}
            />
            
            <DocumentDetailsFields
              issueDate={issueDate}
              expiryDate={expiryDate}
              onDateChange={handleDateChange}
            />
            
            <DocumentUploadField
              files={selectedFiles}
              onFilesSelected={handleFilesSelected}
              error={errors.selectedFiles}
              documentType={documentType}
            />
            
            <div className="flex justify-end mt-4">
              <Button
                type="button"
                onClick={handleAddDocument}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Document
              </Button>
            </div>
          </div>
          
          {documentFiles.length > 0 && (
            <div className="border p-5 rounded-md space-y-3">
              <h3 className="font-medium">Added Documents</h3>
              <div className="space-y-3">
                {documentFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {file.name.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-500 p-2 h-auto"
                      onClick={() => {
                        const updatedFiles = [...documentFiles];
                        updatedFiles.splice(index, 1);
                        setDocumentFiles(updatedFiles);
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <FormFooter
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            showRequired={true}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default LegalDocumentsForm;
