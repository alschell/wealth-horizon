
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCreditFacilitiesFlat } from "@/components/trading/data";

interface CreditFacilitiesPanelProps {
  tempAllocations: Record<string, number>;
  handleTempAllocationChange: (sourceId: string, amount: number) => void;
  totalAmount: number;
}

export const CreditFacilitiesPanel: React.FC<CreditFacilitiesPanelProps> = ({
  tempAllocations,
  handleTempAllocationChange,
  totalAmount
}) => {
  return (
    <div className="mt-4 space-y-4">
      {mockCreditFacilitiesFlat.map(facility => {
        const isSelected = Boolean(tempAllocations[facility.id]);
        
        return (
          <div key={facility.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-start mb-2">
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
            
            <div className="flex items-center gap-2 mt-4">
              <Input
                type="number"
                min="0"
                max={facility.available}
                value={tempAllocations[facility.id] || ""}
                onChange={(e) => handleTempAllocationChange(facility.id, Number(e.target.value))}
                className="w-full"
                placeholder="0.00"
              />
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => handleTempAllocationChange(
                  facility.id,
                  Math.min(facility.available, totalAmount)
                )}
              >
                Max
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
