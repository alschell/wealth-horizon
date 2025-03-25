
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

interface FormNavigationProps {
  onSubmit: () => void;
  isDisabled?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ onSubmit, isDisabled = false }) => {
  const { setCurrentStep } = useOnboarding();
  
  const handleBack = () => {
    // Scroll to top before navigating back
    window.scrollTo(0, 0);
    setCurrentStep(5);
  };

  const handleSubmit = () => {
    // Scroll to top before submitting
    window.scrollTo(0, 0);
    onSubmit();
  };
  
  return (
    <div className="pt-4 border-t flex justify-between">
      <Button 
        type="button" 
        variant="outline"
        size="lg" 
        className="rounded-lg"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4 text-black" />
        Back
      </Button>
      <Button 
        onClick={handleSubmit}
        size="lg" 
        className={`rounded-lg transition-shadow ${isDisabled ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white hover:shadow-md'}`}
        disabled={isDisabled}
      >
        Submit Application
        <CheckCircle className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FormNavigation;
