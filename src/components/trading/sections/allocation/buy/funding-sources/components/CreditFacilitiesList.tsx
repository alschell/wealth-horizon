
import React from "react";
import { FacilityItem } from "./FacilityItem";
import { mockCreditFacilitiesFlat } from "@/components/trading/data";

interface CreditFacilitiesListProps {
  tempAllocations: Record<string, number>;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
  searchQuery?: string;
}

export const CreditFacilitiesList: React.FC<CreditFacilitiesListProps> = ({
  tempAllocations,
  handleAllocationChange,
  instrumentPrice,
  remainingShares,
  searchQuery = ""
}) => {
  // Filter facilities based on search query
  const filteredFacilities = React.useMemo(() => {
    if (!searchQuery.trim()) return mockCreditFacilitiesFlat;
    
    const query = searchQuery.toLowerCase();
    return mockCreditFacilitiesFlat.filter(facility => 
      facility.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      {filteredFacilities.map((facility) => (
        <FacilityItem
          key={facility.id}
          facility={facility}
          currentShares={tempAllocations[facility.id] || 0}
          instrumentPrice={instrumentPrice}
          handleAllocationChange={handleAllocationChange}
          remainingShares={remainingShares}
        />
      ))}
      
      {filteredFacilities.length === 0 && (
        <div className="text-center p-4">
          <p className="text-gray-500">No credit facilities found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default CreditFacilitiesList;
