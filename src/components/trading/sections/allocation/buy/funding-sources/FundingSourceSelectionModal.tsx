
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, ChevronRight } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Group data hierarchically
  const [institutionsExpanded, setInstitutionsExpanded] = useState<Record<string, boolean>>({});

  // Initialize temporary allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations(currentAllocations);
      
      // Calculate total shares from current allocations
      const total = Object.values(currentAllocations).reduce((sum, qty) => sum + qty, 0);
      setTotalShares(total);
      setIsSubmitting(false);
      setSearchQuery("");
      
      // Initialize all institutions as expanded
      const expandedState: Record<string, boolean> = {};
      mockPortfoliosByInstitution.forEach(institution => {
        expandedState[institution.id] = true;
      });
      setInstitutionsExpanded(expandedState);
    }
  }, [isOpen, currentAllocations]);

  const handleTempAllocationChange = (sourceId: string, quantity: number) => {
    const newAllocations = { ...tempAllocations, [sourceId]: quantity };
    setTempAllocations(newAllocations);
    
    // Update total shares
    const newTotal = Object.values(newAllocations).reduce((sum, qty) => sum + qty, 0);
    setTotalShares(newTotal);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      onConfirm(tempAllocations);
      onClose();
      setIsSubmitting(false);
    }, 300);
  };
  
  const toggleInstitution = (institutionId: string) => {
    setInstitutionsExpanded(prev => ({
      ...prev,
      [institutionId]: !prev[institutionId]
    }));
  };

  // Get required shares needed to fully fund the order
  const requiredShares = totalAmount / instrumentPrice;
  const remainingShares = requiredShares - totalShares;
  
  // Calculate allocation percentage
  const allocationPercentage = Math.min(100, (totalShares / requiredShares) * 100);

  // Render hierarchical cash accounts list
  const renderCashAccounts = () => {
    return mockPortfoliosByInstitution.map(institution => {
      // Check if any entity or account in this institution matches the search query
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
                
                if (entityCashAccounts?.length === 0 && searchQuery) {
                  return null;
                }
                
                return (
                  <div key={entity.id} className="ml-4 mb-3">
                    <h4 className="text-sm font-medium mb-2">{entity.name}</h4>
                    <div className="space-y-2">
                      {entityCashAccounts?.map(account => {
                        // Find the account in the flat list to get full details
                        const fullAccount = mockCashAccountsFlat.find(a => a.id === account.id);
                        if (!fullAccount) return null;
                        
                        const maxShares = Math.floor(fullAccount.balance / instrumentPrice);
                        const currentShares = tempAllocations[account.id] || 0;
                        
                        return (
                          <div key={account.id} className="pl-4 py-2 border-l-2 border-gray-200">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{account.name}</span>
                              <span className="text-xs text-gray-500">
                                {fullAccount.balance.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: fullAccount.currency || currency
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="0"
                                max={maxShares}
                                value={currentShares || ""}
                                onChange={(e) => handleTempAllocationChange(account.id, Number(e.target.value))}
                                className="w-24 h-8"
                                placeholder="0"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => handleTempAllocationChange(account.id, maxShares)}
                              >
                                Max ({maxShares})
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-8 ml-1"
                                onClick={() => handleTempAllocationChange(account.id, Math.min(maxShares, remainingShares > 0 ? Math.ceil(remainingShares) : 0))}
                                disabled={remainingShares <= 0}
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add Remaining
                              </Button>
                            </div>
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
    });
  };
  
  // Render hierarchical credit facilities list
  const renderCreditFacilities = () => {
    return mockPortfoliosByInstitution.map(institution => {
      // Check if any entity or credit facility in this institution matches the search query
      const institutionMatches = institution.name.toLowerCase().includes(searchQuery.toLowerCase());
      const hasMatchingEntities = institution.legalEntities.some(entity => 
        entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.creditFacilities?.some(facility => 
          facility.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      
      if (searchQuery && !institutionMatches && !hasMatchingEntities) {
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
                // Filter entity's credit facilities based on search
                const entityCreditFacilities = entity.creditFacilities?.filter(facility => 
                  !searchQuery || 
                  facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  institution.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
                if (entityCreditFacilities?.length === 0 && searchQuery) {
                  return null;
                }
                
                return (
                  <div key={entity.id} className="ml-4 mb-3">
                    <h4 className="text-sm font-medium mb-2">{entity.name}</h4>
                    <div className="space-y-2">
                      {entityCreditFacilities?.map(facility => {
                        // Find the facility in the flat list to get full details
                        const fullFacility = mockCreditFacilitiesFlat.find(f => f.id === facility.id);
                        if (!fullFacility) return null;
                        
                        const maxShares = Math.floor(fullFacility.available / instrumentPrice);
                        const currentShares = tempAllocations[facility.id] || 0;
                        
                        return (
                          <div key={facility.id} className="pl-4 py-2 border-l-2 border-gray-200">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{facility.name}</span>
                              <span className="text-xs text-gray-500">
                                {fullFacility.available.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: fullFacility.currency || currency
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="0"
                                max={maxShares}
                                value={currentShares || ""}
                                onChange={(e) => handleTempAllocationChange(facility.id, Number(e.target.value))}
                                className="w-24 h-8"
                                placeholder="0"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => handleTempAllocationChange(facility.id, maxShares)}
                              >
                                Max ({maxShares})
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-8 ml-1"
                                onClick={() => handleTempAllocationChange(facility.id, Math.min(maxShares, remainingShares > 0 ? Math.ceil(remainingShares) : 0))}
                                disabled={remainingShares <= 0}
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add Remaining
                              </Button>
                            </div>
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
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Funding Sources</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total number of shares to be allocated: {Math.ceil(requiredShares)}</span>
              <span>Shares allocated: {totalShares.toFixed(2)}</span>
            </div>
            
            <Progress value={allocationPercentage} className="h-2" />
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 h-10"
              placeholder={`Search ${activeTab === "cash" ? "cash accounts" : "credit facilities"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="cash" value={activeTab} onValueChange={(v) => {
            setActiveTab(v as "cash" | "credit");
            setSearchQuery("");
          }}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
              <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cash" className="mt-4">
              <div className="max-h-[40vh] overflow-y-auto pr-1">
                {renderCashAccounts()}
              </div>
            </TabsContent>
            
            <TabsContent value="credit" className="mt-4">
              <div className="max-h-[40vh] overflow-y-auto pr-1">
                {renderCreditFacilities()}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundingSourceSelectionModal;
