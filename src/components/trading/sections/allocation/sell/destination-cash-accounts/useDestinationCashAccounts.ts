import { useState, useEffect } from "react";
import { TradeOrder } from "../../../../types";
import { mockCashAccountsFlat } from "../../../../data";

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
  
  const remainingAmount = totalAmount - currentAllocation;

  const openAccountSelectionModal = () => {
    setTempAllocations({ ...allocations });
    setSelectedAccounts(
      Object.keys(allocations).filter(id => allocations[id] > 0)
    );
    setIsModalOpen(true);
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
    
    if (!tempAllocations[accountId]) {
      const suggestedAmount = Math.min(
        totalAmount, 
        remainingAmount > 0 ? remainingAmount : 0
      );
      setTempAllocations(prev => ({ ...prev, [accountId]: suggestedAmount }));
    }
  };
  
  const handleTempAllocationChange = (accountId: string, amount: number) => {
    setTempAllocations(prev => ({ ...prev, [accountId]: amount }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmAccountSelections = () => {
    const newAllocations = { ...allocations };
    
    Object.keys(newAllocations).forEach(accountId => {
      if (!selectedAccounts.includes(accountId)) {
        delete newAllocations[accountId];
      }
    });
    
    selectedAccounts.forEach(accountId => {
      newAllocations[accountId] = tempAllocations[accountId] || 0;
    });
    
    setAllocations(newAllocations);
    updateCurrentAllocation(newAllocations);
    
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
    
    closeModal();
  };

  const tempTotalAllocation = selectedAccounts.reduce(
    (sum, accountId) => sum + (tempAllocations[accountId] || 0), 
    0
  );
  
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
