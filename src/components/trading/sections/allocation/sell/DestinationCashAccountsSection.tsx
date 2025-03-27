
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
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

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

  // Open modal for selecting a cash account
  const openAccountSelectionModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccountId(null);
  };

  // Confirm selection and add allocation
  const confirmAccountSelection = () => {
    if (selectedAccountId) {
      const suggestedAllocation = Math.min(
        totalAmount,
        remainingAmount > 0 ? remainingAmount : 0
      );
      
      handleAllocationChange(selectedAccountId, suggestedAllocation);
    }
    closeModal();
  };

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
                
                return (
                  <TableRow key={accountId}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{institution?.name || "Unknown"}</TableCell>
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
            Add Cash Account
          </Button>
        </div>
      </div>
    );
  };

  // Account selection modal
  const renderAccountSelectionModal = () => {
    // Filter out already selected accounts
    const availableAccounts = mockCashAccountsFlat.filter(
      account => !Object.keys(allocations).includes(account.id) || allocations[account.id] === 0
    );
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Destination Cash Account</DialogTitle>
          </DialogHeader>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableAccounts.length > 0 ? (
                availableAccounts.map(account => {
                  const institution = mockPortfoliosByInstitution.find(
                    inst => inst.id === account.institutionId
                  );
                  
                  return (
                    <TableRow 
                      key={account.id} 
                      className={selectedAccountId === account.id ? "bg-gray-100" : ""}
                      onClick={() => setSelectedAccountId(account.id)}
                    >
                      <TableCell>
                        <input 
                          type="radio" 
                          checked={selectedAccountId === account.id}
                          onChange={() => setSelectedAccountId(account.id)}
                        />
                      </TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{institution?.name || "Unknown"}</TableCell>
                      <TableCell>
                        {account.balance.toLocaleString('en-US', {
                          style: 'currency',
                          currency: account.currency
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
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
              onClick={confirmAccountSelection}
              disabled={!selectedAccountId}
            >
              Select
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
