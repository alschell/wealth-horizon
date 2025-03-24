
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FormFooterProps {
  onBack: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({ onBack }) => {
  return (
    <div className="pt-4 border-t">
      <p className="text-sm text-gray-500 mb-6">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline"
          size="lg" 
          className="rounded-lg"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          className="rounded-lg hover:shadow-md transition-shadow bg-black hover:bg-gray-800 text-white"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormFooter;
