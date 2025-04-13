import { useState, useEffect } from "react";
import { OrderType, TradeOrder } from "../../../types";
import { useToast } from "@/hooks/use-toast";

export const useTradingAllocation = (
  orderType: OrderType,
  selectedInstrument: any,
  quantity: number | "",
  price: number | "",
  order: Partial<TradeOrder>,
  setOrder: (order: Partial<TradeOrder>) => void
) => {
  const { toast } = useToast();
  const [initialized, setInitialized] = useState(false);
  
  // Initialize order allocations on component mount
  useEffect(() => {
    console.log("TradingAllocation - Initializing allocations");
    try {
      const updatedOrder = { ...order };
      
      // Initialize allocation arrays based on order type
      if (orderType === "buy") {
        updatedOrder.fundingAllocations = updatedOrder.fundingAllocations || [];
        updatedOrder.depositAllocations = updatedOrder.depositAllocations || [];
      } else {
        updatedOrder.instrumentAllocations = updatedOrder.instrumentAllocations || [];
        updatedOrder.depositAllocations = updatedOrder.depositAllocations || [];
      }
      
      setOrder(updatedOrder);
      setInitialized(true);
    } catch (error) {
      console.error("Error initializing allocations:", error);
      toast({
        title: "Allocation Error",
        description: "Failed to initialize allocations. Please try refreshing.",
        variant: "destructive"
      });
    }
  }, []);

  // Calculate total amount from quantity and price
  const totalAmount = typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
    ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0)
    : 0;

  // Fallback to USD if no currency specified
  const currency = selectedInstrument?.currency || "USD";

  return {
    initialized,
    totalAmount,
    currency
  };
};
