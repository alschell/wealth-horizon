
import React from "react";
import { TradeOrder } from "../../types";
import { FundingSourcesSection } from "../allocation/buy/funding-sources";
import DestinationPortfoliosSection from "../allocation/buy/destination-portfolios/DestinationPortfoliosSection";
import SellAllocationSection from "../allocation/sell/SellAllocationSection";

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

  if (orderType === "buy") {
    return (
      <div className="space-y-8">
        {/* Funding Sources Section */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-medium mb-2">Funding Source(s)</h2>
            <p className="text-sm text-gray-600">
              Specify from which account(s) to fund this purchase.
            </p>
          </div>
          
          <FundingSourcesSection
            totalAmount={totalAmount}
            currency={currency}
            instrumentPrice={instrumentPrice}
            order={order}
            setOrder={setOrder}
          />
        </div>
        
        {/* Destination Portfolios Section */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-medium mb-2">Destination Portfolio(s)</h2>
            <p className="text-sm text-gray-600">
              Specify into which portfolio(s) to deposit the purchased assets.
            </p>
          </div>
          
          <DestinationPortfoliosSection
            totalQuantity={typeof quantity === "number" ? quantity : 0}
            order={order}
            setOrder={setOrder}
            instrumentPrice={instrumentPrice}
            currency={currency}
          />
        </div>
      </div>
    );
  } else {
    return (
      <SellAllocationSection
        totalAmount={totalAmount}
        quantity={typeof quantity === "number" ? quantity : 0}
        currency={currency}
        selectedInstrument={selectedInstrument}
        order={order}
        setOrder={setOrder}
        price={instrumentPrice}
      />
    );
  }
};

export default TradingAllocation;
