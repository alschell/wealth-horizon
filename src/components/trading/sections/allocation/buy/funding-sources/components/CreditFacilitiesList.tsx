import React, { useMemo } from "react";
import { FacilityItem } from "./FacilityItem";
import { mockCreditFacilitiesFlat, mockPortfoliosByInstitution } from "@/components/trading/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  // Organize facilities by institution and legal entity
  const facilitiesByInstitution = useMemo(() => {
    const institutions = mockPortfoliosByInstitution;
    const result: Record<string, Record<string, typeof mockCreditFacilitiesFlat>> = {};
    
    // Initialize structure
    institutions.forEach(institution => {
      result[institution.id] = {};
      institution.legalEntities.forEach(le => {
        result[institution.id][le.id] = [];
      });
    });
    
    // Populate with facilities
    mockCreditFacilitiesFlat.forEach(facility => {
      if (result[facility.institutionId] && result[facility.institutionId][facility.legalEntityId]) {
        result[facility.institutionId][facility.legalEntityId].push(facility);
      }
    });
    
    return result;
  }, []);
  
  // Filter facilities based on search query
  const filteredInstitutions = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockPortfoliosByInstitution;
    }
    
    const query = searchQuery.toLowerCase();
    return mockPortfoliosByInstitution
      .map(institution => {
        // Check if institution name matches
        const institutionMatches = institution.name.toLowerCase().includes(query);
        
        // Filter legal entities
        const matchingLegalEntities = institution.legalEntities
          .map(le => {
            // Check if legal entity name matches
            const leNameMatches = le.name.toLowerCase().includes(query);
            
            // Get facilities for this legal entity
            const facilities = facilitiesByInstitution[institution.id]?.[le.id] || [];
            
            // Filter facilities by name
            const matchingFacilities = facilities.filter(
              facility => facility.name.toLowerCase().includes(query)
            );
            
            // Keep this legal entity if it matches by name or has matching facilities
            if (leNameMatches || matchingFacilities.length > 0) {
              return {
                ...le,
                matchingFacilities: matchingFacilities.length > 0 ? matchingFacilities : facilities
              };
            }
            
            return null;
          })
          .filter(Boolean);
          
        // Keep this institution if it matches by name or has matching legal entities
        if (institutionMatches || matchingLegalEntities.length > 0) {
          return {
            ...institution,
            matchingLegalEntities
          };
        }
        
        return null;
      })
      .filter(Boolean);
  }, [searchQuery, facilitiesByInstitution]);
  
  // If no results found
  if (filteredInstitutions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No credit facilities found matching "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      <Accordion type="multiple" className="w-full">
        {filteredInstitutions.map((institution: any) => {
          const legalEntities = institution.matchingLegalEntities || institution.legalEntities;
          
          return (
            <AccordionItem key={institution.id} value={institution.id}>
              <AccordionTrigger className="hover:no-underline px-4 py-2 bg-gray-50 font-medium">
                {institution.name}
              </AccordionTrigger>
              <AccordionContent>
                {legalEntities.map((legalEntity: any) => {
                  const facilities = legalEntity.matchingFacilities || 
                    (facilitiesByInstitution[institution.id]?.[legalEntity.id] || []);
                  
                  if (facilities.length === 0) return null;
                  
                  return (
                    <div key={legalEntity.id} className="pl-4 border-l-2 border-gray-100 ml-2 mt-2">
                      <h4 className="text-sm font-medium mb-2 pl-2">{legalEntity.name}</h4>
                      <div className="space-y-3 mb-4">
                        {facilities.map((facility: any) => (
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
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CreditFacilitiesList;
