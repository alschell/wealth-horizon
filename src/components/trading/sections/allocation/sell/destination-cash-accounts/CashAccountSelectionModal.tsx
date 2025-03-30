
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Check, ChevronRight, AlertCircle } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { mockPortfoliosByInstitution } from "../../../../data";
import { Info } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [institutionsExpanded, setInstitutionsExpanded] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize all institutions as expanded when modal opens
  useEffect(() => {
    if (isOpen) {
      const expandedState: Record<string, boolean> = {};
      mockPortfoliosByInstitution.forEach(institution => {
        expandedState[institution.id] = true;
      });
      setInstitutionsExpanded(expandedState);
      setSearchQuery("");
    }
  }, [isOpen]);
  
  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
      setIsSubmitting(false);
    }, 300);
  };
  
  const toggleInstitution = (institutionId: string) => {
    setInstitutionsExpanded(prev => ({
      ...prev,
      [institutionId]: !prev[institutionId]
    }));
  };
  
  // Calculate allocation percentage
  const allocationPercentage = Math.min(100, (tempTotalAllocation / totalAmount) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Destination Cash Accounts</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total amount: {totalAmount.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}</span>
              <span>Allocated: {tempTotalAllocation.toLocaleString('en-US', {
                style: 'currency',
                currency
              })}</span>
            </div>
            
            <Progress value={allocationPercentage} className="h-2" />
            
            {isAllocationComplete ? (
              <div className="text-xs text-green-600 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                <span>Perfect allocation</span>
              </div>
            ) : isAllocationExceeded ? (
              <div className="text-xs text-red-600">
                Over-allocated by {(tempTotalAllocation - totalAmount).toLocaleString('en-US', {
                  style: 'currency',
                  currency
                })}
              </div>
            ) : (
              <div className="text-xs text-amber-600">
                {(totalAmount - tempTotalAllocation).toLocaleString('en-US', {
                  style: 'currency',
                  currency
                })} remaining to allocate
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 h-10"
              placeholder="Search cash accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="max-h-[40vh] overflow-y-auto pr-1">
            {mockPortfoliosByInstitution.map(institution => {
              // Filter based on search query if present
              const institutionMatches = institution.name.toLowerCase().includes(searchQuery.toLowerCase());
              const hasMatchingEntities = institution.legalEntities.some(entity => 
                entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entity.cashAccounts?.some(account => 
                  account.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
              );
              
              if (searchQuery && !institutionMatches && !hasMatchingEntities) {
                return null;
              }
              
              // Check if institution has any cash accounts
              const hasCashAccounts = institution.legalEntities.some(entity =>
                entity.cashAccounts && entity.cashAccounts.length > 0
              );
              
              if (!hasCashAccounts) {
                return null;
              }
              
              return (
                <div key={institution.id} className="mb-4 border rounded-md overflow-hidden">
                  <div
                    className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleInstitution(institution.id)}
                  >
                    <h3 className="font-medium">{institution.name}</h3>
                    <ChevronRight 
                      className={`h-5 w-5 transition-transform ${institutionsExpanded[institution.id] ? 'rotate-90' : ''}`} 
                    />
                  </div>
                  
                  {institutionsExpanded[institution.id] && (
                    <div className="p-2">
                      {institution.legalEntities.map(entity => {
                        // Filter entity's cash accounts based on search
                        const entityCashAccounts = entity.cashAccounts?.filter(account => 
                          !searchQuery || 
                          account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          institution.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        
                        if (!entityCashAccounts || entityCashAccounts.length === 0) {
                          return null;
                        }
                        
                        return (
                          <div key={entity.id} className="ml-4 mb-3">
                            <h4 className="text-sm font-medium mb-2">{entity.name}</h4>
                            <div className="space-y-2">
                              {entityCashAccounts.map(account => {
                                const isSelected = selectedAccounts.includes(account.id);
                                const currentAmount = tempAllocations[account.id] || 0;
                                const differentCurrency = account.currency !== currency;
                                
                                return (
                                  <div key={account.id} 
                                       className={`pl-4 py-2 border-l-2 ${isSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
                                    <div className="flex justify-between items-center mb-1">
                                      <div className="flex items-center">
                                        <input
                                          type="checkbox"
                                          id={`account-${account.id}`}
                                          checked={isSelected}
                                          onChange={() => onSelectAccount(account.id)}
                                          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor={`account-${account.id}`} className="text-sm cursor-pointer flex items-center">
                                          {account.name} 
                                          <span className="text-xs bg-gray-100 px-1 rounded ml-2">{account.currency}</span>
                                          {differentCurrency && (
                                            <TooltipProvider>
                                              <Tooltip>
                                                <TooltipTrigger>
                                                  <Info className="h-3 w-3 ml-1 text-amber-500" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                  <p>Different currency from the order ({currency}). A conversion will be applied.</p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          )}
                                        </label>
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        Balance: {account.balance?.toLocaleString('en-US', {
                                          style: 'currency',
                                          currency: account.currency
                                        })}
                                      </span>
                                    </div>
                                    
                                    {isSelected && (
                                      <div className="flex items-center gap-2 mt-2 pl-6">
                                        <Input
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          value={currentAmount || ""}
                                          onChange={(e) => onAllocationChange(account.id, Number(e.target.value))}
                                          className="w-36 h-8"
                                          placeholder="0.00"
                                        />
                                        
                                        {!isAllocationComplete && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs h-8"
                                            onClick={() => onAllocationChange(account.id, Math.max(0, totalAmount - (tempTotalAllocation - currentAmount)))}
                                          >
                                            Add Remaining
                                          </Button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleConfirm}
            disabled={isSubmitting || selectedAccounts.length === 0}
          >
            {isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashAccountSelectionModal;
