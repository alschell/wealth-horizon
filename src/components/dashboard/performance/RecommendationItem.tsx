
import React from "react";
import { Brain } from "lucide-react";

type RecommendationProps = {
  text: string;
  priority: string;
};

const RecommendationItem = ({ text, priority }: RecommendationProps) => {
  return (
    <div 
      className={`p-3 rounded-md border ${
        priority === 'high' ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-gray-50'
      }`}
    >
      <div className="flex items-start">
        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
          priority === 'high' ? 'bg-amber-200' : 'bg-gray-200'
        }`}>
          <Brain className="h-3 w-3 text-gray-700" />
        </div>
        <div>
          <p className="text-sm">{text}</p>
          <p className="text-xs text-gray-500 mt-1 capitalize">{priority} priority</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationItem;
