
import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdviceHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdviceHeader: React.FC<AdviceHeaderProps> = ({ activeTab, setActiveTab }) => {
  const steps = [
    { name: "Asset Selection", value: "assets" },
    { name: "Mandate Setup", value: "mandate" },
    { name: "Review", value: "review" }
  ];

  // Find the current step index based on activeTab
  const currentStep = steps.findIndex(step => step.value === activeTab);
  
  return (
    <header className="max-w-4xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-black mb-8">New Advice</h1>
      </motion.div>

      <div className="mb-8">
        {/* Desktop view */}
        <div className="hidden md:flex w-full justify-between relative mb-2">
          {/* Progress line - positioned to connect circles */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0">
            <div 
              className="h-full bg-black transition-all duration-700 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Step circles with equal spacing */}
          <div className="flex w-full">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div 
                  key={index}
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                  style={{ 
                    position: 'absolute', 
                    left: `${(index / (steps.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)',
                    width: '40px' 
                  }}
                  onClick={() => setActiveTab(step.value)}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300",
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
                    {step.name}
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
            <span className="font-medium text-black">{steps[currentStep]?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdviceHeader;
