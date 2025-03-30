
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mockCashAccountsFlat, mockPortfoliosByInstitution } from "../../../data";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DestinationCashAccountsPanelProps {
  cashAllocations: Record<string, number>;
  onAllocationChange: (accountId: string, amount: number) => void;
  totalAmount: number;
  currency: string;
}

const DestinationCashAccountsPanel: React.FC<DestinationCashAccountsPanelProps> = ({
  cashAllocations,
  onAllocationChange,
  totalAmount,
  currency
}) => {
  const [isAccountsSheetOpen, setAccountsSheetOpen] = useState(false);
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  
  // Get selected account IDs
  const selectedAccountIds = Object.keys(cashAllocations).filter(id => cashAllocations[id] > 0);
  
  // Open accounts selection sheet
  const openAccountsSheet = () => {
    setTempAllocations({ ...cashAllocations });
    setAccountsSheetOpen(true);
  };
  
  // Apply temporary allocations to the actual allocations
  const applyAllocations = () => {
    Object.entries(tempAllocations).forEach(([accountId, amount]) => {
      if (amount > 0) {
        onAllocationChange(accountId, amount);
      }
    });
    setAccountsSheetOpen(false);
  };
  
  // Handle temporary allocation changes
  const handleTempAllocationChange = (accountId: string, amount: number) => {
    setTempAllocations(prev => ({ ...prev, [accountId]: amount }));
  };
  
  // Calculate remaining amount
  const currentAllocation = Object.values(cashAllocations).reduce((sum, amount) => sum + amount, 0);
  const remainingAmount = totalAmount - currentAllocation;

  return (
    <div className="space-y-4">
      {selectedAccountIds.length > 0 ? (
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
                const amount = cashAllocations[accountId];
                
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
                        max={remainingAmount + amount}
                        value={amount}
                        onChange={(e) => onAllocationChange(accountId, Number(e.target.value))}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAllocationChange(accountId, 0)}
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
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md border-gray-300">
          <p className="text-gray-500 mb-2">No destination cash accounts selected</p>
          <Button 
            variant="outline"
            onClick={openAccountsSheet}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Cash Account
          </Button>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={openAccountsSheet}
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          {selectedAccountIds.length > 0 ? "Manage Cash Accounts" : "Add Cash Account"}
        </Button>
      </div>
      
      {/* Accounts Sheet */}
      <Sheet open={isAccountsSheetOpen} onOpenChange={setAccountsSheetOpen}>
        <SheetContent className="sm:max-w-md" side="right">
          <SheetHeader>
            <SheetTitle>Select Cash Accounts</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {mockCashAccountsFlat.map(account => {
              const institution = mockPortfoliosByInstitution.find(
                inst => inst.id === account.institutionId
              );
              
              const differentCurrency = account.currency !== currency;
              
              return (
                <div key={account.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{account.name}</h4>
                      <p className="text-xs text-gray-500">
                        {institution?.name || "Unknown"} • {account.currency}
                        {differentCurrency && " (Currency conversion required)"}
                      </p>
                    </div>
                    <div className="text-sm text-right">
                      <div>Balance</div>
                      <div className="font-semibold">
                        {account.balance.toLocaleString('en-US', {
                          style: 'currency',
                          currency: account.currency
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Input
                      type="number"
                      min="0"
                      max={totalAmount}
                      value={tempAllocations[account.id] || 0}
                      onChange={(e) => handleTempAllocationChange(account.id, Number(e.target.value))}
                      className="w-full"
                      placeholder="0.00"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => handleTempAllocationChange(account.id, totalAmount)}
                    >
                      Max
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={applyAllocations} className="bg-black text-white hover:bg-gray-800">
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DestinationCashAccountsPanel;
