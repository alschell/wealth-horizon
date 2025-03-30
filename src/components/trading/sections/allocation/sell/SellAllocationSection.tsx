
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { TradeOrder } from "../../../types";
import { AllocationSummary, QuantityAllocationSummary } from "../AllocationSummary";
import SourcePortfoliosPanel from "./SourcePortfoliosPanel";
import DestinationCashAccountsPanel from "./DestinationCashAccountsPanel";

interface SellAllocationSectionProps {
  totalAmount: number;
  quantity: number;
  currency: string;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  price: number;
}

const SellAllocationSection: React.FC<SellAllocationSectionProps> = ({
  totalAmount,
  quantity,
  currency,
  selectedInstrument,
  order,
  setOrder,
  price
}) => {
  const [portfolioAllocations, setPortfolioAllocations] = useState<Record<string, number>>(
    (order.instrumentAllocations || []).reduce((acc, item) => {
      acc[item.portfolioId] = item.quantity;
      return acc;
    }, {} as Record<string, number>)
  );
  
  const [cashAllocations, setCashAllocations] = useState<Record<string, number>>(
    (order.depositAllocations || [])
      .filter(item => item.destinationType === "cash")
      .reduce((acc, item) => {
        acc[item.destinationId] = item.amount || 0;
        return acc;
      }, {} as Record<string, number>)
  );
  
  // Calculate current allocations
  const currentPortfolioAllocation = Object.values(portfolioAllocations).reduce((sum, qty) => sum + qty, 0);
  const remainingPortfolioQuantity = quantity - currentPortfolioAllocation;
  
  const currentCashAllocation = Object.values(cashAllocations).reduce((sum, amount) => sum + amount, 0);
  const remainingCashAmount = totalAmount - currentCashAllocation;
  
  // Update portfolio allocations and sync with order state
  const handlePortfolioAllocationChange = (portfolioId: string, quantity: number) => {
    const newAllocations = { ...portfolioAllocations, [portfolioId]: quantity };
    setPortfolioAllocations(newAllocations);
    
    // Update order state
    const updatedInstrumentAllocations = Object.entries(newAllocations)
      .filter(([_, qty]) => qty > 0)
      .map(([portfolioId, quantity]) => ({
        portfolioId,
        quantity,
        instrumentId: selectedInstrument.id
      }));
    
    setOrder({
      ...order,
      instrumentAllocations: updatedInstrumentAllocations
    });
  };
  
  // Update cash allocations and sync with order state
  const handleCashAllocationChange = (accountId: string, amount: number) => {
    const newAllocations = { ...cashAllocations, [accountId]: amount };
    setCashAllocations(newAllocations);
    
    // Get any non-cash allocations
    const nonCashAllocations = (order.depositAllocations || [])
      .filter(item => item.destinationType !== "cash");
    
    // Create updated cash allocations
    const updatedCashAllocations = Object.entries(newAllocations)
      .filter(([_, amount]) => amount > 0)
      .map(([destinationId, amount]) => ({
        destinationId,
        destinationType: "cash" as const,
        amount,
        currency
      }));
    
    // Update order state
    setOrder({
      ...order,
      depositAllocations: [...nonCashAllocations, ...updatedCashAllocations]
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-base font-medium">1. Source Portfolios</h3>
        <p className="text-sm text-gray-500 -mt-4">
          Select portfolios to sell shares from
        </p>
        
        <SourcePortfoliosPanel
          portfolioAllocations={portfolioAllocations}
          onAllocationChange={handlePortfolioAllocationChange}
          totalQuantity={quantity}
          selectedInstrument={selectedInstrument}
          price={price}
        />
        
        <QuantityAllocationSummary
          totalQuantity={quantity}
          currentAllocation={currentPortfolioAllocation}
          remainingQuantity={remainingPortfolioQuantity}
        />
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <h3 className="text-base font-medium">2. Destination Cash Accounts</h3>
        <p className="text-sm text-gray-500 -mt-4">
          Select where to deposit the sale proceeds
        </p>
        
        <DestinationCashAccountsPanel
          cashAllocations={cashAllocations}
          onAllocationChange={handleCashAllocationChange}
          totalAmount={totalAmount}
          currency={currency}
        />
        
        <AllocationSummary
          totalAmount={totalAmount}
          currency={currency}
          currentAllocation={currentCashAllocation}
          remainingAmount={remainingCashAmount}
        />
      </div>
    </div>
  );
};

export default SellAllocationSection;
