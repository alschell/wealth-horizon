
import React from "react";
import { Brain } from "lucide-react";

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
        isHighPriority ? 'bg-gray-100' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-start">
        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
          isHighPriority ? 'bg-gray-200' : 'bg-gray-200'
        }`}>
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
