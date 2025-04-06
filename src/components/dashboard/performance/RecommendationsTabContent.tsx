
import React from "react";
import RecommendationItem from "./RecommendationItem";
import { TrendingUp, TrendingDown, AlertTriangle, Check } from "lucide-react";

type RecommendationsTabContentProps = {
  recommendations: {
    title: string;
    description: string;
    impact: string;
    type: string;
  }[];
};

const RecommendationsTabContent = ({
  recommendations,
}: RecommendationsTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Risk Score</p>
          <p className="text-2xl font-bold">Medium</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-amber-500 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" /> Review recommended
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Compliance</p>
          <p className="text-2xl font-bold">Compliant</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <Check className="h-3 w-3 mr-1" /> No issues
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Potential Gain</p>
          <p className="text-2xl font-bold">+$124K</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> From recommendations
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Excess Cash</p>
          <p className="text-2xl font-bold">$280K</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-amber-500 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" /> Consider investing
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recommendations</h3>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <RecommendationItem key={index} recommendation={recommendation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsTabContent;
