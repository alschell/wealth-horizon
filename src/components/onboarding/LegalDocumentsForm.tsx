import React, { useState } from "react";
import { useOnboarding, LegalDocumentInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { File, ArrowRight, ArrowLeft } from "lucide-react";
import FormHeader from "./common/FormHeader";
import { DocumentTypeField, DocumentDetailsFields, DocumentUploadField } from "./legal";
import FormFooter from "./family-office/FormFooter";

const LegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  const [legalDocuments, setLegalDocuments] = useState<LegalDocumentInfo[]>(onboardingData.legalDocuments);

  const handleDocumentChange = (index: number, field: keyof LegalDocumentInfo, value: string) => {
    const updatedDocuments = [...legalDocuments];
    updatedDocuments[index] = { ...updatedDocuments[index], [field]: value };
    setLegalDocuments(updatedDocuments);
  };

  const handleFilesSelected = (index: number, files: File[]) => {
    const updatedDocuments = [...legalDocuments];
    updatedDocuments[index] = { ...updatedDocuments[index], files: files };
    setLegalDocuments(updatedDocuments);
  };

  const addDocumentForm = () => {
    setLegalDocuments([...legalDocuments, { documentType: "", documentNumber: "", issueDate: "", expiryDate: "", files: [] }]);
  };

  const removeDocumentForm = (index: number) => {
    const updatedDocuments = legalDocuments.filter((_, i) => i !== index);
    setLegalDocuments(updatedDocuments);
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormHeader 
            icon={<File className="h-7 w-7 text-black" />}
            title="Legal Documents"
            description="Please provide legal formation documents for your family office entity."
          />

          {legalDocuments.map((document, index) => (
            <div key={index} className="space-y-4 border p-4 rounded-md">
              <DocumentTypeField
                id={`documentType-${index}`}
                value={document.documentType}
                onChange={(value) => handleDocumentChange(index, "documentType", value)}
                onRemove={() => removeDocumentForm(index)}
              />
              <DocumentDetailsFields
                index={index}
                document={document}
                onChange={handleDocumentChange}
              />
              <DocumentUploadField
                id={`documentFiles-${index}`}
                files={document.files}
                onFilesSelected={(files) => handleFilesSelected(index, files)}
              />
            </div>
          ))}

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
