
import React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdviceHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdviceHeader: React.FC<AdviceHeaderProps> = ({ activeTab, setActiveTab }) => {
  const steps = [
    { id: "assets", label: "Assets" },
    { id: "mandate", label: "Mandate" },
    { id: "advisor", label: "Advisor" },
    { id: "review", label: "Review" }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-center">New Advice Mandate</h1>
      
      <div className="mb-8">
        {/* Desktop view */}
        <div className="hidden md:flex w-full justify-between relative mb-2">
          {/* Progress line - positioned to connect circles */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0">
            <div 
              className="h-full bg-black transition-all duration-700 ease-in-out"
              style={{ 
                width: `${(steps.findIndex(step => step.id === activeTab) / (steps.length - 1)) * 100}%` 
              }}
            ></div>
          </div>
          
          {/* Step circles with equal spacing */}
          <div className="flex w-full">
            {steps.map((step, index) => {
              const isActive = step.id === activeTab;
              const isCompleted = steps.findIndex(s => s.id === activeTab) > index;

              return (
                <div 
                  key={step.id}
                  className="flex flex-col items-center relative z-10"
                  style={{ 
                    position: 'absolute', 
                    left: `${(index / (steps.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)',
                    width: '40px' 
                  }}
                  onClick={() => {
                    // Only allow clicking on previous tabs or the current one
                    if (index <= steps.findIndex(s => s.id === activeTab)) {
                      setActiveTab(step.id);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 cursor-pointer",
                      isActive
                        ? "bg-gray-100 text-black border-2 border-gray-400"
                        : isCompleted
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span 
                    className={cn(
                      "mt-2 text-sm font-medium text-center",
                      isActive || isCompleted ? "text-black" : "text-gray-500"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Empty space to maintain layout height */}
          <div className="w-full h-24"></div>
        </div>

        {/* Mobile version */}
        <div className="md:hidden w-full">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500">
              Step {steps.findIndex(step => step.id === activeTab) + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
            <div 
              className="h-full bg-black rounded-full transition-all duration-700 ease-in-out"
              style={{ 
                width: `${((steps.findIndex(step => step.id === activeTab) + 1) / steps.length) * 100}%` 
              }}
            ></div>
          </div>
          <div className="mt-4 text-center">
            <span className="font-medium text-black">
              {steps.find(step => step.id === activeTab)?.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceHeader;
