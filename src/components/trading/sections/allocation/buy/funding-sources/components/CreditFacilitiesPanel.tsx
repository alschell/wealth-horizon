
import React, { useMemo } from "react";
import { mockCreditFacilitiesFlat } from "@/components/trading/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockPortfoliosByInstitution } from "@/components/trading/data";
import { FacilityItem } from "./FacilityItem";

interface CreditFacilitiesPanelProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, quantity: number) => void;
  totalAmount: number;
  instrumentPrice: number;
}

export const CreditFacilitiesPanel: React.FC<CreditFacilitiesPanelProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  totalAmount,
  instrumentPrice
}) => {
  // Calculate remaining shares
  const requiredShares = totalAmount / instrumentPrice;
  const allocatedShares = Object.values(tempAllocations).reduce((sum, qty) => sum + qty, 0);
  const remainingShares = requiredShares - allocatedShares;
  
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
  
  return (
    <div className="space-y-4 mt-4 max-h-96 overflow-y-auto pr-1">
      <Accordion type="multiple" className="w-full">
        {mockPortfoliosByInstitution.map(institution => {
          const institutionFacilities = facilitiesByInstitution[institution.id];
          if (!institutionFacilities) return null;
          
          const hasAnyFacilities = institution.legalEntities.some(
            le => institutionFacilities[le.id]?.length > 0
          );
          
          if (!hasAnyFacilities) return null;
          
          return (
            <AccordionItem key={institution.id} value={institution.id}>
              <AccordionTrigger className="hover:no-underline px-4 py-2 bg-gray-50 font-medium">
                {institution.name}
              </AccordionTrigger>
              <AccordionContent>
                {institution.legalEntities.map(legalEntity => {
                  const facilities = institutionFacilities[legalEntity.id] || [];
                  if (facilities.length === 0) return null;
                  
                  return (
                    <div key={legalEntity.id} className="pl-4 border-l-2 border-gray-100 ml-2 mt-2">
                      <h4 className="text-sm font-medium mb-2 pl-2">{legalEntity.name}</h4>
                      <div className="space-y-3 mb-4">
                        {facilities.map(facility => (
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

export default CreditFacilitiesPanel;
