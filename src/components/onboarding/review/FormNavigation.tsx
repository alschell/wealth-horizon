
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

interface FormNavigationProps {
  onSubmit: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ onSubmit }) => {
  const { setCurrentStep } = useOnboarding();
  
  return (
    <div className="pt-4 border-t flex justify-between">
      <Button 
        type="button" 
        variant="outline"
        size="lg" 
        className="rounded-lg"
        onClick={() => setCurrentStep(5)}
      >
        <ArrowLeft className="mr-2 h-4 w-4 text-black" />
        Back
      </Button>
      <Button 
        onClick={onSubmit}
        size="lg" 
        className="rounded-lg hover:shadow-md transition-shadow bg-black hover:bg-gray-800 text-white"
      >
        Submit Application
        <CheckCircle className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FormNavigation;
