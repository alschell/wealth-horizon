
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  OrderType,
  TradeOrder,
  ViewMode,
  AllocationItem
} from "../types";
import { 
  mockPortfoliosByInstitution, 
  mockPortfoliosFlat,
  mockCashAccountsByInstitution,
  mockCashAccountsFlat,
  mockCreditFacilitiesByInstitution,
  mockCreditFacilitiesFlat
} from "../data";

interface TradingAllocationProps {
  orderType: OrderType;
  selectedInstrument: any;
  quantity: number | "";
  price: number | "";
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  [key: string]: any;
}

const TradingAllocation: React.FC<TradingAllocationProps> = ({
  orderType,
  selectedInstrument,
  quantity,
  price,
  order,
  setOrder
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("portfolios");
  
  const totalAmount = typeof quantity === 'number' && typeof price === 'number' 
    ? quantity * price 
    : 0;

  // For buy orders: funding sources and destination portfolios
  // For sell orders: source portfolios and destination cash accounts
  const renderContent = () => {
    if (orderType === "buy") {
      return (
        <div className="space-y-6">
          <FundingSourcesSection 
            totalAmount={totalAmount} 
            currency={selectedInstrument?.currency || "USD"}
            order={order}
            setOrder={setOrder}
            viewMode={viewMode}
            instrumentPrice={typeof price === 'number' ? price : 0}
          />
          
          <DestinationPortfoliosSection
            totalQuantity={typeof quantity === 'number' ? quantity : 0}
            order={order}
            setOrder={setOrder}
            viewMode={viewMode}
          />
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <SourcePortfoliosSection
            totalQuantity={typeof quantity === 'number' ? quantity : 0}
            selectedInstrument={selectedInstrument}
            order={order}
            setOrder={setOrder}
            viewMode={viewMode}
            price={typeof price === 'number' ? price : 0}
          />
          
          <DestinationCashAccountsSection
            totalAmount={totalAmount}
            currency={selectedInstrument?.currency || "USD"}
            order={order}
            setOrder={setOrder}
            viewMode={viewMode}
          />
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {orderType === "buy" 
            ? "Allocate Funding & Destination" 
            : "Allocate Source & Proceeds"}
        </h3>
        
        <div className="flex border rounded-md overflow-hidden">
          <Button
            type="button"
            variant={viewMode === "portfolios" ? "default" : "outline"}
            className={`px-3 py-1 text-sm rounded-none ${
              viewMode === "portfolios" ? "bg-black text-white" : ""
            }`}
            onClick={() => setViewMode("portfolios")}
          >
            Portfolios View
          </Button>
          <Button
            type="button"
            variant={viewMode === "institutions" ? "default" : "outline"}
            className={`px-3 py-1 text-sm rounded-none ${
              viewMode === "institutions" ? "bg-black text-white" : ""
            }`}
            onClick={() => setViewMode("institutions")}
          >
            Institutions View
          </Button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

// Component for selecting funding sources in a buy order
const FundingSourcesSection: React.FC<{
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: ViewMode;
  instrumentPrice: number;
}> = ({ totalAmount, currency, order, setOrder, viewMode, instrumentPrice }) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize with existing allocations if any
  React.useEffect(() => {
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
      
      <div className="bg-gray-50 p-4 rounded-md border">
        <div className="flex justify-between mb-2">
          <span>Total amount to fund:</span>
          <span className="font-medium">
            {totalAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: currency
            })}
          </span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span>Allocated so far:</span>
          <span className={`font-medium ${
            currentAllocation > totalAmount ? "text-red-600" : ""
          }`}>
            {currentAllocation.toLocaleString('en-US', {
              style: 'currency',
              currency: currency
            })}
          </span>
        </div>
        
        <div className="flex justify-between font-medium">
          <span>Remaining to allocate:</span>
          <span className={remainingAmount < 0 ? "text-red-600" : remainingAmount > 0 ? "text-amber-600" : "text-green-600"}>
            {remainingAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: currency
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

// Component for selecting destination portfolios in a buy order
const DestinationPortfoliosSection: React.FC<{
  totalQuantity: number;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: ViewMode;
}> = ({ totalQuantity, order, setOrder, viewMode }) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  // Initialize with existing allocations if any
  React.useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.depositAllocations) {
      order.depositAllocations
        .filter(allocation => allocation.destinationType === "portfolio")
        .forEach(allocation => {
          initialAllocations[allocation.destinationId] = allocation.quantity || 0;
        });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.depositAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [portfolioId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Filter out other destination types (if any) and add updated portfolio allocations
    const otherAllocations = order.depositAllocations
      ? order.depositAllocations.filter(a => a.destinationType !== "portfolio")
      : [];
    
    const portfolioAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([destinationId, quantity]) => ({
        destinationId,
        destinationType: "portfolio" as const,
        quantity
      }));
    
    setOrder({
      ...order,
      depositAllocations: [...otherAllocations, ...portfolioAllocations]
    });
  };
  
  // Calculate the remaining quantity to allocate
  const remainingQuantity = totalQuantity - currentAllocation;

  // Open modal for selecting a portfolio
  const openPortfolioSelectionModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolioId(null);
  };

  // Confirm selection and add allocation
  const confirmPortfolioSelection = () => {
    if (selectedPortfolioId) {
      const suggestedAllocation = Math.min(
        totalQuantity,
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      
      handleAllocationChange(selectedPortfolioId, suggestedAllocation);
    }
    closeModal();
  };

  // Render selected portfolios table
  const renderSelectedPortfolios = () => {
    const selectedPortfolioIds = Object.keys(allocations).filter(id => allocations[id] > 0);
    
    if (selectedPortfolioIds.length === 0) {
      return (
        <div className="text-center py-4 border rounded-md">
          <p className="text-gray-500">No destination portfolios selected</p>
          <Button 
            onClick={openPortfolioSelectionModal}
            className="mt-2 bg-black text-white hover:bg-gray-800"
          >
            Add Destination Portfolio
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
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Legal Entity</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedPortfolioIds.map(portfolioId => {
                const portfolio = mockPortfoliosFlat.find(p => p.id === portfolioId);
                if (!portfolio) return null;
                
                const institution = mockPortfoliosByInstitution.find(
                  inst => inst.id === portfolio.institutionId
                );
                
                let legalEntity;
                for (const inst of mockPortfoliosByInstitution) {
                  legalEntity = inst.legalEntities.find(
                    entity => entity.id === portfolio.legalEntityId
                  );
                  if (legalEntity) break;
                }
                
                return (
                  <TableRow key={portfolioId}>
                    <TableCell>{portfolio.name}</TableCell>
                    <TableCell>{institution?.name || "Unknown"}</TableCell>
                    <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={remainingQuantity + allocations[portfolioId]}
                        value={allocations[portfolioId]}
                        onChange={(e) => handleAllocationChange(portfolioId, Number(e.target.value))}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAllocationChange(portfolioId, 0)}
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
            onClick={openPortfolioSelectionModal}
            className="bg-black text-white hover:bg-gray-800"
          >
            Add Destination Portfolio
          </Button>
        </div>
      </div>
    );
  };

  // Portfolio selection modal
  const renderPortfolioSelectionModal = () => {
    // Filter out already selected portfolios
    const availablePortfolios = mockPortfoliosFlat.filter(
      portfolio => !Object.keys(allocations).includes(portfolio.id) || allocations[portfolio.id] === 0
    );
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Destination Portfolio</DialogTitle>
          </DialogHeader>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Legal Entity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availablePortfolios.length > 0 ? (
                availablePortfolios.map(portfolio => {
                  const institution = mockPortfoliosByInstitution.find(
                    inst => inst.id === portfolio.institutionId
                  );
                  
                  let legalEntity;
                  for (const inst of mockPortfoliosByInstitution) {
                    legalEntity = inst.legalEntities.find(
                      entity => entity.id === portfolio.legalEntityId
                    );
                    if (legalEntity) break;
                  }
                  
                  return (
                    <TableRow 
                      key={portfolio.id} 
                      className={selectedPortfolioId === portfolio.id ? "bg-gray-100" : ""}
                      onClick={() => setSelectedPortfolioId(portfolio.id)}
                    >
                      <TableCell>
                        <input 
                          type="radio" 
                          checked={selectedPortfolioId === portfolio.id}
                          onChange={() => setSelectedPortfolioId(portfolio.id)}
                        />
                      </TableCell>
                      <TableCell>{portfolio.name}</TableCell>
                      <TableCell>{institution?.name || "Unknown"}</TableCell>
                      <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No available portfolios
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
              onClick={confirmPortfolioSelection}
              disabled={!selectedPortfolioId}
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
        <h3 className="text-base font-medium mb-1">Destination Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to deposit the purchased shares into
        </p>
        
        {renderSelectedPortfolios()}
        {renderPortfolioSelectionModal()}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md border">
        <div className="flex justify-between mb-2">
          <span>Total quantity to allocate:</span>
          <span className="font-medium">{totalQuantity}</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span>Allocated so far:</span>
          <span className={`font-medium ${
            currentAllocation > totalQuantity ? "text-red-600" : ""
          }`}>{currentAllocation}</span>
        </div>
        
        <div className="flex justify-between font-medium">
          <span>Remaining to allocate:</span>
          <span className={remainingQuantity < 0 ? "text-red-600" : remainingQuantity > 0 ? "text-amber-600" : "text-green-600"}>
            {remainingQuantity}
          </span>
        </div>
      </div>
    </div>
  );
};

// Component for selecting source portfolios in a sell order
const SourcePortfoliosSection: React.FC<{
  totalQuantity: number;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: ViewMode;
  price: number;
}> = ({ totalQuantity, selectedInstrument, order, setOrder, viewMode, price }) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  // Initialize with existing allocations if any
  React.useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.instrumentAllocations) {
      order.instrumentAllocations.forEach(allocation => {
        initialAllocations[allocation.portfolioId] = allocation.quantity;
      });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.instrumentAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, quantity) => sum + quantity, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (portfolioId: string, quantity: number) => {
    const updatedAllocations = { ...allocations, [portfolioId]: quantity };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Update order with new allocations
    const instrumentAllocations = Object.entries(updatedAllocations)
      .filter(([_, quantity]) => quantity > 0)
      .map(([portfolioId, quantity]) => ({
        portfolioId,
        quantity
      }));
    
    setOrder({ ...order, instrumentAllocations });
  };
  
  // Get available holdings for the selected instrument in each portfolio
  const getAvailableHoldings = () => {
    if (!selectedInstrument) return {};
    
    const holdings: Record<string, number> = {};
    
    // Simulate available holdings for demo purposes
    mockPortfoliosFlat.forEach(portfolio => {
      const holding = portfolio.holdings.find(h => h.instrumentId === selectedInstrument.id);
      if (holding) {
        holdings[portfolio.id] = holding.quantity;
      }
    });
    
    return holdings;
  };
  
  const availableHoldings = getAvailableHoldings();
  
  // Calculate the remaining quantity to allocate
  const remainingQuantity = totalQuantity - currentAllocation;

  // Open modal for selecting a portfolio
  const openPortfolioSelectionModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and reset selection
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolioId(null);
  };

  // Confirm selection and add allocation
  const confirmPortfolioSelection = () => {
    if (selectedPortfolioId) {
      const availableQuantity = availableHoldings[selectedPortfolioId] || 0;
      const suggestedAllocation = Math.min(
        availableQuantity,
        remainingQuantity > 0 ? remainingQuantity : 0
      );
      
      handleAllocationChange(selectedPortfolioId, suggestedAllocation);
    }
    closeModal();
  };

  // Render selected portfolios table
  const renderSelectedPortfolios = () => {
    const selectedPortfolioIds = Object.keys(allocations).filter(id => allocations[id] > 0);
    
    if (selectedPortfolioIds.length === 0) {
      return (
        <div className="text-center py-4 border rounded-md">
          <p className="text-gray-500">No source portfolios selected</p>
          <Button 
            onClick={openPortfolioSelectionModal}
            className="mt-2 bg-black text-white hover:bg-gray-800"
            disabled={!selectedInstrument}
          >
            Add Source Portfolio
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
                <TableHead>Portfolio</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedPortfolioIds.map(portfolioId => {
                const portfolio = mockPortfoliosFlat.find(p => p.id === portfolioId);
                if (!portfolio) return null;
                
                const availableQuantity = availableHoldings[portfolioId] || 0;
                const quantity = allocations[portfolioId];
                const estimatedValue = quantity * price;
                
                return (
                  <TableRow key={portfolioId}>
                    <TableCell>{portfolio.name}</TableCell>
                    <TableCell>{availableQuantity} shares</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={Math.min(availableQuantity, remainingQuantity + quantity)}
                        value={quantity}
                        onChange={(e) => handleAllocationChange(portfolioId, Number(e.target.value))}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      {estimatedValue.toLocaleString('en-US', {
                        style: 'currency',
                        currency: selectedInstrument?.currency || "USD"
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAllocationChange(portfolioId, 0)}
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
            onClick={openPortfolioSelectionModal}
            className="bg-black text-white hover:bg-gray-800"
            disabled={!selectedInstrument}
          >
            Add Source Portfolio
          </Button>
        </div>
      </div>
    );
  };

  // Portfolio selection modal
  const renderPortfolioSelectionModal = () => {
    // Filter portfolios with available holdings
    const availablePortfolios = mockPortfoliosFlat
      .filter(portfolio => {
        const hasHoldings = availableHoldings[portfolio.id] && availableHoldings[portfolio.id] > 0;
        const notSelected = !Object.keys(allocations).includes(portfolio.id) || allocations[portfolio.id] === 0;
        return hasHoldings && notSelected;
      });
    
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Select Source Portfolio</DialogTitle>
          </DialogHeader>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Available Shares</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availablePortfolios.length > 0 ? (
                availablePortfolios.map(portfolio => {
                  const institution = mockPortfoliosByInstitution.find(
                    inst => inst.id === portfolio.institutionId
                  );
                  
                  const availableQuantity = availableHoldings[portfolio.id] || 0;
                  
                  return (
                    <TableRow 
                      key={portfolio.id} 
                      className={selectedPortfolioId === portfolio.id ? "bg-gray-100" : ""}
                      onClick={() => setSelectedPortfolioId(portfolio.id)}
                    >
                      <TableCell>
                        <input 
                          type="radio" 
                          checked={selectedPortfolioId === portfolio.id}
                          onChange={() => setSelectedPortfolioId(portfolio.id)}
                        />
                      </TableCell>
                      <TableCell>{portfolio.name}</TableCell>
                      <TableCell>{institution?.name || "Unknown"}</TableCell>
                      <TableCell>{availableQuantity} shares</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No portfolios with holdings of this instrument
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
              onClick={confirmPortfolioSelection}
              disabled={!selectedPortfolioId}
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
        <h3 className="text-base font-medium mb-1">Source Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to sell shares from
        </p>
        
        {selectedInstrument ? (
          <>
            {renderSelectedPortfolios()}
            {renderPortfolioSelectionModal()}
          </>
        ) : (
          <div className="text-center p-4 border rounded-md">
            Please select an instrument first
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md border">
        <div className="flex justify-between mb-2">
          <span>Total quantity to sell:</span>
          <span className="font-medium">{totalQuantity}</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span>Allocated so far:</span>
          <span className={`font-medium ${
            currentAllocation > totalQuantity ? "text-red-600" : ""
          }`}>{currentAllocation}</span>
        </div>
        
        <div className="flex justify-between font-medium">
          <span>Remaining to allocate:</span>
          <span className={remainingQuantity < 0 ? "text-red-600" : remainingQuantity > 0 ? "text-amber-600" : "text-green-600"}>
            {remainingQuantity}
          </span>
        </div>
      </div>
    </div>
  );
};

// Component for selecting destination cash accounts in a sell order
const DestinationCashAccountsSection: React.FC<{
  totalAmount: number;
  currency: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  viewMode: ViewMode;
}> = ({ totalAmount, currency, order, setOrder, viewMode }) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  // Initialize with existing allocations if any
  React.useEffect(() => {
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
      
      <div className="bg-gray-50 p-4 rounded-md border">
        <div className="flex justify-between mb-2">
          <span>Total amount to deposit:</span>
          <span className="font-medium">
            {totalAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: currency
            })}
          </span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span>Allocated so far:</span>
          <span className={`font-medium ${
            currentAllocation > totalAmount ? "text-red-600" : ""
          }`}>
            {currentAllocation.toLocaleString('en-US', {
              style: 'currency',
              currency: currency
            })}
          </span>
        </div>
        
        <div className="flex justify-between font-medium">
          <span>Remaining to allocate:</span>
          <span className={remainingAmount < 0 ? "text-red-600" : remainingAmount > 0 ? "text-amber-600" : "text-green-600"}>
            {remainingAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: currency
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper component for allocation item rows in institutions view
const AllocationItemRow: React.FC<{
  item: AllocationItem;
  allocation: number;
  onChange: (amount: number) => void;
  maxAmount: number;
}> = ({ item, allocation, onChange, maxAmount }) => {
  return (
    <div className="flex items-center justify-between py-1 border-b last:border-b-0">
      <div>
        <span className="font-medium">{item.name}</span>
        <div className="text-sm text-gray-500">
          Available: {item.available?.toLocaleString('en-US', {
            style: 'currency',
            currency: item.currency || 'USD'
          })}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0"
          max={maxAmount}
          value={allocation}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(maxAmount)}
          className="text-xs"
        >
          Max
        </Button>
      </div>
    </div>
  );
};

export default TradingAllocation;
