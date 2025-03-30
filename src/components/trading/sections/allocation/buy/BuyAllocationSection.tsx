
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { TradeOrder } from "../../../types";
import FundingSourcesSection from "./funding-sources/FundingSourcesSection";
import DestinationPortfoliosSection from "./destination-portfolios/DestinationPortfoliosSection";

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
  const [viewMode, setViewMode] = useState<"portfolios" | "institutions">("portfolios");
  
  // Calculate instrument price (market price or specified price)
  const instrumentPrice = price > 0 ? price : selectedInstrument?.currentPrice || 0;

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <FundingSourcesSection 
          totalAmount={totalAmount}
          currency={currency}
          order={order}
          setOrder={setOrder}
          viewMode={viewMode}
          instrumentPrice={instrumentPrice}
        />
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <DestinationPortfoliosSection 
          totalQuantity={quantity}
          order={order}
          setOrder={setOrder}
          instrumentPrice={instrumentPrice}
          currency={currency}
        />
      </div>
    </div>
  );
};

export default BuyAllocationSection;
