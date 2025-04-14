
import React from "react";

type RecommendationContentProps = {
  recommendation: {
    title: string;
    description: string;
    impact: string;
    type: string;
  };
};

const RecommendationContent = ({ recommendation }: RecommendationContentProps) => {
  return (
    <div>
      <p className="text-sm font-medium">{recommendation.title}</p>
      <p className="text-sm">{recommendation.description}</p>
      <div className="flex justify-between items-center mt-1">
        <p className="text-xs text-gray-500 capitalize">{recommendation.impact.toLowerCase()} impact</p>
        <span className="text-xs text-gray-500">{recommendation.type}</span>
      </div>
    </div>
  );
};

export default RecommendationContent;
