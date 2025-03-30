
import React from "react";

interface AllocationSummaryProps {
  totalAmount: number;
  requiredShares: number;
  remainingShares: number;
  currency: string;
  isAllocationComplete: boolean;
}

export const AllocationSummary: React.FC<AllocationSummaryProps> = ({
  totalAmount,
  requiredShares,
  remainingShares,
  currency,
  isAllocationComplete
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium">Required funds</p>
          <p className="text-lg font-bold">
            {totalAmount.toLocaleString('en-US', {
              style: 'currency',
              currency
            })}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Total number of shares</p>
          <p className="text-lg font-bold">
            {Math.ceil(requiredShares)}
          </p>
        </div>
      </div>

      <div className={`p-2 mb-4 text-sm rounded-md ${
        remainingShares > 0 
          ? "bg-yellow-50 text-yellow-800" 
          : "bg-green-50 text-green-800"
      }`}>
        {remainingShares > 0 
          ? `Still need to allocate ${Math.ceil(remainingShares)} more shares`
          : "All shares have been allocated"}
      </div>
    </>
  );
};
