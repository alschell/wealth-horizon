
import React from "react";
import { Progress } from "@/components/ui/progress";

interface AllocationProgressProps {
  allocationPercentage: number;
  requiredShares: number;
  totalAmount: number;
  currency: string;
}

export const AllocationProgress: React.FC<AllocationProgressProps> = ({
  allocationPercentage,
  requiredShares,
  totalAmount,
  currency
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Allocation Progress</span>
        <span className="text-sm font-medium">
          {Math.round(allocationPercentage)}% complete
        </span>
      </div>
      <Progress value={allocationPercentage} />
      <div className="flex justify-between text-sm text-gray-500">
        <span>0 shares</span>
        <span>
          {Math.ceil(requiredShares)} shares ({totalAmount.toLocaleString('en-US', { 
            style: 'currency', 
            currency 
          })})
        </span>
      </div>
    </div>
  );
};
