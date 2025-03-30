
import React, { useState } from "react";
import { TradeOrder, FundingAllocation } from "../../../../types";
import { Progress } from "@/components/ui/progress";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FundingSourceSelectionModal from "./FundingSourceSelectionModal";

interface FundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
  instrumentPrice: number;
}

export const FundingSourcesSection: React.FC<FundingSourcesSectionProps> = ({
  totalAmount,
  currency,
  order,
  setOrder,
  viewMode,
  instrumentPrice
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  
  // Initialize allocations from order when component mounts or order changes
  React.useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    // Extract funding source allocations from order
    if (order.fundingAllocations) {
      order.fundingAllocations.forEach(allocation => {
        // Convert amount to shares based on instrumentPrice
        initialAllocations[allocation.sourceId] = allocation.amount / instrumentPrice;
      });
    }
    
    setAllocations(initialAllocations);
  }, [order.fundingAllocations, instrumentPrice]);

  const handleConfirmSelection = (selections: Record<string, number>) => {
    // Update local state
    setAllocations(selections);
    
    // Convert to the format expected by the order
    const fundingAllocations = Object.entries(selections)
      .filter(([_, shares]) => shares > 0)
      .map(([sourceId, shares]): FundingAllocation => {
        // Explicitly type the sourceType as the union type expected by FundingAllocation
        const sourceType: "cash" | "credit" = sourceId.startsWith("cash-") ? "cash" : "credit";
        
        return {
          sourceId,
          sourceType,
          amount: shares * instrumentPrice,
          currency: currency
        };
      });
    
    // Update the order
    setOrder({
      ...order,
      fundingAllocations
    });
    
    setIsModalOpen(false);
  };

  // Calculate total allocated shares
  const totalShares = Object.values(allocations).reduce((sum, shares) => sum + shares, 0);
  
  // Calculate allocation percentage
  const requiredShares = totalAmount / instrumentPrice;
  const allocationPercentage = (totalShares / requiredShares) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Funding Sources</h3>
        <Button 
          className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          {Object.keys(allocations).length > 0 ? "Manage Sources" : "Add Sources"}
        </Button>
      </div>
      
      {/* Allocation Progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Allocation Progress</span>
          <span className="text-sm font-medium">
            {Math.round(allocationPercentage)}% complete
          </span>
        </div>
        <Progress value={allocationPercentage} />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0 shares</span>
          <span>
            {Math.ceil(requiredShares)} shares ({totalAmount.toLocaleString('en-US', { 
              style: 'currency', 
              currency 
            })})
          </span>
        </div>
      </div>

      {/* Selected funding sources */}
      {Object.keys(allocations).length > 0 ? (
        <div className="border rounded-md p-4 space-y-4">
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
            
          {allocationPercentage < 100 && (
            <div className="p-2 bg-amber-50 text-amber-800 text-sm rounded">
              Warning: You still need to allocate {Math.ceil(requiredShares - totalShares)} more shares
            </div>
          )}
          
          {allocationPercentage > 100 && (
            <div className="p-2 bg-red-50 text-red-800 text-sm rounded">
              Warning: You've over-allocated by {Math.floor(totalShares - requiredShares)} shares
            </div>
          )}
        </div>
      ) : (
        <div className="border border-dashed rounded-md p-8 text-center text-gray-500">
          <p className="mb-4">No funding sources selected yet</p>
          <Button 
            variant="outline" 
            className="mx-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Select Funding Sources
          </Button>
        </div>
      )}

      {/* Modal for funding source selection */}
      <FundingSourceSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSelection}
        totalAmount={totalAmount}
        currentAllocations={allocations}
        instrumentPrice={instrumentPrice}
        currency={currency}
      />
    </div>
  );
};

export default FundingSourcesSection;
