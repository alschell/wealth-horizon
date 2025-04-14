
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "@/utils/icons";

interface Step {
  id: string;
  label: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStepId: string;
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStepId }) => {
  const currentIndex = steps.findIndex(step => step.id === currentStepId);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                    isActive && "bg-black text-white",
                    isCompleted && "bg-emerald-100 text-emerald-700",
                    !isActive && !isCompleted && "bg-gray-100 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span 
                  className={cn(
                    "mt-2 text-sm font-medium",
                    isActive && "text-black",
                    isCompleted && "text-emerald-700",
                    !isActive && !isCompleted && "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
              
              {!isLast && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 mx-2",
                    index < currentIndex ? "bg-emerald-500" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
