
import React from "react";
import RiskExposureItem from "./RiskExposureItem";

type ExposureRisk = {
  name: string;
  value: number;
  warning: string | null;
};

type RiskExposuresTabProps = {
  exposureRisks: ExposureRisk[];
  getRiskColor: (value: number) => string;
};

const RiskExposuresTab = ({ exposureRisks, getRiskColor }: RiskExposuresTabProps) => {
  return (
    <div className="space-y-6">
      {exposureRisks.map((risk) => (
        <RiskExposureItem
          key={risk.name}
          name={risk.name}
          value={risk.value}
          warning={risk.warning}
          riskColor={getRiskColor(risk.value)}
        />
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
