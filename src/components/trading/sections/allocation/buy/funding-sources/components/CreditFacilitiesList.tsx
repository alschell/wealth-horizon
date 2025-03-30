
import React from "react";
import { mockCreditFacilitiesFlat } from "@/components/trading/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface CreditFacilitiesListProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, quantity: number) => void;
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
  // Filter facilities by search query
  const filteredFacilities = searchQuery
    ? mockCreditFacilitiesFlat.filter(
        facility =>
          facility.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockCreditFacilitiesFlat;
    
  // Handle setting allocation to maximum available for a facility
  const handleSetMax = (facilityId: string, maxShares: number) => {
    handleTempAllocationChange(facilityId, maxShares);
  };
  
  // Handle adding the remaining shares needed to a facility
  const handleAddRemaining = (facilityId: string, maxAvailableShares: number) => {
    const sharesToAdd = Math.min(remainingShares, maxAvailableShares);
    if (sharesToAdd > 0) {
      const currentAllocation = tempAllocations[facilityId] || 0;
      handleTempAllocationChange(facilityId, currentAllocation + sharesToAdd);
    }
  };

  // Format currency utility function if not available
  const formatCurrencyFallback = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };
  
  return (
    <div className="space-y-4">
      {filteredFacilities.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No credit facilities found matching your search</div>
      ) : (
        filteredFacilities.map(facility => {
          const maxAvailableShares = Math.floor(facility.available / instrumentPrice);
          
          return (
            <div key={facility.id} className="border rounded-md p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{facility.name}</h4>
                  {facility.type && <p className="text-xs text-gray-500">{facility.type}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {typeof formatCurrency === 'function' 
                      ? formatCurrency(facility.available, facility.currency) 
                      : formatCurrencyFallback(facility.available, facility.currency)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Max: {maxAvailableShares.toFixed(2)} shares
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max={maxAvailableShares}
                    value={tempAllocations[facility.id] || 0}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      const validValue = isNaN(value) ? 0 : Math.min(value, maxAvailableShares);
                      handleTempAllocationChange(facility.id, validValue);
                    }}
                    className="text-right h-8"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleSetMax(facility.id, maxAvailableShares)}
                >
                  Max
                </Button>
                {remainingShares > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleAddRemaining(facility.id, maxAvailableShares)}
                  >
                    Add Remaining
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

export default CreditFacilitiesList;
