
import React from "react";
import { InstitutionSection } from "./InstitutionSection";
import { LegalEntitySection } from "./LegalEntitySection";
import { FacilityItem } from "./FacilityItem";
import { mockCreditFacilitiesByInstitution } from "@/components/trading/data";

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
            // Filter facilities within each legal entity
            const filteredFacilities = legalEntity.facilities.filter(facility =>
              facility.name.toLowerCase().includes(lowercaseQuery) ||
              facility.id.toLowerCase().includes(lowercaseQuery) ||
              legalEntity.name.toLowerCase().includes(lowercaseQuery) ||
              institution.name.toLowerCase().includes(lowercaseQuery)
            );
            
            if (filteredFacilities.length === 0) return null;
            return { ...legalEntity, facilities: filteredFacilities };
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
        <InstitutionSection
          key={institution.id}
          name={institution.name}
          icon={institution.icon}
        >
          {institution.legalEntities.map(legalEntity => (
            <LegalEntitySection key={legalEntity.id} name={legalEntity.name}>
              <div className="space-y-2">
                {legalEntity.facilities.map(facility => (
                  <FacilityItem
                    key={facility.id}
                    facility={facility}
                    allocation={tempAllocations[facility.id] || 0}
                    onAllocationChange={handleAllocationChange}
                    instrumentPrice={instrumentPrice}
                    remainingShares={remainingShares}
                  />
                ))}
              </div>
            </LegalEntitySection>
          ))}
        </InstitutionSection>
      ))}
    </div>
  );
};
