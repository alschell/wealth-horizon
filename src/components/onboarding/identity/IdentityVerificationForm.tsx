
import { useState } from "react";
import { useOnboarding, IdentityVerification } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import FormHeader from "./FormHeader";
import FormNavigation from "./FormNavigation";
import DocumentTypeSelect from "./fields/DocumentTypeSelect";
import DocumentDetailsFields from "./fields/DocumentDetailsFields";
import DocumentUploadSection from "./fields/DocumentUploadSection";

const IdentityVerificationForm = () => {
  const { onboardingData, updateIdentityVerification, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<IdentityVerification>(onboardingData.identityVerification);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectionChange = (value: "passport" | "drivingLicense" | "nationalId") => {
    setFormData({ ...formData, documentType: value });
  };

  const handleFilesSelected = (files: File[]) => {
    setFormData({ ...formData, documentFiles: files });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof IdentityVerification)[] = ['documentType', 'documentNumber', 'issueDate'];
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
        description: "Please upload your identification documents.",
        variant: "destructive",
      });
      return;
    }
    
    updateIdentityVerification(formData);
    setCurrentStep(3); // Move to data source step
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
            title="Identity Verification" 
            description="Please provide identification documents for KYC verification."
          />

          <div className="grid grid-cols-1 gap-6">
            <DocumentTypeSelect 
              value={formData.documentType} 
              onChange={handleSelectionChange} 
            />

            <DocumentDetailsFields 
              documentNumber={formData.documentNumber} 
              issueDate={formData.issueDate}
              expiryDate={formData.expiryDate}
              onChange={handleInputChange}
            />
            
            <DocumentUploadSection 
              files={formData.documentFiles}
              onFilesSelected={handleFilesSelected}
            />
          </div>

          <FormNavigation onBack={() => setCurrentStep(1)} />
        </form>
      </Card>
    </motion.div>
  );
};

export default IdentityVerificationForm;
