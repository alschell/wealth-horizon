
import React from "react";
import { InstitutionSection } from "./InstitutionSection";
import { LegalEntitySection } from "./LegalEntitySection";
import { FacilityItem } from "./FacilityItem";
import { mockCreditFacilitiesByInstitution } from "@/components/trading/data";
import { CreditFacility, Institution, LegalEntity } from "@/components/trading/types";

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
  // Filter credit facilities based on search query if provided
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return mockCreditFacilitiesByInstitution;
    
    const lowercaseQuery = searchQuery.toLowerCase();
    
    return mockCreditFacilitiesByInstitution
      .map(institution => {
        // Filter legal entities within each institution
        const filteredLegalEntities = institution.legalEntities
          .map(legalEntity => {
            // Filter creditFacilities (not facilities) within each legal entity
            const filteredFacilities = legalEntity.creditFacilities.filter(facility =>
              facility.name.toLowerCase().includes(lowercaseQuery) ||
              facility.id.toLowerCase().includes(lowercaseQuery) ||
              legalEntity.name.toLowerCase().includes(lowercaseQuery) ||
              institution.name.toLowerCase().includes(lowercaseQuery)
            );
            
            if (filteredFacilities.length === 0) return null;
            return { ...legalEntity, creditFacilities: filteredFacilities };
          })
          .filter(Boolean);
          
        if (filteredLegalEntities.length === 0) return null;
        return { ...institution, legalEntities: filteredLegalEntities };
      })
      .filter(Boolean);
  }, [searchQuery]);
  
  if (filteredData.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>No credit facilities found{searchQuery ? ` matching "${searchQuery}"` : ""}.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {filteredData.map(institution => (
        <div key={institution.id} className="space-y-4">
          <h3 className="text-md font-medium">{institution.name}</h3>
          
          {institution.legalEntities.map(legalEntity => (
            <div key={legalEntity.id} className="pl-4 border-l-2 border-gray-200 space-y-4">
              <h4 className="text-sm font-medium">{legalEntity.name}</h4>
              
              <div className="space-y-2">
                {legalEntity.creditFacilities.map(facility => (
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
