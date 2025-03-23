
import { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";
import { containerVariants } from "./common/AnimationVariants";
import FormHeader from "./common/FormHeader";
import FormNavigation from "./common/FormNavigation";
import DocumentTypeField from "./legal/DocumentTypeField";
import DocumentDetailsFields from "./legal/DocumentDetailsFields";
import DocumentUploadField from "./legal/DocumentUploadField";

const LegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<LegalDocuments>(onboardingData.legalDocuments);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDocumentTypeChange = (value: "incorporation" | "registration" | "taxCertificate" | "ownership" | "other") => {
    setFormData({ ...formData, documentType: value });
  };

  const handleFilesSelected = (files: File[]) => {
    setFormData({ ...formData, documentFiles: files });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof LegalDocuments)[] = ['documentType', 'documentNumber', 'issueDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please complete all required fields.`,
        variant: "destructive",
      });
      return;
    }
    
    if (formData.documentFiles.length === 0) {
      toast({
        title: "Missing documents",
        description: "Please upload your legal documents.",
        variant: "destructive",
      });
      return;
    }
    
    updateLegalDocuments(formData);
    setCurrentStep(4); // Move to data source step
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormHeader 
            icon={<ScrollText className="h-7 w-7 text-blue-600" />}
            title="Legal Documents"
            description="Please upload the legal documentation for your family office entity."
          />

          <div className="grid grid-cols-1 gap-6">
            <DocumentTypeField 
              value={formData.documentType} 
              onChange={handleDocumentTypeChange} 
            />

            <DocumentDetailsFields 
              documentNumber={formData.documentNumber}
              issueDate={formData.issueDate}
              expiryDate={formData.expiryDate}
              onInputChange={handleInputChange}
            />

            <DocumentUploadField 
              files={formData.documentFiles}
              onFilesSelected={handleFilesSelected}
            />
          </div>

          <FormNavigation onBack={() => setCurrentStep(2)} />
        </form>
      </Card>
    </motion.div>
  );
};

export default LegalDocumentsForm;
