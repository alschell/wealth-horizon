
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditFacility } from "@/components/trading/types";

interface FacilityItemProps {
  facility: CreditFacility;
  currentShares: number;
  instrumentPrice: number;
  handleAllocationChange: (sourceId: string, quantity: number) => void;
  remainingShares: number;
}

export const FacilityItem: React.FC<FacilityItemProps> = ({
  facility,
  currentShares,
  instrumentPrice,
  handleAllocationChange,
  remainingShares
}) => {
  const maxSharesFromFacility = Math.floor(facility.available / instrumentPrice);
  const estimatedAmount = currentShares * instrumentPrice;
  
  return (
    <div className="p-4 border rounded-md ml-2">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{facility.name}</h4>
          <p className="text-xs text-gray-500">{facility.currency} Credit Line</p>
        </div>
        <div className="text-sm text-right">
          <div>Available</div>
          <div className="font-semibold">
            {facility.available.toLocaleString('en-US', {
              style: 'currency',
              currency: facility.currency
            })}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            max={maxSharesFromFacility}
            value={currentShares || ""}
            onChange={(e) => handleAllocationChange(facility.id, Number(e.target.value))}
            className="w-full"
            placeholder="Number of funded shares"
          />
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={() => handleAllocationChange(
              facility.id,
              Math.min(maxSharesFromFacility, Math.ceil(remainingShares > 0 ? remainingShares : 0))
            )}
          >
            Max
          </Button>
        </div>
        
        {currentShares > 0 && (
          <p className="text-sm text-gray-600">
            Est. borrowed amount: {estimatedAmount.toLocaleString('en-US', {
              style: 'currency', 
              currency: facility.currency
            })}
          </p>
        )}
      </div>
    </div>
  );
};
