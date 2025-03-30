
import React from "react";
import { FacilityItem } from "./FacilityItem";
import { mockCreditFacilitiesFlat } from "@/components/trading/data";

interface CreditFacilitiesListProps {
  tempAllocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
}

export const CreditFacilitiesList: React.FC<CreditFacilitiesListProps> = ({
  tempAllocations,
  handleAllocationChange,
  instrumentPrice,
  remainingShares
}) => {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      {mockCreditFacilitiesFlat.map((facility) => (
        <FacilityItem
          key={facility.id}
          facility={facility}
          currentShares={tempAllocations[facility.id] || 0}
          instrumentPrice={instrumentPrice}
          handleAllocationChange={handleAllocationChange}
          remainingShares={remainingShares}
        />
      ))}
    </div>
  );
};

export default CreditFacilitiesList;
