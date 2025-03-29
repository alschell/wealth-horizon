import React from "react";
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
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Check, Info } from "lucide-react";
import { mockCashAccountsFlat, mockPortfoliosByInstitution } from "../../../../data";
import { CustomBadge } from "@/components/ui/custom-badge";

interface CashAccountSelectionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedAccounts: string[];
  tempAllocations: Record<string, number>;
  totalAmount: number;
  currency: string;
  tempTotalAllocation: number;
  isAllocationComplete: boolean;
  isAllocationExceeded: boolean;
  onSelectAccount: (accountId: string) => void;
  onAllocationChange: (accountId: string, amount: number) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const CashAccountSelectionModal: React.FC<CashAccountSelectionModalProps> = ({
  isOpen,
  setIsOpen,
  selectedAccounts,
  tempAllocations,
  totalAmount,
  currency,
  tempTotalAllocation,
  isAllocationComplete,
  isAllocationExceeded,
  onSelectAccount,
  onAllocationChange,
  onConfirm,
  onClose
}) => {
  // Get all available cash accounts
  const availableAccounts = mockCashAccountsFlat;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <CustomBadge variant={isAllocationComplete ? "success" : isAllocationExceeded ? "destructive" : "outline"}>
                {tempTotalAllocation.toLocaleString('en-US', {
                  style: 'currency',
                  currency
                })} / {totalAmount.toLocaleString('en-US', {
                  style: 'currency',
                  currency
                })} allocated
              </CustomBadge>
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
                        onChange={() => onSelectAccount(account.id)}
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
                        onChange={(e) => onAllocationChange(account.id, Number(e.target.value))}
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={onConfirm}
            disabled={availableAccounts.length === 0 || selectedAccounts.length === 0}
          >
            Confirm Selections
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashAccountSelectionModal;
