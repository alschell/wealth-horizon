
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
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
  const [shares, setShares] = useState(currentShares.toString());
  
  // Calculate maximum amount of shares that can be allocated from this facility
  const maxShares = facility.available / instrumentPrice;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setShares(newValue);
    
    const numericValue = parseFloat(newValue) || 0;
    handleAllocationChange(facility.id, numericValue);
  };
  
  const handleMax = () => {
    // Calculate the maximum shares to allocate, considering the remaining shares needed
    const sharesNeeded = Math.min(maxShares, remainingShares + currentShares);
    setShares(sharesNeeded.toString());
    handleAllocationChange(facility.id, sharesNeeded);
  };
  
  // Format the estimated amount
  const estimatedAmount = (parseFloat(shares) || 0) * instrumentPrice;
  
  return (
    <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <h3 className="font-medium text-gray-900">{facility.name}</h3>
          <p className="text-sm text-gray-500">{facility.currency}</p>
        </div>
        
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-700 mb-1">Available:</p>
          <p className="text-sm text-gray-900">
            {facility.available.toLocaleString('en-US', { 
              style: 'currency', 
              currency: facility.currency 
            })}
          </p>
        </div>
        
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-700 mb-1">Est. borrowed amount:</p>
          <p className="text-sm text-gray-900">
            {estimatedAmount.toLocaleString('en-US', { 
              style: 'currency', 
              currency: facility.currency 
            })}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4">
        <Input
          type="number"
          value={shares}
          onChange={handleChange}
          className="w-full text-right"
          min="0"
          max={maxShares.toString()}
        />
        <button 
          onClick={handleMax}
          className="text-xs text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50 whitespace-nowrap"
          type="button"
        >
          Max
        </button>
      </div>
      <p className="text-xs mt-1 text-center text-gray-500">Number of funded shares</p>
    </div>
  );
};
