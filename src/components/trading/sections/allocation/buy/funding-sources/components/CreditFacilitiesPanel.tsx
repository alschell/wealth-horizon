
import React from "react";
import { FacilityItem } from "./FacilityItem";
import { mockCreditFacilitiesFlat } from "@/components/trading/data";

interface CreditFacilitiesPanelProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, quantity: number) => void;
  totalAmount: number;
  instrumentPrice: number;
}

export const CreditFacilitiesList: React.FC<CreditFacilitiesPanelProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  totalAmount,
  instrumentPrice
}) => {
  // Calculate remaining shares
  const requiredShares = totalAmount / instrumentPrice;
  const allocatedShares = Object.values(tempAllocations).reduce((sum, qty) => sum + qty, 0);
  const remainingShares = requiredShares - allocatedShares;
  
  return (
    <div className="space-y-4 mt-4 max-h-96 overflow-y-auto pr-1">
      {mockCreditFacilitiesFlat.map((facility) => (
        <FacilityItem
          key={facility.id}
          facility={facility}
          currentShares={tempAllocations[facility.id] || 0}
          instrumentPrice={instrumentPrice}
          handleAllocationChange={handleTempAllocationChange}
          remainingShares={remainingShares}
        />
      ))}
    </div>
  );
};

export const CreditFacilitiesPanel = CreditFacilitiesList;
