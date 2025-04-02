
import React from "react";

type AnalysisInsightsProps = {
  scenarioType: "monte-carlo" | "stress-test";
  riskLevel?: number;
};

const AnalysisInsights = ({ scenarioType, riskLevel = 50 }: AnalysisInsightsProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Analysis Insights</h4>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          {scenarioType === "monte-carlo"
            ? `Based on ${riskLevel}% risk tolerance, there is an 80% probability of achieving a portfolio value between $1.7M and $3.2M after 20 years.`
            : "Under a market crash scenario, your portfolio could experience a 20% drawdown but is projected to recover within 4-5 years."}
        </p>
        <p>
          {scenarioType === "monte-carlo"
            ? "The median expected outcome results in a 4.8x increase of your initial investment."
            : "The high inflation scenario poses the most sustained negative impact to your long-term wealth growth."}
        </p>
      </div>
    </div>
  );
};

export default AnalysisInsights;
