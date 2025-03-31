
import React from "react";
import { OrderType, TradeOrder } from "../types";
import { mockInstruments, mockBrokers } from "../data";
import OrderDetailsCard from "./review/OrderDetailsCard";
import ExecutionDetailsCard from "./review/ExecutionDetailsCard";
import WarningsNotices from "./review/WarningsNotices";

interface TradingReviewProps {
  order: Partial<TradeOrder>;
  orderType: OrderType;
  selectedInstrument: any;
  [key: string]: any;
}

const TradingReview: React.FC<TradingReviewProps> = ({
  order,
  orderType,
  selectedInstrument
}) => {
  const instrument = selectedInstrument || 
    (order.instrumentId ? mockInstruments.find(i => i.id === order.instrumentId) : null);

  const broker = order.brokerId === "best" 
    ? { id: "best", name: "Best Execution" }
    : mockBrokers.find(b => b.id === order.brokerId) || { id: "unknown", name: "Unknown" };

  const executionTypeDisplay = {
    "market": "Market",
    "limit": "Limit",
    "stop": "Stop"
  }[order.executionType as string] || "Market";

  const timeInForceDisplay = {
    "day": "Day Only",
    "gtc": "Good Till Canceled (GTC)",
    "fok": "Fill or Kill (FOK)",
    "ioc": "Immediate or Cancel (IOC)"
  }[order.timeInForce as string] || "Day Only";

  const totalAmount = (order.quantity || 0) * (
    order.executionType === "market" 
      ? (instrument?.currentPrice || 0) 
      : (order.price || 0)
  );

  const estimatedFees = totalAmount * 0.0025; // Example: 0.25% commission
  const totalWithFees = totalAmount + estimatedFees;

  // Check for potential warnings
  const warnings = [];
  
  if (orderType === "buy" && totalAmount > 100000) {
    warnings.push("Large order - consider splitting into multiple transactions");
  }
  
  if (order.executionType === "market" && orderType === "sell") {
    warnings.push("Market sell orders may execute at prices lower than current market value");
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderDetailsCard 
          order={order}
          orderType={orderType}
          instrument={instrument}
          executionTypeDisplay={executionTypeDisplay}
          totalAmount={totalAmount}
          estimatedFees={estimatedFees}
          totalWithFees={totalWithFees}
        />
        
        <ExecutionDetailsCard
          order={order}
          orderType={orderType}
          broker={broker}
          timeInForceDisplay={timeInForceDisplay}
        />
      </div>

      <WarningsNotices warnings={warnings} />
    </div>
  );
};

export default TradingReview;
