
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TradeOrder } from "@/components/trading/types";
import { useDestinationPortfolios } from "./useDestinationPortfolios";
import { SelectedPortfoliosTable } from "./SelectedPortfoliosTable";
import PortfolioSelectionModal from "./PortfolioSelectionModal";

interface DestinationPortfoliosSectionProps {
  totalQuantity: number;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  instrumentPrice: number;
  currency: string;
}

const DestinationPortfoliosSection: React.FC<DestinationPortfoliosSectionProps> = ({
  totalQuantity,
  order,
  setOrder,
  instrumentPrice,
  currency
}) => {
  const {
    allocations,
    selectedPortfolios,
    handleAllocationChange,
    isModalOpen,
    setIsModalOpen,
    openPortfolioSelectionModal,
    handlePortfolioSelect,
    handleTempAllocationChange,
    tempAllocations,
    confirmPortfolioSelections
  } = useDestinationPortfolios({
    totalQuantity,
    selectedInstrument: null, // We don't need the instrument for destination
    order,
    setOrder,
    instrumentPrice,
    currency
  });

  return (
    <div className="space-y-4">
      {selectedPortfolios.length > 0 ? (
        <SelectedPortfoliosTable
          selectedPortfolioIds={selectedPortfolios}
          allocations={allocations}
          handleAllocationChange={handleAllocationChange}
          instrumentPrice={instrumentPrice}
          currency={currency}
        />
      ) : (
        <div className="text-center py-4 border rounded-md">
          <p className="text-gray-500">No destination portfolios selected</p>
          <Button 
            onClick={openPortfolioSelectionModal} 
            className="mt-2 bg-black text-white hover:bg-gray-800 flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Destination Portfolio(s)
          </Button>
        </div>
      )}
      
      {selectedPortfolios.length > 0 && (
        <div className="flex justify-end">
          <Button 
            onClick={openPortfolioSelectionModal}
            className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Manage Destination Portfolios
          </Button>
        </div>
      )}

      <PortfolioSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmPortfolioSelections}
        onSelectPortfolio={handlePortfolioSelect}
        onAllocationChange={handleTempAllocationChange}
        selectedPortfolios={selectedPortfolios}
        tempAllocations={tempAllocations}
        totalQuantity={totalQuantity}
      />
    </div>
  );
};

export default DestinationPortfoliosSection;
