
import React from "react";
import { PieChart } from "lucide-react";

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
          <div key={index} className="mb-2">
            <div className="flex items-center">
              <div 
                className="h-3 w-3 rounded-sm mr-2" 
                style={{ 
                  backgroundColor: index === 0 ? '#000' : 
                                   index === 1 ? '#777' : 
                                   index === 2 ? '#aaa' : 
                                   index === 3 ? '#555' : '#ccc' 
                }} 
              />
              <span className="text-xs">{item.name}</span>
            </div>
            <p className="text-sm font-medium ml-5">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetAllocationChart;
