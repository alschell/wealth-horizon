
import { useState, useEffect } from "react";
import { TradeOrder } from "../../../../types";
import { mockPortfoliosFlat } from "../../../../data";

interface UseSourcePortfoliosProps {
  totalQuantity: number;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
}

export const useSourcePortfolios = ({
  totalQuantity,
  selectedInstrument,
  order,
  setOrder
}: UseSourcePortfoliosProps) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([]);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});

  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.instrumentAllocations) {
      order.instrumentAllocations.forEach(allocation => {
        initialAllocations[allocation.portfolioId] = allocation.quantity;
      });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.instrumentAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [portfolioId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Update order with new allocations
    const instrumentAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([portfolioId, quantity]) => ({
        portfolioId,
        quantity
      }));
    
    setOrder({ ...order, instrumentAllocations });
  };
  
  // Get available holdings for the selected instrument in each portfolio
  const getAvailableHoldings = () => {
    if (!selectedInstrument) return {};
    
    const holdings: Record<string, number> = {};
    
    // Simulate available holdings for demo purposes
    mockPortfoliosFlat.forEach(portfolio => {
      const holding = portfolio.holdings.find(h => h.instrumentId === selectedInstrument.id);
      if (holding) {
        holdings[portfolio.id] = holding.quantity;
      }
    });
    
    return holdings;
  };
  
  const availableHoldings = getAvailableHoldings();
  
  // Calculate the remaining quantity to allocate
  const remainingQuantity = totalQuantity - currentAllocation;

  // Open modal for selecting portfolios
  const openPortfolioSelectionModal = () => {
    // Initialize temporary allocations with existing ones
    setTempAllocations({ ...allocations });
    
    // Initialize selected portfolios from existing allocations
    setSelectedPortfolios(
      Object.keys(allocations).filter(id => allocations[id] > 0)
    );
    
    setIsModalOpen(true);
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
      const availableQty = availableHoldings[portfolioId] || 0;
      const suggestedQty = Math.min(
        availableQty, 
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      setTempAllocations(prev => ({ ...prev, [portfolioId]: suggestedQty }));
    }
  };
  
  // Handle temp allocation change in modal
  const handleTempAllocationChange = (portfolioId: string, quantity: number) => {
    setTempAllocations(prev => ({ ...prev, [portfolioId]: quantity }));
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
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
    
    const instrumentAllocations = Object.entries(newAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([portfolioId, quantity]) => ({
        portfolioId,
        quantity
      }));
    
    setOrder({ ...order, instrumentAllocations });
    
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
    selectedPortfolios,
    tempAllocations,
    availableHoldings,
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
