
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
}> = ({ totalAmount, currency, order, setOrder, viewMode }) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);
  
  // Initialize with existing allocations if any
  React.useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    
    if (order.fundingAllocations) {
      order.fundingAllocations.forEach(allocation => {
        initialAllocations[allocation.sourceId] = allocation.amount;
      });
    }
    
    setAllocations(initialAllocations);
    updateCurrentAllocation(initialAllocations);
  }, [order.fundingAllocations]);
  
  const updateCurrentAllocation = (allocs: Record<string, number>) => {
    const total = Object.values(allocs).reduce((sum, amount) => sum + amount, 0);
    setCurrentAllocation(total);
  };
  
  const handleAllocationChange = (sourceId: string, amount: number) => {
    const updatedAllocations = { ...allocations, [sourceId]: amount };
    setAllocations(updatedAllocations);
    updateCurrentAllocation(updatedAllocations);
    
    // Update order with new allocations
    const fundingAllocations = Object.entries(updatedAllocations)
      .filter(([_, amount]) => amount > 0)
      .map(([sourceId, amount]) => {
        const source = activeTab === "cash" 
          ? [...mockCashAccountsFlat]
          : [...mockCreditFacilitiesFlat];
        
        const sourceItem = source.find(item => item.id === sourceId);
        
        return {
          sourceId,
          sourceType: activeTab as "cash" | "credit",
          amount,
          currency: sourceItem?.currency || currency
        };
      });
    
    setOrder({ ...order, fundingAllocations });
  };
  
  // Get the data source based on the view mode and active tab
  const getDataSource = () => {
    if (viewMode === "institutions") {
      return activeTab === "cash" 
        ? mockCashAccountsByInstitution 
        : mockCreditFacilitiesByInstitution;
    } else {
      return activeTab === "cash" 
        ? mockCashAccountsFlat.map(item => ({
            id: item.id,
            name: item.name,
            institutionName: getInstitutionName(item.institutionId),
            legalEntityName: getLegalEntityName(item.legalEntityId),
            available: item.balance,
            currency: item.currency
          }))
        : mockCreditFacilitiesFlat.map(item => ({
            id: item.id,
            name: item.name,
            institutionName: getInstitutionName(item.institutionId),
            legalEntityName: getLegalEntityName(item.legalEntityId),
            available: item.available,
            currency: item.currency
          }));
    }
  };
  
  // Helper functions to get institution and legal entity names
  const getInstitutionName = (id: string) => {
    const institution = mockPortfoliosByInstitution.find(inst => inst.id === id);
    return institution?.name || "Unknown";
  };
  
  const getLegalEntityName = (id: string) => {
    for (const institution of mockPortfoliosByInstitution) {
      const legalEntity = institution.legalEntities.find(entity => entity.id === id);
      if (legalEntity) return legalEntity.name;
    }
    return "Unknown";
  };
  
  // Calculate the remaining amount to allocate
  const remainingAmount = totalAmount - currentAllocation;
  
  // Render the appropriate view
  const renderInstitutionsView = () => {
    const dataSource = getDataSource() as any[];
    
    return (
      <div className="space-y-4">
        {dataSource.map(institution => (
          <div key={institution.id} className="border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-3 font-medium">
              {institution.name}
            </div>
            
            <div className="p-2">
              {institution.legalEntities.map((entity: any) => (
                <div key={entity.id} className="mb-3 last:mb-0">
                  <div className="text-sm font-medium pl-2 mb-1">{entity.name}</div>
                  
                  <div className="pl-4">
                    {activeTab === "cash" ? (
                      entity.cashAccounts.length > 0 ? (
                        entity.cashAccounts.map((account: any) => (
                          <AllocationItemRow 
                            key={account.id}
                            item={{
                              id: account.id,
                              name: account.name,
                              institutionName: institution.name,
                              legalEntityName: entity.name,
                              available: account.balance,
                              currency: account.currency
                            }}
                            allocation={allocations[account.id] || 0}
                            onChange={(amount) => handleAllocationChange(account.id, amount)}
                            maxAmount={Math.min(account.balance, remainingAmount + (allocations[account.id] || 0))}
                          />
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 py-1">No cash accounts available</p>
                      )
                    ) : (
                      entity.creditFacilities.length > 0 ? (
                        entity.creditFacilities.map((facility: any) => (
                          <AllocationItemRow 
                            key={facility.id}
                            item={{
                              id: facility.id,
                              name: facility.name,
                              institutionName: institution.name,
                              legalEntityName: entity.name,
                              available: facility.available,
                              currency: facility.currency
                            }}
                            allocation={allocations[facility.id] || 0}
                            onChange={(amount) => handleAllocationChange(facility.id, amount)}
                            maxAmount={Math.min(facility.available, remainingAmount + (allocations[facility.id] || 0))}
                          />
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 py-1">No credit facilities available</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderPortfoliosView = () => {
    const dataSource = getDataSource() as AllocationItem[];
    
    return (
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Legal Entity</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Allocation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSource.length > 0 ? (
              dataSource.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.institutionName}</TableCell>
                  <TableCell>{item.legalEntityName}</TableCell>
                  <TableCell>
                    {item.available?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: item.currency || currency
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        max={Math.min(
                          item.available || 0,
                          remainingAmount + (allocations[item.id] || 0)
                        )}
                        value={allocations[item.id] || 0}
                        onChange={(e) => handleAllocationChange(item.id, Number(e.target.value))}
                        className="w-24"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAllocationChange(
                          item.id,
                          Math.min(
                            item.available || 0,
                            remainingAmount + (allocations[item.id] || 0)
                          )
                        )}
                        className="text-xs"
                      >
                        Max
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No {activeTab === "cash" ? "cash accounts" : "credit facilities"} available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Funding Sources</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which accounts to use for funding this purchase
        </p>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "cash" | "credit")}>
          <TabsList className="mb-4">
            <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
            <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cash" className="mt-0">
            {viewMode === "institutions" ? renderInstitutionsView() : renderPortfoliosView()}
          </TabsContent>
          
          <TabsContent value="credit" className="mt-0">
            {viewMode === "institutions" ? renderInstitutionsView() : renderPortfoliosView()}
          </TabsContent>
        </Tabs>
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
  
  // Render the appropriate view based on viewMode
  const renderView = () => {
    if (viewMode === "institutions") {
      return (
        <div className="space-y-4">
          {mockPortfoliosByInstitution.map(institution => (
            <div key={institution.id} className="border rounded-md overflow-hidden">
              <div className="bg-gray-100 p-3 font-medium">
                {institution.name}
              </div>
              
              <div className="p-2">
                {institution.legalEntities.map(entity => (
                  <div key={entity.id} className="mb-3 last:mb-0">
                    <div className="text-sm font-medium pl-2 mb-1">{entity.name}</div>
                    
                    <div className="pl-4">
                      {entity.portfolios.length > 0 ? (
                        entity.portfolios.map(portfolio => (
                          <div key={portfolio.id} className="flex items-center justify-between py-1 border-b last:border-b-0">
                            <span>{portfolio.name}</span>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="0"
                                max={remainingQuantity + (allocations[portfolio.id] || 0)}
                                value={allocations[portfolio.id] || 0}
                                onChange={(e) => handleAllocationChange(portfolio.id, Number(e.target.value))}
                                className="w-24"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 py-1">No portfolios available</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Portfolios view (flat list)
      return (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Legal Entity</TableHead>
                <TableHead>Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPortfoliosFlat.map(portfolio => {
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
                  <TableRow key={portfolio.id}>
                    <TableCell>{portfolio.name}</TableCell>
                    <TableCell>{institution?.name || "Unknown"}</TableCell>
                    <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max={remainingQuantity + (allocations[portfolio.id] || 0)}
                          value={allocations[portfolio.id] || 0}
                          onChange={(e) => handleAllocationChange(portfolio.id, Number(e.target.value))}
                          className="w-24"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAllocationChange(
                            portfolio.id,
                            Math.min(
                              totalQuantity,
                              remainingQuantity + (allocations[portfolio.id] || 0)
                            )
                          )}
                          className="text-xs"
                        >
                          All
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Destination Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to deposit the purchased shares into
        </p>
        
        {renderView()}
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
}> = ({ totalQuantity, selectedInstrument, order, setOrder, viewMode }) => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [currentAllocation, setCurrentAllocation] = useState(0);

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
  
  // Render the appropriate view based on viewMode
  const renderView = () => {
    if (viewMode === "institutions") {
      return (
        <div className="space-y-4">
          {mockPortfoliosByInstitution.map(institution => {
            // Filter portfolios that have holdings of the selected instrument
            const hasRelevantHoldings = institution.legalEntities.some(entity => 
              entity.portfolios.some(portfolio => availableHoldings[portfolio.id])
            );
            
            if (!hasRelevantHoldings) return null;
            
            return (
              <div key={institution.id} className="border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 font-medium">
                  {institution.name}
                </div>
                
                <div className="p-2">
                  {institution.legalEntities.map(entity => {
                    const entityHasRelevantHoldings = entity.portfolios.some(
                      portfolio => availableHoldings[portfolio.id]
                    );
                    
                    if (!entityHasRelevantHoldings) return null;
                    
                    return (
                      <div key={entity.id} className="mb-3 last:mb-0">
                        <div className="text-sm font-medium pl-2 mb-1">{entity.name}</div>
                        
                        <div className="pl-4">
                          {entity.portfolios.map(portfolio => {
                            const availableQuantity = availableHoldings[portfolio.id] || 0;
                            
                            if (availableQuantity === 0) return null;
                            
                            return (
                              <div key={portfolio.id} className="flex items-center justify-between py-1 border-b last:border-b-0">
                                <div>
                                  <span className="font-medium">{portfolio.name}</span>
                                  <div className="text-sm text-gray-500">
                                    Available: {availableQuantity} shares
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min="0"
                                    max={Math.min(
                                      availableQuantity,
                                      remainingQuantity + (allocations[portfolio.id] || 0)
                                    )}
                                    value={allocations[portfolio.id] || 0}
                                    onChange={(e) => handleAllocationChange(portfolio.id, Number(e.target.value))}
                                    className="w-24"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAllocationChange(
                                      portfolio.id,
                                      Math.min(
                                        availableQuantity,
                                        remainingQuantity + (allocations[portfolio.id] || 0)
                                      )
                                    )}
                                    className="text-xs"
                                  >
                                    Max
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
              </div>
            );
          })}
        </div>
      );
    } else {
      // Portfolios view (flat list)
      return (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Portfolio</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Legal Entity</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPortfoliosFlat
                .filter(portfolio => (availableHoldings[portfolio.id] || 0) > 0)
                .map(portfolio => {
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
                  
                  const availableQuantity = availableHoldings[portfolio.id] || 0;
                  
                  return (
                    <TableRow key={portfolio.id}>
                      <TableCell>{portfolio.name}</TableCell>
                      <TableCell>{institution?.name || "Unknown"}</TableCell>
                      <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                      <TableCell>{availableQuantity} shares</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max={Math.min(
                              availableQuantity,
                              remainingQuantity + (allocations[portfolio.id] || 0)
                            )}
                            value={allocations[portfolio.id] || 0}
                            onChange={(e) => handleAllocationChange(portfolio.id, Number(e.target.value))}
                            className="w-24"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAllocationChange(
                              portfolio.id,
                              Math.min(
                                availableQuantity,
                                remainingQuantity + (allocations[portfolio.id] || 0)
                              )
                            )}
                            className="text-xs"
                          >
                            Max
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Source Portfolios</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which portfolios to sell shares from
        </p>
        
        {selectedInstrument ? (
          renderView()
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
  
  // Render the appropriate view based on viewMode
  const renderView = () => {
    if (viewMode === "institutions") {
      return (
        <div className="space-y-4">
          {mockCashAccountsByInstitution.map(institution => (
            <div key={institution.id} className="border rounded-md overflow-hidden">
              <div className="bg-gray-100 p-3 font-medium">
                {institution.name}
              </div>
              
              <div className="p-2">
                {institution.legalEntities.map(entity => (
                  <div key={entity.id} className="mb-3 last:mb-0">
                    <div className="text-sm font-medium pl-2 mb-1">{entity.name}</div>
                    
                    <div className="pl-4">
                      {entity.cashAccounts.length > 0 ? (
                        entity.cashAccounts.map(account => (
                          <div key={account.id} className="flex items-center justify-between py-1 border-b last:border-b-0">
                            <div>
                              <span className="font-medium">{account.name}</span>
                              <div className="text-sm text-gray-500">
                                {account.balance.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: account.currency
                                })}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="0"
                                max={remainingAmount + (allocations[account.id] || 0)}
                                value={allocations[account.id] || 0}
                                onChange={(e) => handleAllocationChange(account.id, Number(e.target.value))}
                                className="w-24"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAllocationChange(
                                  account.id,
                                  remainingAmount + (allocations[account.id] || 0)
                                )}
                                className="text-xs"
                              >
                                Max
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 py-1">No cash accounts available</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Portfolios view (flat list)
      return (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Legal Entity</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCashAccountsFlat.map(account => {
                const institution = mockPortfoliosByInstitution.find(
                  inst => inst.id === account.institutionId
                );
                
                let legalEntity;
                for (const inst of mockPortfoliosByInstitution) {
                  legalEntity = inst.legalEntities.find(
                    entity => entity.id === account.legalEntityId
                  );
                  if (legalEntity) break;
                }
                
                return (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{institution?.name || "Unknown"}</TableCell>
                    <TableCell>{legalEntity?.name || "Unknown"}</TableCell>
                    <TableCell>
                      {account.balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: account.currency
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max={remainingAmount + (allocations[account.id] || 0)}
                          value={allocations[account.id] || 0}
                          onChange={(e) => handleAllocationChange(account.id, Number(e.target.value))}
                          className="w-24"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAllocationChange(
                            account.id,
                            remainingAmount + (allocations[account.id] || 0)
                          )}
                          className="text-xs"
                        >
                          Max
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-1">Destination Cash Accounts</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select which cash accounts to deposit the proceeds into
        </p>
        
        {renderView()}
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
