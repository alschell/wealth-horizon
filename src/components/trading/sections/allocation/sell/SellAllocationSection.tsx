
import React from "react";
import { Separator } from "@/components/ui/separator";
import { TradeOrder } from "../../../types";
import { AllocationSummary, QuantityAllocationSummary } from "../AllocationSummary";
import SourcePortfoliosSection from "./SourcePortfoliosSection";
import DestinationCashAccountsSection from "./DestinationCashAccountsSection";

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
  return (
    <div className="space-y-8">
      <div className="space-y-6">        
        <SourcePortfoliosSection
          totalQuantity={quantity}
          selectedInstrument={selectedInstrument}
          order={order}
          setOrder={setOrder}
          viewMode="portfolios"
          price={price}
        />
      </div>
      
      <Separator />
      
      <div className="space-y-6">        
        <DestinationCashAccountsSection
          totalAmount={totalAmount}
          currency={currency}
          order={order}
          setOrder={setOrder}
          viewMode="portfolios"
        />
      </div>
    </div>
  );
};

export default SellAllocationSection;
