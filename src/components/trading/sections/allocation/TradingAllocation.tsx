
import React from "react";
import { OrderType, TradeOrder } from "../../types";

// Import components
import AllocationLoading from "./components/AllocationLoading";
import AllocationValidationError from "./components/AllocationValidationError";
import AllocationInfo from "./components/AllocationInfo";
import BuyAllocationSection from "./buy/BuyAllocationSection";
import SellAllocationSection from "./sell/SellAllocationSection";

// Import hook
import { useTradingAllocation } from "./hooks/useTradingAllocation";

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
  const { initialized, totalAmount, currency } = useTradingAllocation(
    orderType,
    selectedInstrument,
    quantity,
    price,
    order,
    setOrder
  );

  // Show loading state while initializing
  if (!initialized) {
    return <AllocationLoading />;
  }
  
  // If no instrument is selected or quantity is not set
  if (!selectedInstrument || typeof quantity !== 'number' || quantity <= 0) {
    return <AllocationValidationError />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">
          {orderType === "buy" 
            ? "Allocate Funding & Destination" 
            : "Allocate Source & Proceeds"}
        </h3>
        <p className="text-sm text-gray-500">
          {orderType === "buy" 
            ? "Specify which accounts to fund this purchase and where to deposit the acquired assets." 
            : "Select which portfolios to sell from and where to deposit the proceeds."}
        </p>
      </div>
      
      <AllocationInfo
        orderType={orderType}
        quantity={typeof quantity === 'number' ? quantity : 0}
        totalAmount={totalAmount}
        currency={currency}
      />

      {/* Render appropriate allocation component based on order type */}
      {orderType === "buy" ? (
        <BuyAllocationSection
          totalAmount={totalAmount}
          quantity={typeof quantity === 'number' ? quantity : 0}
          currency={currency}
          selectedInstrument={selectedInstrument}
          order={order}
          setOrder={setOrder}
          price={typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0}
        />
      ) : (
        <SellAllocationSection
          totalAmount={totalAmount}
          quantity={typeof quantity === 'number' ? quantity : 0}
          currency={currency}
          selectedInstrument={selectedInstrument}
          order={order}
          setOrder={setOrder}
          price={typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0}
        />
      )}
    </div>
  );
};

export default TradingAllocation;
