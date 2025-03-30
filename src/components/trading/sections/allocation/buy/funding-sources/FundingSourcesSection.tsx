
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TradeOrder } from "../../../../types";
import { AllocationSummary } from "../../AllocationSummary";
import { mockCashAccountsFlat, mockCreditFacilitiesFlat } from "../../../../data";
import { SelectedSourcesTable } from "./SelectedSourcesTable";
import FundingSourceSelectionModal from "./FundingSourceSelectionModal";

interface FundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
  instrumentPrice: number;
}

const FundingSourcesSection: React.FC<FundingSourcesSectionProps> = ({ 
  totalAmount, 
  currency, 
  order, 
  setOrder, 
  viewMode, 
  instrumentPrice 
}) => {
  const [allocations, setAllocations] = useState<Record<string, number>>(
    (order.fundingAllocations || []).reduce((acc, item) => {
      acc[item.sourceId] = item.amount / instrumentPrice; // Convert amount to shares
      return acc;
    }, {} as Record<string, number>)
  );
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState(0);
  
  // Initialize current allocation
  React.useEffect(() => {
    const totalShares = Object.values(allocations).reduce((sum, shares) => sum + shares, 0);
    const totalAmount = totalShares * instrumentPrice;
    setCurrentAllocation(totalAmount);
  }, [allocations, instrumentPrice]);
  
  // Get source by ID from either cash or credit
  const getSourceById = (sourceId: string) => {
    return sourceId.startsWith("cash-")
      ? mockCashAccountsFlat.find(item => item.id === sourceId)
      : mockCreditFacilitiesFlat.find(item => item.id === sourceId);
  };
  
  const handleAllocationChange = (sourceId: string, quantity: number) => {
    updateAllocations({ ...allocations, [sourceId]: quantity });
  };
  
  const updateAllocations = (newAllocations: Record<string, number>) => {
    setAllocations(newAllocations);
    
    // Convert share allocations to amounts and update order
    const fundingAllocations = Object.entries(newAllocations)
      .filter(([_, shares]) => shares > 0)
      .map(([sourceId, shares]) => {
        const source = getSourceById(sourceId);
        const amount = shares * instrumentPrice;
        
        return {
          sourceId,
          sourceType: sourceId.startsWith("cash-") ? "cash" as const : "credit" as const,
          amount,
          currency: source?.currency || currency
        };
      });
    
    const totalShares = Object.values(newAllocations).reduce((sum, shares) => sum + shares, 0);
    const totalAllocatedAmount = totalShares * instrumentPrice;
    setCurrentAllocation(totalAllocatedAmount);
    
    setOrder({
      ...order,
      fundingAllocations
    });
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle confirmation from modal
  const handleConfirmSelections = (selections: Record<string, number>) => {
    updateAllocations(selections);
  };
  
  // Calculate remaining amount
  const remainingAmount = totalAmount - currentAllocation;
  
  // Get selected source IDs (with allocations > 0)
  const selectedSourceIds = Object.keys(allocations).filter(id => allocations[id] > 0);
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Funding Sources</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which accounts to use for funding this purchase
        </p>
        
        {selectedSourceIds.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <SelectedSourcesTable 
              selectedSourceIds={selectedSourceIds}
              allocations={allocations}
              handleAllocationChange={handleAllocationChange}
              getSourceById={getSourceById}
              instrumentPrice={instrumentPrice}
              currency={currency}
            />
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-md">
            <p className="text-gray-500 mb-2">No funding sources selected</p>
            <Button 
              onClick={openModal}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Funding Source
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={openModal}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          {selectedSourceIds.length > 0 ? "Manage Funding Sources" : "Add Funding Source"}
        </Button>
      </div>
      
      <AllocationSummary
        totalAmount={totalAmount}
        currency={currency}
        currentAllocation={currentAllocation}
        remainingAmount={remainingAmount}
      />
      
      <FundingSourceSelectionModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmSelections}
        totalAmount={totalAmount}
        currentAllocations={allocations}
        instrumentPrice={instrumentPrice}
        currency={currency}
      />
    </div>
  );
};

export default FundingSourcesSection;
