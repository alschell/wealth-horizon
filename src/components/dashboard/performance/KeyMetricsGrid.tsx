
import React from "react";
import { TrendingUp, BarChartHorizontal } from "lucide-react";

const KeyMetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Total Assets</p>
        <p className="text-2xl font-bold">$5.68B</p>
        <div className="flex items-center mt-1 text-emerald-600 text-xs">
          <TrendingUp className="h-3 w-3 mr-1" /> +5.2% YTD
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Total Liabilities</p>
        <p className="text-2xl font-bold">$1.20B</p>
        <div className="flex items-center mt-1 text-gray-600 text-xs">
          <BarChartHorizontal className="h-3 w-3 mr-1" /> -2.3% YTD
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Cash Balance</p>
        <p className="text-2xl font-bold">$1.28B</p>
        <div className="flex items-center mt-1 text-gray-600 text-xs">
          <BarChartHorizontal className="h-3 w-3 mr-1" /> +1.2% YTD
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Investments</p>
        <p className="text-2xl font-bold">$3.40B</p>
        <div className="flex items-center mt-1 text-emerald-600 text-xs">
          <TrendingUp className="h-3 w-3 mr-1" /> +8.5% YTD
        </div>
      </div>
    </div>
  );
};

export default KeyMetricsGrid;
