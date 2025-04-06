
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
    <div className="bg-white p-4 rounded-lg border border-gray-100">
      <h3 className="text-sm font-medium mb-4 flex items-center">
        <PieChart className="h-4 w-4 mr-1 text-gray-500" /> Asset Allocation
      </h3>
      <div className="flex flex-wrap justify-between">
        {assetAllocationData.map((item, index) => (
          <div key={index} className="mb-4 flex flex-col items-center">
            <div 
              className="h-24 w-24 rounded-full mb-2 flex items-center justify-center" 
              style={{ 
                background: `conic-gradient(${getColorForIndex(index)} ${item.value * 3.6}deg, #f3f4f6 0deg)`
              }}
            >
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                <span className="text-lg font-bold">{item.value}%</span>
              </div>
            </div>
            <div className="flex items-center">
              <div 
                className="h-3 w-3 rounded-sm mr-2" 
                style={{ backgroundColor: getColorForIndex(index) }} 
              />
              <span className="text-sm">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get a color based on index
const getColorForIndex = (index: number): string => {
  const colors = ['#000000', '#4B5563', '#9CA3AF', '#6B7280', '#1F2937'];
  return colors[index % colors.length];
};

export default AssetAllocationChart;
