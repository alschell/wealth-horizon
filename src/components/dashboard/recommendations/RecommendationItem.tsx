
import React from "react";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type RecommendationProps = {
  recommendation: {
    title: string;
    description: string;
    impact: string;
    type: string;
  };
  onClick?: () => void;
};

const RecommendationItem = ({ recommendation, onClick }: RecommendationProps) => {
  const isHighPriority = recommendation.impact.toLowerCase() === 'high';
  
  return (
    <div 
      className={cn(
        "p-3 rounded-md transition-colors cursor-pointer",
        isHighPriority ? "bg-gray-100" : "bg-gray-50",
        "hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={cn(
          "h-5 w-5 rounded-full flex items-center justify-center mr-3",
          "bg-gray-200"
        )}>
          <Brain className="h-3 w-3 text-gray-700" />
        </div>
        <div>
          <p className="text-sm font-medium">{recommendation.title}</p>
          <p className="text-sm">{recommendation.description}</p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500 capitalize">{recommendation.impact.toLowerCase()} impact</p>
            <span className="text-xs text-gray-500">{recommendation.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationItem;
