
import React from "react";
import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { exposureRisksData, getRiskColor } from "../utils/riskUtils";

const RiskExposuresTab = () => {
  return (
    <div className="space-y-6">
      {exposureRisksData.map((risk) => (
        <div key={risk.name} className="space-y-1">
          <div className="flex justify-between">
            <div className="text-sm font-medium">{risk.name}</div>
            <div className="text-sm font-medium">{risk.value}%</div>
          </div>
          <div className="relative w-full">
            <Progress value={risk.value} className={`h-2 ${getRiskColor(risk.value)}`} />
          </div>
          {risk.warning && (
            <div className="flex items-center mt-1 text-xs text-amber-600">
              <AlertCircle className="h-3 w-3 mr-1" />
              {risk.warning}
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="text-sm font-medium mb-2">Risk Mitigation Suggestions</h4>
        <ul className="text-xs text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-1">•</span>
            Reduce technology sector exposure by 15-20% to improve diversification
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-1">•</span>
            Add Treasury Inflation-Protected Securities (TIPS) to hedge against inflation risks
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-1">•</span>
            Consider currency hedging for EUR exposure to reduce currency volatility
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RiskExposuresTab;
