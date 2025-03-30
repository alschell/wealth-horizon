
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  mockPortfoliosByInstitution, 
  mockCashAccountsFlat, 
  mockCreditFacilitiesFlat 
} from "../../../../data";

interface FundingSourceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: Record<string, number>) => void;
  totalAmount: number;
  currentAllocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
}

const FundingSourceSelectionModal: React.FC<FundingSourceSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  currentAllocations,
  instrumentPrice,
  currency
}) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [totalShares, setTotalShares] = useState(0);

  // Initialize temporary allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations(currentAllocations);
      
      // Calculate total shares from current allocations
      const total = Object.values(currentAllocations).reduce((sum, qty) => sum + qty, 0);
      setTotalShares(total);
    }
  }, [isOpen, currentAllocations]);

  const handleAllocationChange = (sourceId: string, quantity: number) => {
    const newAllocations = { ...tempAllocations, [sourceId]: quantity };
    setTempAllocations(newAllocations);
    
    // Update total shares
    const newTotal = Object.values(newAllocations).reduce((sum, qty) => sum + qty, 0);
    setTotalShares(newTotal);
  };

  const handleConfirm = () => {
    onConfirm(tempAllocations);
    onClose();
  };

  // Get required shares needed to fully fund the order
  const requiredShares = totalAmount / instrumentPrice;
  const remainingShares = requiredShares - totalShares;
  
  // Check if allocations exactly equal required shares
  const isAllocationComplete = Math.abs(totalShares - requiredShares) < 0.001;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen => !setIsOpen && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Funding Sources</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">Required funds</p>
              <p className="text-lg font-bold">
                {totalAmount.toLocaleString('en-US', {
                  style: 'currency',
                  currency
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Total number of shares</p>
              <p className="text-lg font-bold">
                {Math.ceil(requiredShares)}
              </p>
            </div>
          </div>

          <div className={`p-2 mb-4 text-sm rounded-md ${
            remainingShares > 0 
              ? "bg-yellow-50 text-yellow-800" 
              : "bg-green-50 text-green-800"
          }`}>
            {remainingShares > 0 
              ? `Still need to allocate ${Math.ceil(remainingShares)} more shares`
              : "All shares have been allocated"}
          </div>

          <Tabs defaultValue="cash" value={activeTab} onValueChange={(v) => setActiveTab(v as "cash" | "credit")}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
              <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cash" className="mt-4 space-y-6 max-h-[50vh] overflow-y-auto">
              {mockPortfoliosByInstitution.map(institution => (
                <div key={institution.id} className="space-y-4">
                  <h3 className="text-md font-medium">{institution.name}</h3>
                  
                  {institution.legalEntities.map(legalEntity => {
                    // Filter cash accounts for this legal entity
                    const legalEntityCashAccounts = mockCashAccountsFlat.filter(
                      account => account.legalEntityId === legalEntity.id
                    );
                    
                    if (legalEntityCashAccounts.length === 0) return null;
                    
                    return (
                      <div key={legalEntity.id} className="pl-4 border-l-2 border-gray-200 space-y-4">
                        <h4 className="text-sm font-medium">{legalEntity.name}</h4>
                        
                        {legalEntityCashAccounts.map(account => {
                          const maxSharesFromAccount = Math.floor(account.balance / instrumentPrice);
                          const currentShares = tempAllocations[account.id] || 0;
                          const estimatedAmount = currentShares * instrumentPrice;
                          
                          return (
                            <div key={account.id} className="p-4 border rounded-md ml-2">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium">{account.name}</h4>
                                  <p className="text-xs text-gray-500">{account.currency} Account</p>
                                </div>
                                <div className="text-sm text-right">
                                  <div>Available</div>
                                  <div className="font-semibold">
                                    {account.balance.toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: account.currency
                                    })}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min="0"
                                    max={maxSharesFromAccount}
                                    value={currentShares || ""}
                                    onChange={(e) => handleAllocationChange(account.id, Number(e.target.value))}
                                    className="w-full"
                                    placeholder="Number of shares"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="whitespace-nowrap"
                                    onClick={() => handleAllocationChange(
                                      account.id,
                                      Math.min(maxSharesFromAccount, Math.ceil(remainingShares > 0 ? remainingShares : 0))
                                    )}
                                  >
                                    Max
                                  </Button>
                                </div>
                                
                                {currentShares > 0 && (
                                  <p className="text-sm text-gray-600">
                                    Est. amount: {estimatedAmount.toLocaleString('en-US', {
                                      style: 'currency', 
                                      currency: account.currency
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="credit" className="mt-4 space-y-6 max-h-[50vh] overflow-y-auto">
              {mockPortfoliosByInstitution.map(institution => (
                <div key={institution.id} className="space-y-4">
                  <h3 className="text-md font-medium">{institution.name}</h3>
                  
                  {institution.legalEntities.map(legalEntity => {
                    // Filter credit facilities for this legal entity
                    const legalEntityFacilities = mockCreditFacilitiesFlat.filter(
                      facility => facility.legalEntityId === legalEntity.id
                    );
                    
                    if (legalEntityFacilities.length === 0) return null;
                    
                    return (
                      <div key={legalEntity.id} className="pl-4 border-l-2 border-gray-200 space-y-4">
                        <h4 className="text-sm font-medium">{legalEntity.name}</h4>
                        
                        {legalEntityFacilities.map(facility => {
                          const maxSharesFromFacility = Math.floor(facility.available / instrumentPrice);
                          const currentShares = tempAllocations[facility.id] || 0;
                          const estimatedAmount = currentShares * instrumentPrice;
                          
                          return (
                            <div key={facility.id} className="p-4 border rounded-md ml-2">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium">{facility.name}</h4>
                                  <p className="text-xs text-gray-500">{facility.currency} Credit Line</p>
                                </div>
                                <div className="text-sm text-right">
                                  <div>Available</div>
                                  <div className="font-semibold">
                                    {facility.available.toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: facility.currency
                                    })}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min="0"
                                    max={maxSharesFromFacility}
                                    value={currentShares || ""}
                                    onChange={(e) => handleAllocationChange(facility.id, Number(e.target.value))}
                                    className="w-full"
                                    placeholder="Number of shares"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="whitespace-nowrap"
                                    onClick={() => handleAllocationChange(
                                      facility.id,
                                      Math.min(maxSharesFromFacility, Math.ceil(remainingShares > 0 ? remainingShares : 0))
                                    )}
                                  >
                                    Max
                                  </Button>
                                </div>
                                
                                {currentShares > 0 && (
                                  <p className="text-sm text-gray-600">
                                    Est. amount: {estimatedAmount.toLocaleString('en-US', {
                                      style: 'currency', 
                                      currency: facility.currency
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            disabled={!isAllocationComplete}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundingSourceSelectionModal;
