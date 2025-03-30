
import React from "react";
import { CustomBadge } from "@/components/ui/custom-badge";

interface SelectedSourcesProps {
  allocations: Record<string, number>;
  instrumentPrice: number;
  requiredShares: number;
  currency: string;
}

export const SelectedSources: React.FC<SelectedSourcesProps> = ({
  allocations,
  instrumentPrice,
  requiredShares,
  currency
}) => {
  return (
    <div className="space-y-4">
      {Object.entries(allocations)
        .filter(([_, shares]) => shares > 0)
        .map(([sourceId, shares]) => {
          const sourceType = sourceId.startsWith("cash-") ? "Cash" : "Credit";
          const estimatedAmount = shares * instrumentPrice;
          
          return (
            <div key={sourceId} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{sourceId}</p>
                <p className="text-sm text-gray-500">{sourceType} Account</p>
                <p className="text-sm text-gray-600">
                  {shares} shares ({estimatedAmount.toLocaleString('en-US', { 
                    style: 'currency', 
                    currency 
                  })})
                </p>
              </div>
              <CustomBadge variant="outline">
                {Math.round((shares / requiredShares) * 100)}%
              </CustomBadge>
            </div>
          );
        })}
    </div>
  );
};
