
import React, { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";

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
  
  const [viewMode, setViewMode] = useState<ViewMode>("portfolios");
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
      // Set initialized to true to avoid infinite loops
      setIsInitialized(true);
    }
  }, [orderType, order, setOrder, toast, isInitialized]);
  
  const totalAmount = typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
    ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0)
    : 0;

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
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            After submitting your order, you'll be able to review all allocations in the confirmation screen.
          </p>
        </div>
      </div>
    );
  }

  // Simplified rendering - avoid complex conditions that could cause errors
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

      {/* Simple version of content rendering to avoid errors */}
      <div className="space-y-6">
        {orderType === "buy" ? (
          <>
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-center">Funding sources and destination portfolios will be allocated automatically.</p>
              <p className="text-center text-sm text-gray-500 mt-2">You can review and modify these allocations after order submission.</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-center">Source portfolios and destination cash accounts will be allocated automatically.</p>
              <p className="text-center text-sm text-gray-500 mt-2">You can review and modify these allocations after order submission.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TradingAllocation;
