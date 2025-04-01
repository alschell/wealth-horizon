
import React from "react";
import { Asset } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface AssetSummaryProps {
  assetsInScope: Asset[];
  totalValue: number;
}

const AssetSummary: React.FC<AssetSummaryProps> = ({ assetsInScope, totalValue }) => {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Investment Advice Summary</h3>
        <div className="text-right">
          <p className="text-gray-600">
            Assets in scope: <span className="font-semibold">{assetsInScope.length}</span>
          </p>
          <p className="text-gray-600 mt-1">
            Total value: <span className="font-semibold">{formatCurrency(totalValue, "USD")}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetSummary;
