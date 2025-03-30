
import React from "react";
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
  const { 
    fundingSources,
    handleAddSources,
    handleRemoveSource,
    isModalOpen,
    setIsModalOpen,
    selectedSources,
    handleAmountChange,
    remainingAmount,
    totalAllocated,
  } = useFundingSources({
    totalAmount,
    order,
    setOrder
  });

  return (
    <div className="space-y-4">
      {fundingSources?.length > 0 ? (
        <>
          <SelectedSourcesTable 
            sources={fundingSources} 
            onRemove={handleRemoveSource} 
            onAmountChange={handleAmountChange}
            currency={currency}
          />
          
          <AllocationSummary
            allocated={totalAllocated}
            remaining={remainingAmount}
            totalAmount={totalAmount}
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
        onSelect={handleAddSources}
        totalAmount={totalAmount}
        currency={currency}
        selectedSources={selectedSources}
        remainingAmount={remainingAmount}
      />
    </div>
  );
};
