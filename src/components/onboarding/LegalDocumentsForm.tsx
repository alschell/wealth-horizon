
import React, { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { File, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormHeader from "./common/FormHeader";
import { DocumentTypeField, DocumentDetailsFields, DocumentUploadField } from "./legal";
import FormFooter from "./family-office/FormFooter";

const LegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  const [legalDocuments, setLegalDocuments] = useState<LegalDocuments>(onboardingData.legalDocuments);

  const handleDocumentChange = (field: keyof LegalDocuments, value: string) => {
    setLegalDocuments({ ...legalDocuments, [field]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleDocumentChange(name as keyof LegalDocuments, value);
  };

  const handleFilesSelected = (files: File[]) => {
    setLegalDocuments({ ...legalDocuments, documentFiles: files });
  };

  const handleSubmit = () => {
    updateLegalDocuments(legalDocuments);
    setCurrentStep(4);

    toast({
      title: "Information saved",
      description: "Legal documents information has been saved successfully.",
    });
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
            />
            
            <DocumentDetailsFields
              documentNumber={legalDocuments.documentNumber}
              issueDate={legalDocuments.issueDate}
              expiryDate={legalDocuments.expiryDate}
              onInputChange={handleInputChange}
            />
            
            <DocumentUploadField
              files={legalDocuments.documentFiles}
              onFilesSelected={handleFilesSelected}
            />
          </div>

          <FormFooter
            onSubmit={handleSubmit}
            isSubmitting={false}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default LegalDocumentsForm;
