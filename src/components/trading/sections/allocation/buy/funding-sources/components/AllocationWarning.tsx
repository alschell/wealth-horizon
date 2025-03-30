
import React from "react";

interface AllocationWarningProps {
  allocationPercentage: number;
  remainingShares: number;
}

export const AllocationWarning: React.FC<AllocationWarningProps> = ({
  allocationPercentage,
  remainingShares
}) => {
  if (allocationPercentage < 100) {
    return (
      <div className="p-2 bg-amber-50 text-amber-800 text-sm rounded">
        Warning: You still need to allocate {Math.ceil(remainingShares)} more shares
      </div>
    );
  }
  
  if (allocationPercentage > 100) {
    return (
      <div className="p-2 bg-red-50 text-red-800 text-sm rounded">
        Warning: You've over-allocated by {Math.floor(Math.abs(remainingShares))} shares
      </div>
    );
  }
  
  return null;
};
