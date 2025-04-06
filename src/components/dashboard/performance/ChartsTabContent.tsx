
import React from "react";
import AssetAllocationChart from "./AssetAllocationChart";
import { TrendingUp, TrendingDown } from "lucide-react";

type ChartsTabContentProps = {
  assetAllocationData: {
    name: string;
    value: number;
    color: string;
  }[];
};

const ChartsTabContent = ({ assetAllocationData }: ChartsTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Equities</p>
          <p className="text-2xl font-bold">$3.42M</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> +8.2% YTD
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Fixed Income</p>
          <p className="text-2xl font-bold">$1.84M</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> +2.4% YTD
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Real Estate</p>
          <p className="text-2xl font-bold">$1.12M</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-red-500 text-xs">
              <TrendingDown className="h-3 w-3 mr-1" /> -1.2% YTD
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Alternative</p>
          <p className="text-2xl font-bold">$0.50M</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-1 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> +6.8% YTD
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[300px]">
        <AssetAllocationChart assetAllocationData={assetAllocationData} />
      </div>
    </div>
  );
};

export default ChartsTabContent;
