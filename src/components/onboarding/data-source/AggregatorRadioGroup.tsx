
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";

interface AggregatorRadioGroupProps {
  aggregatorInfo: AggregatorInfo;
  handleAggregatorSelection: (value: "yes" | "no") => void;
}

export const AggregatorRadioGroup: React.FC<AggregatorRadioGroupProps> = ({ 
  aggregatorInfo, 
  handleAggregatorSelection 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">How would you like to provide your financial data?</h3>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div 
          className={`relative flex-1 border rounded-md p-4 cursor-pointer hover:border-black ${
            !aggregatorInfo.usesAggregator ? "border-black bg-gray-50" : "border-gray-200"
          }`}
          onClick={() => handleAggregatorSelection("no")}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                !aggregatorInfo.usesAggregator ? "border-black" : "border-gray-400"
              }`}>
                {!aggregatorInfo.usesAggregator && <div className="w-2 h-2 rounded-full bg-black" />}
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-black">Manual Entry</h4>
              <p className="text-sm text-gray-600">Submit Financial Information</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`relative flex-1 border rounded-md p-4 cursor-pointer hover:border-black ${
            aggregatorInfo.usesAggregator ? "border-black bg-gray-50" : "border-gray-200"
          }`}
          onClick={() => handleAggregatorSelection("yes")}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                aggregatorInfo.usesAggregator ? "border-black" : "border-gray-400"
              }`}>
                {aggregatorInfo.usesAggregator && <div className="w-2 h-2 rounded-full bg-black" />}
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-black">Use Data Aggregator</h4>
              <p className="text-sm text-gray-600">Connect through a data aggregation service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregatorRadioGroup;
