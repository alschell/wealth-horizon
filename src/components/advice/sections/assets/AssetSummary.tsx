
import React, { useMemo } from "react";
import { Asset } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface AssetSummaryProps {
  assetsInScope: Asset[];
  totalValue: number;
}

const AssetSummary: React.FC<AssetSummaryProps> = ({ assetsInScope, totalValue }) => {
  const assetTypeBreakdown = useMemo(() => {
    const breakdown: Record<string, { count: number; value: number }> = {};
    
    assetsInScope.forEach(asset => {
      if (!breakdown[asset.type]) {
        breakdown[asset.type] = { count: 0, value: 0 };
      }
      
      breakdown[asset.type].count += 1;
      breakdown[asset.type].value += asset.value;
    });
    
    return breakdown;
  }, [assetsInScope]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium">Investment Advice Summary</h3>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Assets in scope: <span className="font-semibold">{assetsInScope.length}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total value: <span className="font-semibold">{formatCurrency(totalValue, "USD")}</span>
          </p>
        </div>
      </div>
      
      {assetsInScope.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Asset Type Breakdown:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(assetTypeBreakdown).map(([type, data]) => (
              <div key={type} className="bg-white p-2 rounded border border-gray-100">
                <p className="text-xs capitalize">{type}</p>
                <p className="text-sm font-medium">{formatCurrency(data.value, "USD")}</p>
                <p className="text-xs text-gray-500">{data.count} assets</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetSummary;
