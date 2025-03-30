
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SelectedSourcesTable } from "./components";
import { useFundingSources } from "./hooks/useFundingSources";
import FundingSourceSelectionModal from "./FundingSourceSelectionModal";
import { AllocationSummary } from "../../AllocationSummary";

interface FundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  instrumentPrice: number;
  order: any;
  setOrder: (order: any) => void;
}

export const FundingSourcesSection: React.FC<FundingSourcesSectionProps> = ({
  totalAmount,
  currency,
  instrumentPrice,
  order,
  setOrder,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    allocations,
    handleAllocationChange,
    remainingAmount,
    selectedSourceIds,
    getSourceById,
    currentAllocation
  } = useFundingSources({
    totalAmount,
    instrumentPrice,
    currency,
    order,
    setOrder
  });

  // Handle adding sources from the modal
  const handleAddSources = (selections: Record<string, number>) => {
    // Apply each selection to the allocations
    Object.entries(selections).forEach(([sourceId, amount]) => {
      handleAllocationChange(sourceId, amount);
    });
  };

  return (
    <div className="space-y-4">
      {selectedSourceIds?.length > 0 ? (
        <>
          <SelectedSourcesTable 
            selectedSourceIds={selectedSourceIds}
            allocations={allocations}
            handleAllocationChange={handleAllocationChange}
            getSourceById={getSourceById}
            instrumentPrice={instrumentPrice}
            currency={currency}
          />
          
          <AllocationSummary
            totalAmount={totalAmount}
            allocated={currentAllocation}
            remaining={remainingAmount}
            isComplete={remainingAmount === 0}
            currency={currency}
          />
          
          {/* Check if there's still amount to allocate before showing the "Add" button */}
          {remainingAmount > 0 && (
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(true)} 
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Funding Source(s)
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center py-6 space-y-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 text-center">No funding sources selected yet.</p>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={16} />
            Add Funding Source(s)
          </Button>
        </div>
      )}
      
      <FundingSourceSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddSources}
        totalAmount={totalAmount}
        currency={currency}
        currentAllocations={allocations}
        instrumentPrice={instrumentPrice}
      />
    </div>
  );
};
