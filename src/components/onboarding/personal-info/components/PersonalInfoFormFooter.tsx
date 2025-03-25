
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PersonalInfoFormFooterProps {
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
}

const PersonalInfoFormFooter: React.FC<PersonalInfoFormFooterProps> = ({ 
  onSubmit,
  isValid
}) => {
  return (
    <div className="pt-4 border-t">
      <p className="text-sm text-gray-500 mb-6">
        Fields marked with * are required.
      </p>
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          className={`rounded-lg hover:shadow-md transition-shadow ${isValid ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-300 text-gray-500'}`}
          disabled={!isValid}
          onClick={onSubmit}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoFormFooter;
