
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

interface AddressFormNavigationProps {
  hasErrors: boolean;
}

const AddressFormNavigation: React.FC<AddressFormNavigationProps> = ({ hasErrors }) => {
  const { setCurrentStep } = useOnboarding();
  
  return (
    <div className="pt-4 border-t">
      <p className="text-sm text-black mb-6">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline"
          size="lg" 
          className="rounded-lg"
          onClick={() => setCurrentStep(1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-black" />
          Back
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          className={`rounded-lg transition-shadow ${hasErrors ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white hover:shadow-md'}`}
          disabled={hasErrors} 
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AddressFormNavigation;
