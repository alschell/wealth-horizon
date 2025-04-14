
import React from "react";
import { PieChart } from "lucide-react";
import AssetAllocationItem from "./asset-allocation/AssetAllocationItem";

type AssetAllocationType = {
  name: string;
  value: number;
};

type AssetAllocationChartProps = {
  assetAllocationData: AssetAllocationType[];
};

const AssetAllocationChart = ({ assetAllocationData }: AssetAllocationChartProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <h3 className="text-sm font-medium mb-4 flex items-center">
        <PieChart className="h-4 w-4 mr-1 text-gray-500" /> Asset Allocation
      </h3>
      <div className="flex flex-wrap justify-between">
        {assetAllocationData.map((item, index) => (
          <AssetAllocationItem 
            key={index} 
            item={item} 
            colorIndex={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default AssetAllocationChart;
