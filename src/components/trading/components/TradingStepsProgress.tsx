
import React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface Step {
  title: string;
  component: React.ComponentType<any>;
}

interface TradingStepsProgressProps {
  steps: Step[];
  currentStep: number;
}

const TradingStepsProgress: React.FC<TradingStepsProgressProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="w-full mb-12">
      {/* Desktop view - full steps with names */}
      <div className="hidden md:grid md:grid-cols-7 w-full max-w-5xl justify-between relative mb-2">
        {/* Progress line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0">
          <div 
            className="h-full bg-black transition-all duration-700 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Step circles - using grid for even spacing */}
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center relative z-10"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-medium",
                index < currentStep
                  ? "bg-black text-white"
                  : index === currentStep
                  ? "bg-gray-100 text-black border-2 border-gray-400"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              {index < currentStep ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span 
              className={cn(
                "mt-2 text-sm font-medium",
                index <= currentStep ? "text-black" : "text-gray-500"
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Mobile version - Just show current step */}
      <div className="md:hidden w-full">
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
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
