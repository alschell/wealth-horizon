
import React from "react";
import { AlertCircle, Shield } from "lucide-react";

const RiskFactorsSection = () => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium mb-4">Top Risk Factors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm">Technology Sector Concentration</span>
            </div>
            <span className="text-sm font-medium">High</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm">Interest Rate Sensitivity</span>
            </div>
            <span className="text-sm font-medium">Medium</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm">Emerging Market Exposure</span>
            </div>
            <span className="text-sm font-medium">High</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Diversification Level</span>
            </div>
            <span className="text-sm font-medium">Strong</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Liquidity Rating</span>
            </div>
            <span className="text-sm font-medium">Strong</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm">Inflation Protection</span>
            </div>
            <span className="text-sm font-medium">Moderate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskFactorsSection;
