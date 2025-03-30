import React from "react";
import { TradeOrder } from "../../types";
import { FundingSourcesSection } from "./buy/funding-sources";
import DestinationPortfoliosSection from "./buy/destination-portfolios/DestinationPortfoliosSection";

interface TradingAllocationProps {
  orderType: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  quantity: number | "";
  price: number | "";
  selectedInstrument: any;
  [key: string]: any;
}

const TradingAllocation: React.FC<TradingAllocationProps> = ({
  orderType,
  order,
  setOrder,
  quantity,
  price,
  selectedInstrument,
}) => {
  // Calculate total amount
  const totalAmount = 
    typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
      ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice)
      : 0;
      
  const currency = selectedInstrument?.currency || "USD";
  const instrumentPrice = typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-medium mb-2">Trade Allocation</h2>
        <p className="text-sm text-gray-600 mb-6">
          Specify how this trade should be allocated across your accounts.
        </p>

        {orderType === "buy" && (
          <>
            <div className="mb-12">
              <FundingSourcesSection
                totalAmount={totalAmount}
                currency={currency}
                instrumentPrice={instrumentPrice} 
                order={order}
                setOrder={setOrder}
              />
            </div>

            <div>
              <DestinationPortfoliosSection
                totalQuantity={typeof quantity === "number" ? quantity : 0}
                order={order}
                setOrder={setOrder}
                instrumentPrice={instrumentPrice}
                currency={currency}
              />
            </div>
          </>
        )}
        
        {/* Sell logic would go here */}
        {orderType !== "buy" && (
          <div className="p-6 border rounded-md text-center">
            <p className="text-gray-500">Allocation options for sell orders are not yet implemented</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingAllocation;
