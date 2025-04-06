
import React from "react";
import NetWorthChart from "./NetWorthChart";
import { TrendingUp, TrendingDown } from "lucide-react";

type OverviewTabContentProps = {
  performanceData: {
    month: string;
    value: number;
  }[];
  chartConfig: any;
  newsData: {
    title: string;
    time: string;
  }[];
};

const OverviewTabContent = ({ 
  performanceData, 
  chartConfig, 
  newsData 
}: OverviewTabContentProps) => {
  return (
    <div className="space-y-6">
      <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total Net Worth</p>
          <p className="text-2xl font-bold">$5.68M</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> +4.7% YTD
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Net Worth Change</p>
          <p className="text-2xl font-bold">+$268K</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> Since last month
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Assets</p>
          <p className="text-2xl font-bold">$6.88M</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> +5.4% YTD
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Liabilities</p>
          <p className="text-2xl font-bold">$1.20M</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-red-500 text-xs">
              <TrendingDown className="h-3 w-3 mr-1" /> -1.8% YTD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTabContent;
