
import { useState, useEffect } from "react";
import { TradeOrder } from "../../../types";
import { mockCashAccountsFlat } from "../../../data";

export interface UseDestinationCashAccountsProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
}

export const useDestinationCashAccounts = ({
  totalAmount,
  currency,
  order,
  setOrder
}: UseDestinationCashAccountsProps) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});

  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.depositAllocations) {
      order.depositAllocations
        .filter(allocation => allocation.destinationType === "cash")
        .forEach(allocation => {
          initialAllocations[allocation.destinationId] = allocation.amount || 0;
        });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.depositAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, amount) => sum + amount, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (accountId: string, amount: number) => {
    const updatedAllocations = { ...allocations, [accountId]: amount };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Filter out other destination types (if any) and add updated cash account allocations
    const otherAllocations = order.depositAllocations
      ? order.depositAllocations.filter(a => a.destinationType !== "cash")
      : [];
    
    const cashAllocations = Object.entries(updatedAllocations)
      .filter(([_, amount]) => amount > 0)
      .map(([destinationId, amount]) => {
        const account = mockCashAccountsFlat.find(a => a.id === destinationId);
        return {
          destinationId,
          destinationType: "cash" as const,
          amount,
          currency: account?.currency || currency
        };
      });
    
    setOrder({
      ...order,
      depositAllocations: [...otherAllocations, ...cashAllocations]
    });
  };
  
  // Calculate the remaining amount to allocate
  const remainingAmount = totalAmount - currentAllocation;

  // Open modal for selecting accounts
  const openAccountSelectionModal = () => {
    // Initialize temporary allocations with existing ones
    setTempAllocations({ ...allocations });
    
    // Initialize selected accounts from existing allocations
    setSelectedAccounts(
      Object.keys(allocations).filter(id => allocations[id] > 0)
    );
    
    setIsModalOpen(true);
  };

  // Handle account selection in modal
  const handleAccountSelect = (accountId: string) => {
    setSelectedAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
    
    // Initialize amount with a default value if not already set
    if (!tempAllocations[accountId]) {
      const suggestedAmount = Math.min(
        totalAmount, 
        remainingAmount > 0 ? remainingAmount : 0
      );
      setTempAllocations(prev => ({ ...prev, [accountId]: suggestedAmount }));
    }
  };
  
  // Handle temp allocation change in modal
  const handleTempAllocationChange = (accountId: string, amount: number) => {
    setTempAllocations(prev => ({ ...prev, [accountId]: amount }));
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Confirm selections and allocations from modal
  const confirmAccountSelections = () => {
    // Update allocations with temp allocations for selected accounts
    const newAllocations = { ...allocations };
    
    // Clear allocations for accounts that are no longer selected
    Object.keys(newAllocations).forEach(accountId => {
      if (!selectedAccounts.includes(accountId)) {
        delete newAllocations[accountId];
      }
    });
    
    // Add or update allocations for selected accounts
    selectedAccounts.forEach(accountId => {
      newAllocations[accountId] = tempAllocations[accountId] || 0;
    });
    
    // Update state and order
    setAllocations(newAllocations);
    updateCurrentAllocation(newAllocations);
    
    // Filter out other destination types (if any) and add updated cash account allocations
    const otherAllocations = order.depositAllocations
      ? order.depositAllocations.filter(a => a.destinationType !== "cash")
      : [];
    
    const cashAllocations = Object.entries(newAllocations)
      .filter(([_, amount]) => amount > 0)
      .map(([destinationId, amount]) => {
        const account = mockCashAccountsFlat.find(a => a.id === destinationId);
        return {
          destinationId,
          destinationType: "cash" as const,
          amount,
          currency: account?.currency || currency
        };
      });
    
    setOrder({
      ...order,
      depositAllocations: [...otherAllocations, ...cashAllocations]
    });
    
    // Close modal
    closeModal();
  };

  // Calculate total temporary allocation
  const tempTotalAllocation = selectedAccounts.reduce(
    (sum, accountId) => sum + (tempAllocations[accountId] || 0), 
    0
  );
  
  // Check if the total matches the required amount
  const isAllocationComplete = tempTotalAllocation === totalAmount;
  const isAllocationExceeded = tempTotalAllocation > totalAmount;

  return {
    allocations,
    currentAllocation,
    remainingAmount,
    isModalOpen,
    setIsModalOpen,
    selectedAccounts,
    tempAllocations,
    tempTotalAllocation,
    isAllocationComplete,
    isAllocationExceeded,
    handleAllocationChange,
    openAccountSelectionModal,
    handleAccountSelect,
    handleTempAllocationChange,
    closeModal,
    confirmAccountSelections
  };
};
