
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
        <h3 className="text-base font-medium">1. Source Portfolios</h3>
        <p className="text-sm text-gray-500 -mt-4">
          Select portfolios to sell shares from
        </p>
        
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
        <h3 className="text-base font-medium">2. Destination Cash Accounts</h3>
        <p className="text-sm text-gray-500 -mt-4">
          Select where to deposit the sale proceeds
        </p>
        
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
