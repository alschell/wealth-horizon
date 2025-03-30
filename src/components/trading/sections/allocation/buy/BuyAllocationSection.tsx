
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TradeOrder } from "../../../types";
import { AllocationSummary } from "../AllocationSummary";
import { QuantityAllocationSummary } from "../AllocationSummary";
import FundingSourcesPanel from "./FundingSourcesPanel";
import DestinationPortfoliosPanel from "./DestinationPortfoliosPanel";

interface BuyAllocationSectionProps {
  totalAmount: number;
  quantity: number;
  currency: string;
  selectedInstrument: any;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  price: number;
}

const BuyAllocationSection: React.FC<BuyAllocationSectionProps> = ({
  totalAmount,
  quantity,
  currency,
  selectedInstrument,
  order,
  setOrder,
  price
}) => {
  const [fundingAllocations, setFundingAllocations] = useState<Record<string, number>>(
    (order.fundingAllocations || []).reduce((acc, item) => {
      acc[item.sourceId] = item.amount;
      return acc;
    }, {} as Record<string, number>)
  );
  
  const [portfolioAllocations, setPortfolioAllocations] = useState<Record<string, number>>(
    (order.depositAllocations || [])
      .filter(item => item.destinationType === "portfolio")
      .reduce((acc, item) => {
        acc[item.destinationId] = item.quantity || 0;
        return acc;
      }, {} as Record<string, number>)
  );
  
  // Calculate current allocations
  const currentFundingAmount = Object.values(fundingAllocations).reduce((sum, amount) => sum + amount, 0);
  const remainingFundingAmount = totalAmount - currentFundingAmount;
  
  const currentPortfolioAllocation = Object.values(portfolioAllocations).reduce((sum, qty) => sum + qty, 0);
  const remainingPortfolioQuantity = quantity - currentPortfolioAllocation;
  
  // Update funding allocations and sync with order state
  const handleFundingAllocationChange = (sourceId: string, amount: number) => {
    const newAllocations = { ...fundingAllocations, [sourceId]: amount };
    setFundingAllocations(newAllocations);
    
    // Update order state
    const updatedFundingAllocations = Object.entries(newAllocations)
      .filter(([_, amount]) => amount > 0)
      .map(([sourceId, amount]) => ({
        sourceId,
        sourceType: sourceId.startsWith("cash-") ? "cash" : "credit",
        amount,
        currency
      }));
    
    setOrder({
      ...order,
      fundingAllocations: updatedFundingAllocations
    });
  };
  
  // Update portfolio allocations and sync with order state
  const handlePortfolioAllocationChange = (portfolioId: string, quantity: number) => {
    const newAllocations = { ...portfolioAllocations, [portfolioId]: quantity };
    setPortfolioAllocations(newAllocations);
    
    // Get any non-portfolio allocations
    const nonPortfolioAllocations = (order.depositAllocations || [])
      .filter(item => item.destinationType !== "portfolio");
    
    // Create updated portfolio allocations
    const updatedPortfolioAllocations = Object.entries(newAllocations)
      .filter(([_, qty]) => qty > 0)
      .map(([destinationId, quantity]) => ({
        destinationId,
        destinationType: "portfolio" as const,
        quantity
      }));
    
    // Update order state
    setOrder({
      ...order,
      depositAllocations: [...nonPortfolioAllocations, ...updatedPortfolioAllocations]
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-base font-medium">1. Funding Sources</h3>
        <p className="text-sm text-gray-500 -mt-4">
          Select accounts to fund this purchase
        </p>
        
        <FundingSourcesPanel
          fundingAllocations={fundingAllocations}
          onAllocationChange={handleFundingAllocationChange}
          totalAmount={totalAmount}
          currency={currency}
          price={price}
        />
        
        <AllocationSummary
          totalAmount={totalAmount}
          currency={currency}
          currentAllocation={currentFundingAmount}
          remainingAmount={remainingFundingAmount}
        />
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <h3 className="text-base font-medium">2. Destination Portfolios</h3>
        <p className="text-sm text-gray-500 -mt-4">
          Select where to deposit the purchased assets
        </p>
        
        <DestinationPortfoliosPanel
          portfolioAllocations={portfolioAllocations}
          onAllocationChange={handlePortfolioAllocationChange}
          totalQuantity={quantity}
          selectedInstrument={selectedInstrument}
        />
        
        <QuantityAllocationSummary
          totalQuantity={quantity}
          currentAllocation={currentPortfolioAllocation}
          remainingQuantity={remainingPortfolioQuantity}
        />
      </div>
    </div>
  );
};

export default BuyAllocationSection;
