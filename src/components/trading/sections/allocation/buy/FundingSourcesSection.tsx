
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { 
  mockPortfoliosByInstitution, 
  mockCashAccountsFlat,
  mockCreditFacilitiesFlat
} from "../../../data";

interface FundingSourcesSectionProps {
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: "portfolios" | "institutions";
  instrumentPrice: number;
}

const FundingSourcesSection: React.FC<FundingSourcesSectionProps> = ({ 
  totalAmount, 
  currency, 
  order, 
  setOrder, 
  viewMode, 
  instrumentPrice 
}) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize with existing allocations if any
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.fundingAllocations) {
      order.fundingAllocations.forEach(allocation => {
        initialAllocations[allocation.sourceId] = allocation.amount / instrumentPrice;
      });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.fundingAllocations, instrumentPrice]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const totalQuantity = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    const totalAmount = totalQuantity * instrumentPrice;
    setCurrentAllocation(totalAmount);
  };
  
  const handleAllocationChange = (sourceId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [sourceId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Update order with new allocations
    const fundingAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([sourceId, quantity]) => {
        const source = activeTab === "cash" 
          ? [...mockCashAccountsFlat]
          : [...mockCreditFacilitiesFlat];
        
        const sourceItem = source.find(item => item.id === sourceId);
        
        return {
          sourceId,
          sourceType: activeTab as "cash" | "credit",
          amount: quantity * instrumentPrice,
          currency: sourceItem?.currency || currency
        };
      });
    
    setOrder({ ...order, fundingAllocations });
  };
  
  // Calculate the remaining amount to allocate
  const currentQuantityAllocation = Object.values(allocations).reduce((sum, qty) => sum + qty, 0);
  const remainingQuantity = (totalAmount / instrumentPrice) - currentQuantityAllocation;
  const remainingAmount = remainingQuantity * instrumentPrice;
  
  // Get a single source by ID
  const getSourceById = (sourceId: string) => {
    if (activeTab === "cash") {
      return mockCashAccountsFlat.find(item => item.id === sourceId);
    } else {
      return mockCreditFacilitiesFlat.find(item => item.id === sourceId);
    }
  };

  // Open modal for selecting a funding source
  const openSourceSelectionModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSourceId(null);
  };

  // Confirm selection and add allocation
  const confirmSourceSelection = () => {
    if (selectedSourceId) {
      const source = getSourceById(selectedSourceId);
      if (!source) return;
      
      const maxAvailable = activeTab === "cash" 
        ? (source as any).balance / instrumentPrice
        : (source as any).available / instrumentPrice;
      
      const suggestedAllocation = Math.min(
        maxAvailable,
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      
      handleAllocationChange(selectedSourceId, suggestedAllocation);
    }
    closeModal();
  };

  // Render selected funding sources table
  const renderSelectedSources = () => {
    const selectedSourceIds = Object.keys(allocations).filter(id => allocations[id] > 0);
    
    if (selectedSourceIds.length === 0) {
      return (
        <div className="text-center py-4 border rounded-md">
          <p className="text-gray-500">No funding sources selected</p>
          <Button 
            onClick={openSourceSelectionModal}
            className="mt-2 bg-black text-white hover:bg-gray-800"
          >
            Add Funding Source
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
                <TableHead>Type</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Funded Quantity</TableHead>
                <TableHead>Est. Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedSourceIds.map(sourceId => {
                const source = getSourceById(sourceId);
                if (!source) return null;
                
                const sourceType = activeTab === "cash" ? "Cash" : "Credit";
                const available = activeTab === "cash" 
                  ? (source as any).balance 
                  : (source as any).available;
                
                const quantity = allocations[sourceId];
                const estAmount = quantity * instrumentPrice;
                
                return (
                  <TableRow key={sourceId}>
                    <TableCell>{source.name}</TableCell>
                    <TableCell>{sourceType}</TableCell>
                    <TableCell>
                      {available.toLocaleString('en-US', {
                        style: 'currency',
                        currency: (source as any).currency || currency
                      })}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={available / instrumentPrice}
                        value={quantity}
                        onChange={(e) => handleAllocationChange(sourceId, Number(e.target.value))}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      {estAmount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: (source as any).currency || currency
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAllocationChange(sourceId, 0)}
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
            onClick={openSourceSelectionModal}
            className="bg-black text-white hover:bg-gray-800"
          >
            Add Funding Source
          </Button>
        </div>
      </div>
    );
  };
  
  // Source selection modal
  const renderSourceSelectionModal = () => {
    const sourceList = activeTab === "cash" 
      ? mockCashAccountsFlat
      : mockCreditFacilitiesFlat;
    
    // Filter out already selected sources
    const availableSources = sourceList.filter(
      source => !Object.keys(allocations).includes(source.id) || allocations[source.id] === 0
    );
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Funding Source</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "cash" | "credit")}>
            <TabsList className="mb-4">
              <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
              <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cash" className="mt-0">
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
                  {availableSources.length > 0 ? (
                    availableSources.map(source => {
                      const institution = mockPortfoliosByInstitution.find(
                        inst => inst.id === source.institutionId
                      );
                      
                      return (
                        <TableRow 
                          key={source.id} 
                          className={selectedSourceId === source.id ? "bg-gray-100" : ""}
                          onClick={() => setSelectedSourceId(source.id)}
                        >
                          <TableCell>
                            <input 
                              type="radio" 
                              checked={selectedSourceId === source.id}
                              onChange={() => setSelectedSourceId(source.id)}
                            />
                          </TableCell>
                          <TableCell>{source.name}</TableCell>
                          <TableCell>{institution?.name || "Unknown"}</TableCell>
                          <TableCell>
                            {(source as any).balance.toLocaleString('en-US', {
                              style: 'currency',
                              currency: (source as any).currency || currency
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
            </TabsContent>
            
            <TabsContent value="credit" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Select</TableHead>
                    <TableHead>Facility Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Available Credit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableSources.length > 0 ? (
                    availableSources.map(source => {
                      const institution = mockPortfoliosByInstitution.find(
                        inst => inst.id === source.institutionId
                      );
                      
                      return (
                        <TableRow 
                          key={source.id} 
                          className={selectedSourceId === source.id ? "bg-gray-100" : ""}
                          onClick={() => setSelectedSourceId(source.id)}
                        >
                          <TableCell>
                            <input 
                              type="radio" 
                              checked={selectedSourceId === source.id}
                              onChange={() => setSelectedSourceId(source.id)}
                            />
                          </TableCell>
                          <TableCell>{source.name}</TableCell>
                          <TableCell>{institution?.name || "Unknown"}</TableCell>
                          <TableCell>
                            {(source as any).available.toLocaleString('en-US', {
                              style: 'currency',
                              currency: (source as any).currency || currency
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No available credit facilities
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={confirmSourceSelection}
              disabled={!selectedSourceId}
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
        <h3 className="text-base font-medium mb-1">Funding Sources</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which accounts to use for funding this purchase
        </p>
        
        {renderSelectedSources()}
        {renderSourceSelectionModal()}
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

export default FundingSourcesSection;
