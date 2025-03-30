
import { useState, useEffect } from "react";
import { TradeOrder } from "../../../../types";

interface UseDestinationPortfoliosProps {
  totalQuantity: number;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  instrumentPrice: number;
  currency: string;
}

export const useDestinationPortfolios = ({
  totalQuantity,
  selectedInstrument,
  order,
  setOrder,
  instrumentPrice,
  currency
}: UseDestinationPortfoliosProps) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([]);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});

  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.depositAllocations) {
      order.depositAllocations
        .filter(allocation => allocation.destinationType === "portfolio")
        .forEach(allocation => {
          if (allocation.quantity) {
            initialAllocations[allocation.destinationId] = allocation.quantity;
          }
        });
    }
    
    setAllocations(initialAllocations);
    setSelectedPortfolios(Object.keys(initialAllocations));
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
  const openPortfolioSelectionModal = () => {
    // Initialize temporary allocations with existing ones
    setTempAllocations({ ...allocations });
    
    // Initialize selected portfolios from existing allocations
    setSelectedPortfolios(
      Object.keys(allocations).filter(id => allocations[id] > 0)
    );
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle portfolio selection in modal
  const handlePortfolioSelect = (portfolioId: string) => {
    setSelectedPortfolios(prev => {
      if (prev.includes(portfolioId)) {
        return prev.filter(id => id !== portfolioId);
      } else {
        return [...prev, portfolioId];
      }
    });
    
    // Initialize quantity with a default value if not already set
    if (!tempAllocations[portfolioId]) {
      const suggestedQty = Math.min(
        remainingQuantity > 0 ? remainingQuantity : 0, 
        1 // Default to 1 or remaining quantity, whichever is smaller
      );
      setTempAllocations(prev => ({ ...prev, [portfolioId]: suggestedQty }));
    }
  };
  
  // Handle temp allocation change in modal
  const handleTempAllocationChange = (portfolioId: string, quantity: number) => {
    setTempAllocations(prev => ({ ...prev, [portfolioId]: quantity }));
  };

  // Confirm selections and allocations from modal
  const confirmPortfolioSelections = () => {
    // Update allocations with temp allocations for selected portfolios
    const newAllocations = { ...allocations };
    
    // Clear allocations for portfolios that are no longer selected
    Object.keys(newAllocations).forEach(portfolioId => {
      if (!selectedPortfolios.includes(portfolioId)) {
        delete newAllocations[portfolioId];
      }
    });
    
    // Add or update allocations for selected portfolios
    selectedPortfolios.forEach(portfolioId => {
      newAllocations[portfolioId] = tempAllocations[portfolioId] || 0;
    });
    
    // Update state and order
    setAllocations(newAllocations);
    updateCurrentAllocation(newAllocations);
    
    const portfolioAllocations = Object.entries(newAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([destinationId, quantity]) => ({
        destinationId,
        destinationType: "portfolio" as const,
        quantity
      }));
    
    // Keep non-portfolio allocations
    const otherAllocations = order.depositAllocations
      ? order.depositAllocations.filter(a => a.destinationType !== "portfolio")
      : [];
    
    setOrder({
      ...order,
      depositAllocations: [...otherAllocations, ...portfolioAllocations]
    });
    
    // Close modal
    closeModal();
  };

  // Calculate total temporary allocation
  const tempTotalAllocation = selectedPortfolios.reduce(
    (sum, portfolioId) => sum + (tempAllocations[portfolioId] || 0), 
    0
  );
  
  // Check if the total matches the required quantity
  const isAllocationComplete = tempTotalAllocation === totalQuantity;
  const isAllocationExceeded = tempTotalAllocation > totalQuantity;

  return {
    allocations,
    currentAllocation,
    remainingQuantity,
    isModalOpen,
    setIsModalOpen,
    selectedPortfolios, // Changed from selectedPortfolioIds to selectedPortfolios
    tempAllocations,
    tempTotalAllocation,
    isAllocationComplete,
    isAllocationExceeded,
    handleAllocationChange,
    openPortfolioSelectionModal,
    handlePortfolioSelect,
    handleTempAllocationChange,
    closeModal,
    confirmPortfolioSelections
  };
};
