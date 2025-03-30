
import React from "react";

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
  const allocationPercentage = totalAmount > 0 
    ? (currentAllocation / totalAmount) * 100 
    : 0;
    
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Allocation</span>
        <span className="text-sm font-medium">{Math.round(allocationPercentage)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${allocationPercentage > 100 ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${Math.min(allocationPercentage, 100)}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2">
        <div className="text-sm text-gray-500">
          <span>Total: {totalAmount.toLocaleString('en-US', { style: 'currency', currency })}</span>
        </div>
        <div className="text-sm text-gray-500">
          <span>Allocated: {currentAllocation.toLocaleString('en-US', { style: 'currency', currency })}</span>
        </div>
      </div>
      
      {remainingAmount > 0 && (
        <div className="mt-2 text-amber-600 text-sm">
          {remainingAmount.toLocaleString('en-US', { style: 'currency', currency })} still needs to be allocated
        </div>
      )}
      
      {remainingAmount < 0 && (
        <div className="mt-2 text-red-600 text-sm">
          Over-allocated by {Math.abs(remainingAmount).toLocaleString('en-US', { style: 'currency', currency })}
        </div>
      )}
      
      {remainingAmount === 0 && (
        <div className="mt-2 text-green-600 text-sm">
          All funds have been allocated
        </div>
      )}
    </div>
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
  const allocationPercentage = totalQuantity > 0 
    ? (currentAllocation / totalQuantity) * 100 
    : 0;
    
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Allocation</span>
        <span className="text-sm font-medium">{Math.round(allocationPercentage)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${allocationPercentage > 100 ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${Math.min(allocationPercentage, 100)}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2">
        <div className="text-sm text-gray-500">
          <span>Total: {totalQuantity} shares</span>
        </div>
        <div className="text-sm text-gray-500">
          <span>Allocated: {currentAllocation} shares</span>
        </div>
      </div>
      
      {remainingQuantity > 0 && (
        <div className="mt-2 text-amber-600 text-sm">
          {remainingQuantity} shares still need to be allocated
        </div>
      )}
      
      {remainingQuantity < 0 && (
        <div className="mt-2 text-red-600 text-sm">
          Over-allocated by {Math.abs(remainingQuantity)} shares
        </div>
      )}
      
      {remainingQuantity === 0 && (
        <div className="mt-2 text-green-600 text-sm">
          All shares have been allocated
        </div>
      )}
    </div>
  );
};
