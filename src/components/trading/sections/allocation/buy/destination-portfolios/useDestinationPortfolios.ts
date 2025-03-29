
import { useState, useEffect } from "react";
import { TradeOrder } from "../../../../types";

export const useDestinationPortfolios = (
  totalQuantity: number,
  order: Partial<TradeOrder>,
  setOrder: (order: Partial<TradeOrder>) => void
) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.depositAllocations) {
      order.depositAllocations
        .filter(allocation => allocation.destinationType === "portfolio")
        .forEach(allocation => {
          initialAllocations[allocation.destinationId] = allocation.quantity || 0;
        });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.depositAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [portfolioId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Filter out other destination types (if any) and add updated portfolio allocations
    const otherAllocations = order.depositAllocations
      ? order.depositAllocations.filter(a => a.destinationType !== "portfolio")
      : [];
    
    const portfolioAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([destinationId, quantity]) => ({
        destinationId,
        destinationType: "portfolio" as const,
        quantity
      }));
    
    setOrder({
      ...order,
      depositAllocations: [...otherAllocations, ...portfolioAllocations]
    });
  };

  // Calculate the remaining quantity to allocate
  const remainingQuantity = totalQuantity - currentAllocation;

  // Modal control functions
  const openPortfolioSelectionModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolioId(null);
  };

  // Confirm selection and add allocation
  const confirmPortfolioSelection = () => {
    if (selectedPortfolioId) {
      const suggestedAllocation = Math.min(
        totalQuantity,
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      
      handleAllocationChange(selectedPortfolioId, suggestedAllocation);
    }
    closeModal();
  };

  return {
    allocations,
    currentAllocation,
    remainingQuantity,
    selectedPortfolioId,
    isModalOpen,
    setSelectedPortfolioId,
    handleAllocationChange,
    openPortfolioSelectionModal,
    closeModal,
    confirmPortfolioSelection
  };
};
