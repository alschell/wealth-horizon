
import React from "react";
import { Brain } from "lucide-react";
import { RecommendationIcon } from "./recommendation/RecommendationIcon";
import RecommendationContent from "./recommendation/RecommendationContent";

type RecommendationProps = {
  recommendation: {
    title: string;
    description: string;
    impact: string;
    type: string;
  };
};

const RecommendationItem = ({ recommendation }: RecommendationProps) => {
  const isHighPriority = recommendation.impact.toLowerCase() === 'high';
  
  return (
    <div 
      className={`p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${
        isHighPriority ? 'bg-amber-50' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-start">
        <RecommendationIcon isHighPriority={isHighPriority} />
        <RecommendationContent recommendation={recommendation} />
      </div>
    </div>
  );
};

export default RecommendationItem;
