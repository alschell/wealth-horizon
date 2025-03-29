
import { useState, useEffect } from "react";
import { TradeOrder } from "../../../../types";
import { 
  mockPortfoliosByInstitution, 
  mockCashAccountsFlat,
  mockCreditFacilitiesFlat
} from "../../../../data";

export interface UseFundingSourcesProps {
  totalAmount: number;
  instrumentPrice: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
}

export const useFundingSources = ({
  totalAmount,
  instrumentPrice, 
  currency,
  order,
  setOrder
}: UseFundingSourcesProps) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.fundingAllocations) {
      order.fundingAllocations.forEach(allocation => {
        initialAllocations[allocation.sourceId] = allocation.amount / instrumentPrice;
      });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.fundingAllocations, instrumentPrice]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const totalQuantity = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    const totalAmount = totalQuantity * instrumentPrice;
    setCurrentAllocation(totalAmount);
  };
  
  const handleAllocationChange = (sourceId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [sourceId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Update order with new allocations
    const fundingAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([sourceId, quantity]) => {
        const source = activeTab === "cash" 
          ? [...mockCashAccountsFlat]
          : [...mockCreditFacilitiesFlat];
        
        const sourceItem = source.find(item => item.id === sourceId);
        
        return {
          sourceId,
          sourceType: activeTab as "cash" | "credit",
          amount: quantity * instrumentPrice,
          currency: sourceItem?.currency || currency
        };
      });
    
    setOrder({ ...order, fundingAllocations });
  };
  
  // Calculate the remaining amount to allocate
  const currentQuantityAllocation = Object.values(allocations).reduce((sum, qty) => sum + qty, 0);
  const remainingQuantity = (totalAmount / instrumentPrice) - currentQuantityAllocation;
  const remainingAmount = remainingQuantity * instrumentPrice;
  
  // Get a single source by ID
  const getSourceById = (sourceId: string) => {
    if (activeTab === "cash") {
      return mockCashAccountsFlat.find(item => item.id === sourceId);
    } else {
      return mockCreditFacilitiesFlat.find(item => item.id === sourceId);
    }
  };

  // Open modal for selecting a funding source
  const openSourceSelectionModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSourceId(null);
  };

  // Confirm selection and add allocation
  const confirmSourceSelection = () => {
    if (selectedSourceId) {
      const source = getSourceById(selectedSourceId);
      if (!source) return;
      
      const maxAvailable = activeTab === "cash" 
        ? (source as any).balance / instrumentPrice
        : (source as any).available / instrumentPrice;
      
      const suggestedAllocation = Math.min(
        maxAvailable,
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      
      handleAllocationChange(selectedSourceId, suggestedAllocation);
    }
    closeModal();
  };

  // Get list of source IDs with allocations > 0
  const selectedSourceIds = Object.keys(allocations).filter(id => allocations[id] > 0);

  return {
    activeTab,
    setActiveTab,
    allocations,
    currentAllocation,
    remainingAmount,
    remainingQuantity,
    selectedSourceId,
    setSelectedSourceId,
    isModalOpen,
    selectedSourceIds,
    getSourceById,
    handleAllocationChange,
    openSourceSelectionModal,
    closeModal,
    confirmSourceSelection
  };
};
