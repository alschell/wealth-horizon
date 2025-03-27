
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  OrderType,
  TradeOrder,
  ViewMode
} from "../types";
import FundingSourcesSection from "./allocation/buy/FundingSourcesSection";
import DestinationPortfoliosSection from "./allocation/buy/DestinationPortfoliosSection";
import SourcePortfoliosSection from "./allocation/sell/SourcePortfoliosSection";
import DestinationCashAccountsSection from "./allocation/sell/DestinationCashAccountsSection";

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

export default TradingAllocation;
