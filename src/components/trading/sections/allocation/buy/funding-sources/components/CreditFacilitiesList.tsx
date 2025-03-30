
import React from "react";
import { mockPortfoliosByInstitution } from "@/components/trading/data";
import { InstitutionSection } from "./InstitutionSection";
import { LegalEntitySection } from "./LegalEntitySection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FacilityItemProps {
  facility: any;
  currentShares: number;
  onAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
}

const FacilityItem: React.FC<FacilityItemProps> = ({
  facility,
  currentShares,
  onAllocationChange,
  instrumentPrice,
  remainingShares
}) => {
  const handleMaxClick = () => {
    const maxAvailable = Math.min(
      facility.availableAmount / instrumentPrice,
      remainingShares
    );
    onAllocationChange(facility.id, maxAvailable);
  };
  
  return (
    <div className="p-4 border rounded-md mb-3 last:mb-0">
      <div className="flex justify-between items-start space-x-4">
        <div className="flex-1">
          <div className="font-medium text-md truncate w-full">{facility.name}</div>
          <div className="text-sm text-gray-500">
            Available: {facility.availableAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: facility.currency
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 sm:w-44">
            <Input 
              type="number" 
              min="0"
              placeholder="Number of funded shares"
              value={currentShares || ''}
              onChange={(e) => onAllocationChange(facility.id, Number(e.target.value))}
              className="w-full"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMaxClick}
            className="whitespace-nowrap"
          >
            Max
          </Button>
        </div>
      </div>
    </div>
  );
};

interface CreditFacilitiesListProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, quantity: number) => void;
  instrumentPrice: number;
  remainingShares: number;
  searchQuery?: string;
}

export const CreditFacilitiesList: React.FC<CreditFacilitiesListProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  instrumentPrice,
  remainingShares,
  searchQuery = ""
}) => {
  // Filter institutions based on search query
  const filteredInstitutions = mockPortfoliosByInstitution.filter(institution => {
    if (!searchQuery) return true;
    
    // Check if institution name matches
    if (institution.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    
    // Check if any legal entity or facility matches
    for (const entity of institution.legalEntities || []) {
      if (entity.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      
      // Check facilities
      for (const facility of entity.creditFacilities || []) {
        if (facility.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
      }
    }
    
    return false;
  });

  if (filteredInstitutions.length === 0) {
    return <div className="text-center py-8 text-gray-500">No credit facilities found</div>;
  }

  return (
    <div className="space-y-6">
      {filteredInstitutions.map(institution => (
        <div key={institution.id}>
          <h3 className="text-md font-medium mb-3">{institution.name}</h3>
          
          <div className="space-y-6">
            {institution.legalEntities?.map(entity => (
              <div key={entity.id} className="pl-4 border-l-2 border-gray-200">
                <h4 className="text-sm font-medium mb-3">{entity.name}</h4>
                
                <div className="space-y-2">
                  {entity.creditFacilities?.map(facility => (
                    <FacilityItem
                      key={facility.id}
                      facility={facility}
                      currentShares={tempAllocations[facility.id] || 0}
                      onAllocationChange={handleTempAllocationChange}
                      instrumentPrice={instrumentPrice}
                      remainingShares={remainingShares}
                    />
                  ))}
                  
                  {(!entity.creditFacilities || entity.creditFacilities.length === 0) && (
                    <div className="text-sm text-gray-500 pl-4">No credit facilities available</div>
                  )}
                </div>
              </div>
            ))}
            
            {(!institution.legalEntities || institution.legalEntities.length === 0) && (
              <div className="text-sm text-gray-500 pl-4">No legal entities available</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
