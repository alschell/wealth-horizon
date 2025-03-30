
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";

export interface AllocationSummaryProps {
  totalAmount: number;
  currency: string;
  currentAllocation: number;
  remainingAmount: number;
}

export const AllocationSummary: React.FC<AllocationSummaryProps> = ({
  totalAmount,
  currency,
  currentAllocation,
  remainingAmount
}) => {
  const allocationPercentage = Math.min(100, (currentAllocation / totalAmount) * 100);
  const isComplete = Math.abs(remainingAmount) < 0.01;
  const isExcess = remainingAmount < 0;

  return (
    <Card className="p-4 border">
      <div className="space-y-3">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium">Allocation Progress</div>
          
          <div className="flex items-center gap-1">
            {isComplete ? (
              <Check size={16} className="text-green-500" />
            ) : isExcess ? (
              <AlertTriangle size={16} className="text-amber-500" />
            ) : null}
            
            <span className="text-sm font-medium">
              {allocationPercentage.toFixed(0)}%
            </span>
          </div>
        </div>

        <Progress 
          value={allocationPercentage} 
          max={100}
          className={`h-2 ${isComplete ? 'bg-green-100' : isExcess ? 'bg-amber-100' : 'bg-gray-100'}`}
        />
        
        <div className="grid grid-cols-3 text-sm">
          <div>
            <div className="text-gray-500">Allocated</div>
            <div className="font-medium">
              {currentAllocation.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}
            </div>
          </div>
          
          <div>
            <div className="text-gray-500">Remaining</div>
            <div className={`font-medium ${isExcess ? 'text-amber-600' : isComplete ? 'text-green-600' : ''}`}>
              {remainingAmount.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}
            </div>
          </div>
          
          <div>
            <div className="text-gray-500">Total</div>
            <div className="font-medium">
              {totalAmount.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export interface QuantityAllocationSummaryProps {
  totalQuantity: number;
  currentAllocation: number;
  remainingQuantity: number;
}

export const QuantityAllocationSummary: React.FC<QuantityAllocationSummaryProps> = ({
  totalQuantity,
  currentAllocation,
  remainingQuantity
}) => {
  const allocationPercentage = Math.min(100, (currentAllocation / totalQuantity) * 100);
  const isComplete = Math.abs(remainingQuantity) < 0.01;
  const isExcess = remainingQuantity < 0;

  return (
    <Card className="p-4 border">
      <div className="space-y-3">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium">Allocation Progress</div>
          
          <div className="flex items-center gap-1">
            {isComplete ? (
              <Check size={16} className="text-green-500" />
            ) : isExcess ? (
              <AlertTriangle size={16} className="text-amber-500" />
            ) : null}
            
            <span className="text-sm font-medium">
              {allocationPercentage.toFixed(0)}%
            </span>
          </div>
        </div>

        <Progress 
          value={allocationPercentage} 
          max={100}
          className={`h-2 ${isComplete ? 'bg-green-100' : isExcess ? 'bg-amber-100' : 'bg-gray-100'}`}
        />
        
        <div className="grid grid-cols-3 text-sm">
          <div>
            <div className="text-gray-500">Allocated</div>
            <div className="font-medium">{currentAllocation.toLocaleString()} shares</div>
          </div>
          
          <div>
            <div className="text-gray-500">Remaining</div>
            <div className={`font-medium ${isExcess ? 'text-amber-600' : isComplete ? 'text-green-600' : ''}`}>
              {remainingQuantity.toLocaleString()} shares
            </div>
          </div>
          
          <div>
            <div className="text-gray-500">Total</div>
            <div className="font-medium">{totalQuantity.toLocaleString()} shares</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
