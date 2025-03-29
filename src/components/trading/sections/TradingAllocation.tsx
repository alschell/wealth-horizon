
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
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("TradingAllocation mounted/updated with orderType:", orderType);
    
    try {
      // Initialize any required allocations if they don't exist
      if (orderType === "buy" && (!order.fundingAllocations || order.fundingAllocations.length === 0)) {
        console.log("Initializing empty funding allocations");
        setOrder({
          ...order,
          fundingAllocations: []
        });
      }
      
      if (!order.depositAllocations || order.depositAllocations.length === 0) {
        console.log("Initializing empty deposit allocations");
        setOrder({
          ...order,
          depositAllocations: []
        });
      }
      
      if (orderType === "sell" && (!order.instrumentAllocations || order.instrumentAllocations.length === 0)) {
        console.log("Initializing empty instrument allocations");
        setOrder({
          ...order,
          instrumentAllocations: []
        });
      }
    } catch (error) {
      console.error("Error initializing allocations:", error);
      toast({
        title: "Initialization Error",
        description: "Failed to initialize allocations. Please try again.",
        variant: "destructive"
      });
      setHasRenderError(true);
    }
  }, [orderType, order, setOrder, toast]);
  
  const totalAmount = typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
    ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0)
    : 0;

  // For buy orders: funding sources and destination portfolios
  // For sell orders: source portfolios and destination cash accounts
  const renderContent = () => {
    console.log("Rendering allocation content for", orderType);
    try {
      if (orderType === "buy") {
        return (
          <div className="space-y-6">
            <FundingSourcesSection 
              totalAmount={totalAmount} 
              currency={selectedInstrument?.currency || "USD"}
              order={order}
              setOrder={setOrder}
              viewMode={viewMode}
              instrumentPrice={typeof price === 'number' ? price : (selectedInstrument?.currentPrice || 0)}
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
              price={typeof price === 'number' ? price : (selectedInstrument?.currentPrice || 0)}
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
    } catch (error) {
      console.error("Error rendering allocation content:", error);
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <p className="text-red-500">Error rendering allocation sections.</p>
          <p className="text-sm text-red-400 mt-2">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      );
    }
  };

  // If there's a rendering error, show fallback UI
  if (hasRenderError) {
    return (
      <div className="p-6 border border-red-300 bg-red-50 rounded-md">
        <h3 className="text-lg font-medium text-red-700 mb-2">
          Unable to Load Allocation Screen
        </h3>
        <p className="text-red-600 mb-4">
          There was a problem loading the allocation interface. This may be due to missing data.
        </p>
        <Button
          variant="outline"
          onClick={() => setHasRenderError(false)}
        >
          Try Again
        </Button>
      </div>
    );
  }

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
