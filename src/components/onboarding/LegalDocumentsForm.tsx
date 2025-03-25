
import React, { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { File } from "lucide-react";
import FormHeader from "./common/FormHeader";
import { DocumentTypeField, DocumentDetailsFields, DocumentUploadField } from "./legal";
import FormFooter from "./common/FormFooter";

const LegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  const [legalDocuments, setLegalDocuments] = useState<LegalDocuments>(onboardingData.legalDocuments);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleDocumentChange = (field: keyof LegalDocuments, value: string) => {
    setLegalDocuments({ ...legalDocuments, [field]: value });
    // Clear error for this field if it exists
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleDocumentChange(name as keyof LegalDocuments, value);
  };

  const handleDateChange = (field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (date) {
      handleDocumentChange(field, date.toISOString());
    } else if (field === 'expiryDate') {
      // Allow clearing the expiry date
      handleDocumentChange(field, '');
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setLegalDocuments({ ...legalDocuments, documentFiles: files });
    // Clear error for documentFiles if it exists
    if (errors['documentFiles']) {
      const updatedErrors = { ...errors };
      delete updatedErrors['documentFiles'];
      setErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    
    // Validate required fields
    if (!legalDocuments.documentType) {
      newErrors.documentType = true;
    }
    
    if (!legalDocuments.issueDate) {
      newErrors.issueDate = true;
    }
    
    if (legalDocuments.documentFiles.length === 0) {
      newErrors.documentFiles = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields and upload at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    updateLegalDocuments(legalDocuments);
    setCurrentStep(4); // Move to the next step (data source step)

    toast({
      title: "Information saved",
      description: "Legal documents information has been saved successfully.",
    });
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

          <div className="space-y-4 border p-4 rounded-md">
            <DocumentTypeField
              value={legalDocuments.documentType}
              onChange={(value) => handleDocumentChange("documentType", value)}
              error={errors.documentType}
            />
            
            <DocumentDetailsFields
              documentNumber={legalDocuments.documentNumber}
              issueDate={legalDocuments.issueDate}
              expiryDate={legalDocuments.expiryDate}
              onInputChange={handleInputChange}
              onDateChange={handleDateChange}
              documentNumberRequired={false}
            />
            
            <DocumentUploadField
              files={legalDocuments.documentFiles}
              onFilesSelected={handleFilesSelected}
              error={errors.documentFiles}
            />
          </div>

          <FormFooter
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={false}
            showRequired={true}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default LegalDocumentsForm;
