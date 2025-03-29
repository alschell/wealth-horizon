
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TradeOrder } from "../../../types";
import { AllocationSummary } from "../AllocationSummary";
import { mockPortfoliosByInstitution, mockCashAccountsFlat } from "../../../data";
import { Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DestinationCashAccountsSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
}

const DestinationCashAccountsSection: React.FC<DestinationCashAccountsSectionProps> = ({ 
  totalAmount, 
  currency, 
  order, 
  setOrder, 
  viewMode 
}) => {
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
    setSelectedAccounts([]);
    setTempAllocations({});
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

  // Render selected accounts table
  const renderSelectedAccounts = () => {
    const selectedAccountIds = Object.keys(allocations).filter(id => allocations[id] > 0);
    
    if (selectedAccountIds.length === 0) {
      return (
        <div className="text-center py-4 border rounded-md">
          <p className="text-gray-500">No destination cash accounts selected</p>
          <Button 
            onClick={openAccountSelectionModal}
            className="mt-2 bg-black text-white hover:bg-gray-800"
          >
            Add Cash Account
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedAccountIds.map(accountId => {
                const account = mockCashAccountsFlat.find(a => a.id === accountId);
                if (!account) return null;
                
                const institution = mockPortfoliosByInstitution.find(
                  inst => inst.id === account.institutionId
                );
                
                const differentCurrency = account.currency !== currency;
                
                return (
                  <TableRow key={accountId}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{institution?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {account.currency}
                        {differentCurrency && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 ml-1 text-amber-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Different currency from the order ({currency}). A conversion will be applied.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {account.balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: account.currency
                      })}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={remainingAmount + allocations[accountId]}
                        value={allocations[accountId]}
                        onChange={(e) => handleAllocationChange(accountId, Number(e.target.value))}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAllocationChange(accountId, 0)}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={openAccountSelectionModal}
            className="bg-black text-white hover:bg-gray-800"
          >
            Manage Cash Accounts
          </Button>
        </div>
      </div>
    );
  };

  // Account selection modal
  const renderAccountSelectionModal = () => {
    // Get all available cash accounts
    const availableAccounts = mockCashAccountsFlat;
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Destination Cash Accounts</DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Select which cash accounts to deposit the proceeds into and specify the amount for each. 
              The total must match the order amount of {totalAmount.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}.
            </p>
            
            <div className="mt-2 flex items-center justify-between">
              <div>
                <Badge variant={isAllocationComplete ? "success" : isAllocationExceeded ? "destructive" : "outline"}>
                  {tempTotalAllocation.toLocaleString('en-US', {
                    style: 'currency',
                    currency
                  })} / {totalAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency
                  })} allocated
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {isAllocationComplete ? (
                  <span className="text-green-600 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Perfect allocation
                  </span>
                ) : isAllocationExceeded ? (
                  <span className="text-red-600">
                    Over-allocated by {(tempTotalAllocation - totalAmount).toLocaleString('en-US', {
                      style: 'currency',
                      currency
                    })}
                  </span>
                ) : (
                  <span className="text-amber-600">
                    {(totalAmount - tempTotalAllocation).toLocaleString('en-US', {
                      style: 'currency',
                      currency
                    })} remaining to allocate
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Amount to Deposit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableAccounts.length > 0 ? (
                availableAccounts.map(account => {
                  const institution = mockPortfoliosByInstitution.find(
                    inst => inst.id === account.institutionId
                  );
                  
                  const isSelected = selectedAccounts.includes(account.id);
                  const differentCurrency = account.currency !== currency;
                  
                  return (
                    <TableRow 
                      key={account.id} 
                      className={isSelected ? "bg-gray-50" : ""}
                    >
                      <TableCell>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleAccountSelect(account.id)}
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{institution?.name || "Unknown"}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {account.currency}
                          {differentCurrency && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 ml-1 text-amber-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Different currency from the order ({currency}). A conversion will be applied.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {account.balance.toLocaleString('en-US', {
                          style: 'currency',
                          currency: account.currency
                        })}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={tempAllocations[account.id] || 0}
                          onChange={(e) => handleTempAllocationChange(account.id, Number(e.target.value))}
                          disabled={!isSelected}
                          className="w-24"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No available cash accounts
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={confirmAccountSelections}
              disabled={availableAccounts.length === 0 || selectedAccounts.length === 0}
            >
              Confirm Selections
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Destination Cash Accounts</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which cash accounts to deposit the proceeds into
        </p>
        
        {renderSelectedAccounts()}
        {renderAccountSelectionModal()}
      </div>
      
      <AllocationSummary
        totalAmount={totalAmount}
        currency={currency}
        currentAllocation={currentAllocation}
        remainingAmount={remainingAmount}
      />
    </div>
  );
};

export default DestinationCashAccountsSection;
