
import React from "react";

interface AllocationSummaryProps {
  totalQuantity: number;
  totalAllocated: number;
  remainingQuantity: number;
}

const AllocationSummary: React.FC<AllocationSummaryProps> = ({
  totalQuantity,
  totalAllocated,
  remainingQuantity
}) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium">Total shares to allocate</p>
          <p className="text-lg font-bold">{totalQuantity}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Shares allocated</p>
          <p className="text-lg font-bold">
            {totalAllocated} <span className="text-sm font-normal text-gray-500">of {totalQuantity}</span>
          </p>
        </div>
      </div>

      <div className={`p-2 mb-4 text-sm rounded-md ${
        remainingQuantity > 0 
          ? "bg-yellow-50 text-yellow-800" 
          : "bg-green-50 text-green-800"
      }`}>
        {remainingQuantity > 0 
          ? `Still need to allocate ${remainingQuantity} more shares`
          : "All shares have been allocated"}
      </div>
    </div>
  );
};

export default AllocationSummary;
