
import React from "react";
import { Brain } from "lucide-react";

type RecommendationIconProps = {
  isHighPriority: boolean;
};

export const RecommendationIcon = ({ isHighPriority }: RecommendationIconProps) => {
  return (
    <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
      isHighPriority ? 'bg-amber-200' : 'bg-gray-200'
    }`}>
      <Brain className="h-3 w-3 text-gray-700" />
    </div>
  );
};

export default RecommendationIcon;
