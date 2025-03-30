
import React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface Step {
  title: string;
}

interface TradingStepsProgressProps {
  steps: Step[];
  currentStep: number;
}

const TradingStepsProgress: React.FC<TradingStepsProgressProps> = ({
  steps,
  currentStep
}) => {
  return (
    <div className="w-full mb-8">
      <div className="hidden md:flex w-full justify-between relative mb-3">
        {steps.map((step, i) => (
          <div 
            key={step.title} 
            className="flex flex-col items-center relative z-10"
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300",
                i < currentStep 
                  ? 'bg-black text-white' 
                  : i === currentStep 
                    ? 'bg-white text-black border-2 border-black' 
                    : 'bg-white text-gray-500 border-2 border-gray-300'
              )}
            >
              {i < currentStep ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                i + 1
              )}
            </div>
            <span 
              className={cn(
                "mt-3 text-sm font-medium",
                i <= currentStep ? 'text-black' : 'text-gray-500'
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
        
        {/* Progress line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-0 transform -translate-y-1/2">
          <div 
            className="h-full bg-black transition-all duration-700 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Mobile version - Just show current step */}
      <div className="md:hidden w-full">
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-black rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="mt-4 text-center">
          <span className="font-medium text-black">{steps[currentStep]?.title}</span>
        </div>
      </div>
    </div>
  );
};

export default TradingStepsProgress;
