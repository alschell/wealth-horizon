
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
  console.log("TradingAllocation rendering", { 
    orderType, 
    selectedInstrument, 
    quantity, 
    price, 
    order: JSON.stringify(order)
  });
  
  const [hasRenderError, setHasRenderError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("TradingAllocation mounted/updated with orderType:", orderType);
    
    // Skip if already initialized
    if (isInitialized) return;
    
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
      setOrder(updatedOrder);
      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing allocations:", error);
      toast({
        title: "Initialization Error",
        description: "Failed to initialize allocations. You can continue anyway.",
        variant: "destructive"
      });
      setHasRenderError(true);
      setIsInitialized(true);
    }
  }, [orderType, order, setOrder, toast, isInitialized]);
  
  const totalAmount = typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
    ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0)
    : 0;

  // Default currency from the selected instrument or fallback to USD
  const currency = selectedInstrument?.currency || "USD";

  // Render a simple placeholder if there's an error or we're waiting for initialization
  if (hasRenderError || !isInitialized) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {orderType === "buy" 
            ? "Allocate Funding & Destination" 
            : "Allocate Source & Proceeds"}
        </h3>
        
        <div className="p-6 border rounded-md">
          <p className="text-center text-gray-500">
            {hasRenderError 
              ? "There was an issue loading allocation details. You can proceed anyway."
              : "Preparing allocation options..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {orderType === "buy" 
            ? "Allocate Funding & Destination" 
            : "Allocate Source & Proceeds"}
        </h3>
      </div>

      {/* Restore the actual allocation functionality based on order type */}
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
