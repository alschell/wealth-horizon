
import { useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { showSuccess, showError } from "@/utils/toast";
import { FormSubmissionProps } from "../types";

export const useFormSubmission = ({ 
  documentFiles, 
  documentType, 
  issueDate, 
  expiryDate 
}: FormSubmissionProps) => {
  const { updateLegalDocuments, setCurrentStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (documentFiles.length === 0) {
      showError("Missing documents", "Please add at least one document before proceeding.");
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
      
      const legalDocumentsData = {
        documentType: documentType || "",
        documentNumber: "",
        issueDate: issueDate || "",
        expiryDate: expiryDate || "",
        documentFiles: documentFiles.map(doc => doc.file)
      };
      
      await updateLegalDocuments(legalDocumentsData);
      setCurrentStep(4); // Move to the next step (data source step)

      showSuccess("Information saved", "Legal documents information has been saved successfully.");
    } catch (error) {
      console.error("Error submitting form:", error);
      showError("An error occurred", "There was a problem saving your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(2); // Go back to the Address step
  };

  return {
    isSubmitting,
    handleSubmit,
    handleBack
  };
};
