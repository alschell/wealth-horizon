
import React, { useState, useEffect } from "react";
import { 
  OrderType,
  TradeOrder
} from "../types";
import { useToast } from "@/components/ui/use-toast";
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
  console.log("TradingAllocation rendering with props:", { 
    orderType, 
    selectedInstrument: selectedInstrument?.symbol, 
    quantity, 
    price,
    order: JSON.stringify(order)
  });
  
  const { toast } = useToast();
  
  // Initialize the allocations immediately when the component mounts
  useEffect(() => {
    console.log("TradingAllocation initialization effect running");
    
    try {
      // Create a new order object with initialized properties
      const updatedOrder = { ...order };
      
      // Initialize any required allocations if they don't exist
      if (orderType === "buy" && (!updatedOrder.fundingAllocations || updatedOrder.fundingAllocations.length === 0)) {
        console.log("Initializing empty funding allocations");
        updatedOrder.fundingAllocations = [];
      }
      
      if (!updatedOrder.depositAllocations || updatedOrder.depositAllocations.length === 0) {
        console.log("Initializing empty deposit allocations");
        updatedOrder.depositAllocations = [];
      }
      
      if (orderType === "sell" && (!updatedOrder.instrumentAllocations || updatedOrder.instrumentAllocations.length === 0)) {
        console.log("Initializing empty instrument allocations");
        updatedOrder.instrumentAllocations = [];
      }

      // Update the order state
      console.log("Setting initialized order:", updatedOrder);
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error initializing allocations:", error);
      toast({
        title: "Initialization Error",
        description: "Failed to initialize allocations. Please try again.",
        variant: "destructive"
      });
    }
  }, [orderType, setOrder, toast, order]);  // Include dependencies
  
  const totalAmount = typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
    ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0)
    : 0;

  // Default currency from the selected instrument or fallback to USD
  const currency = selectedInstrument?.currency || "USD";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {orderType === "buy" 
            ? "Allocate Funding & Destination" 
            : "Allocate Source & Proceeds"}
        </h3>
      </div>

      {/* Allocation functionality based on order type */}
      <div className="space-y-6">
        {orderType === "buy" ? (
          <>
            <FundingSourcesSection
              totalAmount={totalAmount}
              order={order}
              setOrder={setOrder}
              currency={currency}
              viewMode="portfolios"
              instrumentPrice={typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0}
            />
            
            <DestinationPortfoliosSection
              totalQuantity={typeof quantity === 'number' ? quantity : 0}
              order={order}
              setOrder={setOrder}
            />
          </>
        ) : (
          <>
            <SourcePortfoliosSection
              totalQuantity={typeof quantity === 'number' ? quantity : 0}
              selectedInstrument={selectedInstrument}
              order={order}
              setOrder={setOrder}
              viewMode="portfolios"
              price={typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0}
            />
            
            <DestinationCashAccountsSection
              totalAmount={totalAmount}
              order={order}
              setOrder={setOrder}
              currency={currency}
              viewMode="portfolios"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TradingAllocation;
