
import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdviceState } from "../types";
import { formatCurrency } from "../utils/formatters";

interface AdviceReviewProps {
  adviceState: AdviceState;
  onSubmit: () => void;
}

const AdviceReview: React.FC<AdviceReviewProps> = ({ adviceState, onSubmit }) => {
  const totalValue = adviceState.assetsInScope.reduce(
    (total, asset) => total + asset.value,
    0
  );
  
  // Calculate asset type breakdown
  const assetTypeBreakdown: Record<string, number> = {};
  adviceState.assetsInScope.forEach(asset => {
    assetTypeBreakdown[asset.type] = (assetTypeBreakdown[asset.type] || 0) + asset.value;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Mandate Details</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Mandate Type</p>
              <p className="font-medium">
                {adviceState.mandateType === "discretionary"
                  ? "Discretionary Mandate"
                  : "Advisory Mandate"}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Selected Bank</p>
              <p className="font-medium">{adviceState.selectedBank?.name || "None selected"}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Assets in Scope</p>
              <p className="font-medium">{adviceState.assetsInScope.length} assets</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="font-medium">{formatCurrency(totalValue, "USD")}</p>
            </div>
          </div>
          
          {adviceState.selectedBank?.fee && (
            <div>
              <p className="text-sm text-gray-600">Estimated Fee Range</p>
              <p className="font-medium">{adviceState.selectedBank.fee} per annum</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Assets in Scope</h2>
        
        <div className="space-y-4">
          <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset Name
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Institution
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adviceState.assetsInScope.map((asset) => (
                  <tr key={asset.id}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      {asset.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm capitalize">
                      {asset.type}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      {formatCurrency(asset.value, asset.currency)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      {asset.institution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Asset Allocation</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(assetTypeBreakdown).map(([type, value]) => (
                <div key={type} className="bg-white p-3 rounded border border-gray-100">
                  <p className="text-sm capitalize">{type}</p>
                  <p className="font-medium">{formatCurrency(value, "USD")}</p>
                  <p className="text-xs text-gray-500">
                    {((value / totalValue) * 100).toFixed(1)}% of portfolio
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
        <div className="mt-1 mr-3">
          <AlertTriangle className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-blue-800">What happens next?</h3>
          {adviceState.mandateType === "discretionary" ? (
            <p className="text-sm text-blue-700 mt-1">
              After confirming, {adviceState.selectedBank?.name} will receive authorization to manage the selected assets on your behalf according to your investment profile and objectives. You'll receive regular reports on the performance of your investments.
            </p>
          ) : (
            <p className="text-sm text-blue-700 mt-1">
              After confirming, {adviceState.selectedBank?.name} will analyze your assets and provide personalized investment recommendations. You'll maintain full control and can execute these recommendations directly on our platform.
            </p>
          )}
        </div>
      </div>
      
      <div className="pt-4 border-t flex justify-end">
        <Button 
          onClick={onSubmit} 
          className="bg-black hover:bg-gray-800 text-white flex items-center gap-2 px-6"
        >
          <Check className="h-4 w-4" />
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AdviceReview;
