
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface TradingFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const TradingFormNavigation: React.FC<TradingFormNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isLoading = false,
  disabled = false
}) => {
  // Determine which button to show based on the current step
  const renderNextButton = () => {
    if (currentStep < totalSteps - 1) {
      return (
        <Button 
          type="button"
          size="lg" 
          className="rounded-lg bg-black hover:bg-gray-800 text-white hover:shadow-md"
          onClick={onNext}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      );
    } else {
      return (
        <Button 
          type="button"
          size="lg" 
          className="rounded-lg bg-green-600 hover:bg-green-700 text-white hover:shadow-md"
          onClick={onSubmit}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              Submit Order
              <Check className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      );
    }
  };

  return (
    <div className="pt-4 border-t mt-6">
      <div className="flex justify-between">
        <Button
          type="button" 
          variant="outline"
          size="lg" 
          className="rounded-lg"
          onClick={onPrevious}
          disabled={currentStep === 0 || isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-black" />
          Previous
        </Button>
        
        {renderNextButton()}
      </div>
    </div>
  );
};

export default TradingFormNavigation;
