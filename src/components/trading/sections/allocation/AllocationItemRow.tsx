
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AllocationItemRowProps } from "./types";

const AllocationItemRow: React.FC<AllocationItemRowProps> = ({ 
  item, 
  allocation, 
  onChange, 
  maxAmount 
}) => {
  return (
    <div className="flex items-center justify-between py-1 border-b last:border-b-0">
      <div>
        <span className="font-medium">{item.name}</span>
        <div className="text-sm text-gray-500">
          Available: {item.available?.toLocaleString('en-US', {
            style: 'currency',
            currency: item.currency || 'USD'
          })}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0"
          max={maxAmount}
          value={allocation}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(maxAmount)}
          className="text-xs"
        >
          Max
        </Button>
      </div>
    </div>
  );
};

export default AllocationItemRow;
