
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

interface ReviewSectionHeaderProps {
  title: string;
  stepIndex: number;
}

const ReviewSectionHeader: React.FC<ReviewSectionHeaderProps> = ({ 
  title, 
  stepIndex 
}) => {
  const { setCurrentStep } = useOnboarding();
  
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-black hover:text-gray-800"
        onClick={() => setCurrentStep(stepIndex)}
      >
        <Edit className="h-4 w-4 mr-1 text-black" />
        Edit
      </Button>
    </div>
  );
};

export default ReviewSectionHeader;
