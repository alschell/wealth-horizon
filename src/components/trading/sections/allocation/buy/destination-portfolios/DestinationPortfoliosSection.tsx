
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TradeOrder } from "../../../../types";
import { QuantityAllocationSummary } from "../../AllocationSummary";
import { mockPortfoliosFlat } from "../../../../data";
import PortfolioSelectionModal from "./PortfolioSelectionModal";
import { SelectedPortfoliosTable } from "./SelectedPortfoliosTable";

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
  const [allocations, setAllocations] = useState<Record<string, number>>(
    (order.depositAllocations || [])
      .filter(allocation => allocation.destinationType === "portfolio")
      .reduce((acc, item) => {
        acc[item.destinationId] = item.quantity || 0;
        return acc;
      }, {} as Record<string, number>)
  );
  
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize current allocation
  React.useEffect(() => {
    const total = Object.values(allocations).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
  }, [allocations]);
  
  // Update allocations and order state
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    updateAllocations({ ...allocations, [portfolioId]: quantity });
  };
  
  const updateAllocations = (newAllocations: Record<string, number>) => {
    setAllocations(newAllocations);
    
    // Calculate new total allocation
    const total = Object.values(newAllocations).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
    
    // Get non-portfolio allocations
    const nonPortfolioAllocations = (order.depositAllocations || [])
      .filter(alloc => alloc.destinationType !== "portfolio");
    
    // Add updated portfolio allocations
    const portfolioAllocations = Object.entries(newAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([destinationId, quantity]) => ({
        destinationId,
        destinationType: "portfolio" as const,
        quantity
      }));
    
    // Update order
    setOrder({
      ...order,
      depositAllocations: [...nonPortfolioAllocations, ...portfolioAllocations]
    });
  };
  
  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle confirmation from modal
  const handleConfirmSelections = (selections: Record<string, number>) => {
    updateAllocations(selections);
  };
  
  // Calculate remaining quantity
  const remainingQuantity = totalQuantity - currentAllocation;
  
  // Get selected portfolio IDs (with allocations > 0)
  const selectedPortfolioIds = Object.keys(allocations).filter(id => allocations[id] > 0);
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Destination Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to deposit the purchased shares into
        </p>
        
        {selectedPortfolioIds.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <SelectedPortfoliosTable
              selectedPortfolioIds={selectedPortfolioIds}
              allocations={allocations}
              handleAllocationChange={handleAllocationChange}
              instrumentPrice={instrumentPrice}
              currency={currency}
            />
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-md">
            <p className="text-gray-500 mb-2">No destination portfolios selected</p>
            <Button 
              onClick={openModal}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Destination Portfolio
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
          {selectedPortfolioIds.length > 0 ? "Manage Destination Portfolios" : "Add Destination Portfolio"}
        </Button>
      </div>
      
      <QuantityAllocationSummary
        totalQuantity={totalQuantity}
        currentAllocation={currentAllocation}
        remainingQuantity={remainingQuantity}
      />
      
      <PortfolioSelectionModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmSelections}
        totalQuantity={totalQuantity}
        currentAllocations={allocations}
        instrumentPrice={instrumentPrice}
        currency={currency}
      />
    </div>
  );
};

export default DestinationPortfoliosSection;
