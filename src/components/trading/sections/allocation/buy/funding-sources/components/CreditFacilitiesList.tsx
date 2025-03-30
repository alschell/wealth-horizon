
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCreditFacilitiesFlat } from "@/components/trading/data";

interface CreditFacilitiesListProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, amount: number) => void;
  instrumentPrice: number;
  remainingShares: number;
  searchQuery: string;
}

export const CreditFacilitiesList: React.FC<CreditFacilitiesListProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  instrumentPrice,
  remainingShares,
  searchQuery
}) => {
  const filteredFacilities = mockCreditFacilitiesFlat.filter(facility => {
    if (!searchQuery) return true;
    
    return (
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.institution?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.legalEntity?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const handleInputChange = (sourceId: string, value: string) => {
    // Allow empty value to clear the input
    if (value === '') {
      handleTempAllocationChange(sourceId, 0);
      return;
    }
    
    // Convert to number and update
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      handleTempAllocationChange(sourceId, numValue);
    }
  };
  
  const handleMaxClick = (sourceId: string, maxShares: number) => {
    handleTempAllocationChange(sourceId, maxShares);
  };
  
  return (
    <div className="space-y-4">
      {filteredFacilities.length === 0 ? (
        <p className="text-center py-4 text-gray-500">No credit facilities found matching your search.</p>
      ) : (
        filteredFacilities.map(facility => {
          const maxShares = Math.floor(facility.available / instrumentPrice);
          const currentShares = tempAllocations[facility.id] || 0;
          
          return (
            <div key={facility.id} className="p-3 border rounded-md">
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">{facility.name}</h4>
                  <p className="text-xs text-gray-500">{facility.legalEntity} • {facility.institution}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {facility.available.toLocaleString('en-US', {
                      style: 'currency',
                      currency: facility.currency
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    Available: {maxShares.toLocaleString()} shares
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center mt-3">
                <Input
                  type="number"
                  min="0"
                  max={maxShares}
                  value={currentShares || ''}
                  onChange={(e) => handleInputChange(facility.id, e.target.value)}
                  className="w-24 h-9"
                  placeholder="0"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs"
                  onClick={() => handleMaxClick(facility.id, maxShares)}
                >
                  Max ({maxShares})
                </Button>
                
                {remainingShares > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs"
                    onClick={() => handleTempAllocationChange(facility.id, Math.min(maxShares, currentShares + Math.ceil(remainingShares)))}
                  >
                    Add Remaining ({Math.ceil(remainingShares)})
                  </Button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
