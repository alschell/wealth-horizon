
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
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { mockCashAccountsFlat, mockPortfoliosByInstitution } from "../../../../data";

interface SelectedCashAccountsTableProps {
  selectedAccountIds: string[];
  allocations: Record<string, number>;
  handleAllocationChange: (accountId: string, amount: number) => void;
  openAccountSelectionModal: () => void;
  currency: string;
  remainingAmount: number;
}

const SelectedCashAccountsTable: React.FC<SelectedCashAccountsTableProps> = ({
  selectedAccountIds,
  allocations,
  handleAllocationChange,
  openAccountSelectionModal,
  currency,
  remainingAmount
}) => {
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

export default SelectedCashAccountsTable;
