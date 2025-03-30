
import React from "react";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Check } from "lucide-react";

export interface AllocationSummaryProps {
  totalAmount: number;
  allocated: number;
  remaining: number;
  isComplete: boolean;
  currency: string;
}

export const AllocationSummary: React.FC<AllocationSummaryProps> = ({
  totalAmount,
  allocated,
  remaining,
  isComplete,
  currency
}) => {
  const percentComplete = Math.min(100, (allocated / totalAmount) * 100);
  
  return (
    <div className="mb-6 space-y-3">
      <div className="flex justify-between text-sm">
        <span>Total funds: {totalAmount.toLocaleString('en-US', {
          style: 'currency',
          currency
        })}</span>
        <span>Allocated: {allocated.toLocaleString('en-US', {
          style: 'currency',
          currency
        })}</span>
      </div>
      
      <Progress value={percentComplete} className="h-2" />
      
      {!isComplete ? (
        <div className="flex items-center text-xs text-amber-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>
            {remaining.toLocaleString('en-US', {
              style: 'currency',
              currency
            })} still needs to be allocated
          </span>
        </div>
      ) : (
        <div className="flex items-center text-xs text-green-600">
          <Check className="h-3 w-3 mr-1" />
          <span>All funds are allocated!</span>
        </div>
      )}
    </div>
  );
};

export interface QuantityAllocationSummaryProps {
  totalQuantity: number;
  allocatedQuantity: number;
  remainingQuantity: number;
  isComplete: boolean;
}

export const QuantityAllocationSummary: React.FC<QuantityAllocationSummaryProps> = ({
  totalQuantity,
  allocatedQuantity,
  remainingQuantity,
  isComplete
}) => {
  const percentComplete = Math.min(100, (allocatedQuantity / totalQuantity) * 100);
  
  return (
    <div className="mb-6 space-y-3">
      <div className="flex justify-between text-sm">
        <span>Total shares: {totalQuantity.toFixed(2)}</span>
        <span>Allocated: {allocatedQuantity.toFixed(2)}</span>
      </div>
      
      <Progress value={percentComplete} className="h-2" />
      
      {!isComplete ? (
        <div className="flex items-center text-xs text-amber-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>{remainingQuantity.toFixed(2)} shares still need to be allocated</span>
        </div>
      ) : (
        <div className="flex items-center text-xs text-green-600">
          <Check className="h-3 w-3 mr-1" />
          <span>All shares are allocated!</span>
        </div>
      )}
    </div>
  );
};
