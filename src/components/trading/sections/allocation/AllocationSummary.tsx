
import React from "react";
import { AllocationSummaryProps, QuantityAllocationSummaryProps } from "./types";

export const AllocationSummary: React.FC<AllocationSummaryProps> = ({
  totalAmount,
  currency,
  currentAllocation,
  remainingAmount
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md border">
      <div className="flex justify-between mb-2">
        <span>Total amount to fund:</span>
        <span className="font-medium">
          {totalAmount.toLocaleString('en-US', {
            style: 'currency',
            currency: currency
          })}
        </span>
      </div>
      
      <div className="flex justify-between mb-2">
        <span>Allocated so far:</span>
        <span className={`font-medium ${
          currentAllocation > totalAmount ? "text-red-600" : ""
        }`}>
          {currentAllocation.toLocaleString('en-US', {
            style: 'currency',
            currency: currency
          })}
        </span>
      </div>
      
      <div className="flex justify-between font-medium">
        <span>Remaining to allocate:</span>
        <span className={remainingAmount < 0 ? "text-red-600" : remainingAmount > 0 ? "text-amber-600" : "text-green-600"}>
          {remainingAmount.toLocaleString('en-US', {
            style: 'currency',
            currency: currency
          })}
        </span>
      </div>
    </div>
  );
};

export const QuantityAllocationSummary: React.FC<QuantityAllocationSummaryProps> = ({
  totalQuantity,
  currentAllocation,
  remainingQuantity
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md border">
      <div className="flex justify-between mb-2">
        <span>Total quantity to allocate:</span>
        <span className="font-medium">{totalQuantity}</span>
      </div>
      
      <div className="flex justify-between mb-2">
        <span>Allocated so far:</span>
        <span className={`font-medium ${
          currentAllocation > totalQuantity ? "text-red-600" : ""
        }`}>{currentAllocation}</span>
      </div>
      
      <div className="flex justify-between font-medium">
        <span>Remaining to allocate:</span>
        <span className={remainingQuantity < 0 ? "text-red-600" : remainingQuantity > 0 ? "text-amber-600" : "text-green-600"}>
          {remainingQuantity}
        </span>
      </div>
    </div>
  );
};
