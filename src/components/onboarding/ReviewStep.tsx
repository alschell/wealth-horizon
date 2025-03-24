
import React from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./common/FormHeader";
import {
  FamilyOfficeDetailsSection,
  PrimaryContactSection,
  AddressSection,
  LegalDocumentsSection,
  FinancialAccountsSection,
  BeneficialOwnersSection,
  FormNavigation
} from "./review";

const ReviewStep = () => {
  const { onboardingData, setOnboardingCompleted } = useOnboarding();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOnboardingCompleted();
    
    toast({
      title: "Onboarding completed",
      description: "Thank you for completing the onboarding process.",
    });
    
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <div className="space-y-6">
          <FormHeader 
            icon={<CheckCircle className="h-7 w-7 text-black" />}
            title="Review & Submit"
            description="Please review your information before submitting your onboarding application."
          />

          <FamilyOfficeDetailsSection familyOfficeInfo={onboardingData.familyOfficeInfo} />
          
          <PrimaryContactSection primaryContactInfo={onboardingData.primaryContactInfo} />
          
          <AddressSection addressInfo={onboardingData.addressInfo} />
          
          <LegalDocumentsSection 
            legalDocuments={onboardingData.legalDocuments} 
            formatDate={formatDate}
          />
          
          <FinancialAccountsSection 
            financialAccounts={onboardingData.financialAccounts}
            aggregatorInfo={onboardingData.aggregatorInfo}
          />
          
          <BeneficialOwnersSection beneficialOwners={onboardingData.beneficialOwners} />

          <FormNavigation onSubmit={handleSubmit} />
        </div>
      </Card>
    </motion.div>
  );
};

export default ReviewStep;
