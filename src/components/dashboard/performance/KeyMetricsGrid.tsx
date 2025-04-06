
import React from "react";
import { TrendingUp, TrendingDown, BarChartHorizontal } from "lucide-react";

const MiniSparkline = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  // A simple representation of a sparkline
  return (
    <div className="flex items-end h-4 space-x-[2px] mt-1">
      {trend === 'up' && (
        <>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-3 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-4 bg-emerald-400 rounded-sm"></div>
        </>
      )}
      
      {trend === 'down' && (
        <>
          <div className="w-[3px] h-4 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-3 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-red-400 rounded-sm"></div>
        </>
      )}
      
      {trend === 'neutral' && (
        <>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-3 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-400 rounded-sm"></div>
        </>
      )}
    </div>
  );
};

const KeyMetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <p className="text-sm text-gray-600 mb-1">Total Assets</p>
        <p className="text-2xl font-bold">$5.68B</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-1 text-emerald-600 text-xs">
            <TrendingUp className="h-3 w-3 mr-1" /> +5.2% YTD
          </div>
          <MiniSparkline trend="up" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <p className="text-sm text-gray-600 mb-1">Total Liabilities</p>
        <p className="text-2xl font-bold">$1.20B</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-1 text-red-500 text-xs">
            <TrendingDown className="h-3 w-3 mr-1" /> -2.3% YTD
          </div>
          <MiniSparkline trend="down" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <p className="text-sm text-gray-600 mb-1">Cash Balance</p>
        <p className="text-2xl font-bold">$1.28B</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-1 text-gray-600 text-xs">
            <BarChartHorizontal className="h-3 w-3 mr-1" /> +1.2% YTD
          </div>
          <MiniSparkline trend="neutral" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <p className="text-sm text-gray-600 mb-1">Investments</p>
        <p className="text-2xl font-bold">$3.40B</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-1 text-emerald-600 text-xs">
            <TrendingUp className="h-3 w-3 mr-1" /> +8.5% YTD
          </div>
          <MiniSparkline trend="up" />
        </div>
      </div>
    </div>
  );
};

export default KeyMetricsGrid;
