
import React from "react";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Check } from "lucide-react";

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
  const percentComplete = Math.min(100, ((requiredShares - remainingShares) / requiredShares) * 100);
  const allocatedAmount = (requiredShares - remainingShares) * (totalAmount / requiredShares);
  
  return (
    <div className="mb-6 space-y-3">
      <div className="flex justify-between text-sm">
        <span>Total funds: {totalAmount.toLocaleString('en-US', {
          style: 'currency',
          currency
        })}</span>
        <span>Allocated: {allocatedAmount.toLocaleString('en-US', {
          style: 'currency',
          currency
        })}</span>
      </div>
      
      <Progress value={percentComplete} className="h-2" />
      
      {remainingShares > 0 ? (
        <div className="flex items-center text-xs text-amber-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>
            {remainingShares.toFixed(2)} shares still need funding 
            ({(remainingShares * (totalAmount / requiredShares)).toLocaleString('en-US', {
              style: 'currency',
              currency
            })})
          </span>
        </div>
      ) : (
        <div className="flex items-center text-xs text-green-600">
          <Check className="h-3 w-3 mr-1" />
          <span>All shares are funded!</span>
        </div>
      )}
    </div>
  );
};
