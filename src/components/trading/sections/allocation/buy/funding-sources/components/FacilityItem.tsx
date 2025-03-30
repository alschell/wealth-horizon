
import React from "react";
import { CreditFacility } from "@/components/trading/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FacilityItemProps {
  facility: CreditFacility;
  currentShares: number;
  instrumentPrice: number;
  handleAllocationChange: (facilityId: string, shares: number) => void;
  remainingShares: number;
}

export const FacilityItem: React.FC<FacilityItemProps> = ({
  facility,
  currentShares,
  instrumentPrice,
  handleAllocationChange,
  remainingShares
}) => {
  const estimatedAmount = currentShares * instrumentPrice;
  const availableAmount = facility.availableCredit;
  
  // Calculate max shares that can be allocated from this facility
  const maxSharesFromFacility = Math.floor(availableAmount / instrumentPrice);
  
  const handleMaxClick = () => {
    const maxShares = Math.min(maxSharesFromFacility, currentShares + remainingShares);
    handleAllocationChange(facility.id, maxShares);
  };

  return (
    <div className={`p-4 border rounded-md ${currentShares > 0 ? 'bg-gray-50 border-gray-400' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{facility.name}</h4>
          <p className="text-xs text-gray-500">Credit Facility</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-2">
        <div>
          <div className="text-xs text-gray-500 mb-1">Available Credit</div>
          <div className="text-sm font-medium">
            {facility.availableCredit.toLocaleString('en-US', {
              style: 'currency',
              currency: facility.currency
            })}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Shares to fund</div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              max={maxSharesFromFacility}
              value={currentShares || ""}
              onChange={(e) => handleAllocationChange(facility.id, Number(e.target.value) || 0)}
              className="w-full"
              placeholder="0"
            />
            {remainingShares > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={handleMaxClick}
              >
                Max
              </Button>
            )}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Estimated Amount</div>
          <div className="text-sm font-medium">
            {estimatedAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: facility.currency
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
