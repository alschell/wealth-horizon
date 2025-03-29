
import { useState, useEffect } from "react";
import { Instrument, OrderType, TradeOrder } from "../types";

export interface TradingFormContentProps {
  currentStep: number;
  selectedInstrument: Instrument | null;
  orderType: OrderType;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  handleNextStep: () => void;
}

export const useTradingFormContent = ({
  currentStep,
  selectedInstrument,
  orderType,
  order,
  setOrder
}: TradingFormContentProps) => {
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Log whenever the current step changes to help with debugging
  useEffect(() => {
    console.log(`TradingFormContent: Current step changed to ${currentStep}`, { 
      stepName: currentStep,
      orderType,
      selectedInstrument: selectedInstrument?.symbol,
      order: JSON.stringify(order)
    });
  }, [currentStep, orderType, selectedInstrument, order]);

  // Wrap next button click with loading state
  const handleNext = (handleNextStep: () => void) => {
    setIsLoading(true);
    
    // Use setTimeout to allow UI to update before potentially heavy operations
    setTimeout(() => {
      try {
        handleNextStep();
      } catch (error) {
        console.error("Error in next step handler:", error);
        setRenderError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }, 10);
  };

  // Helper to ensure order has proper allocation arrays
  const ensureOrderHasAllocations = () => {
    if (currentStep === 5) {
      console.log("Ensuring order has proper allocation arrays before rendering allocation step");
      
      // Make sure allocations are initialized before rendering
      if (orderType === "buy" && (!order.fundingAllocations || !order.depositAllocations)) {
        const updatedOrder = { ...order };
        if (!updatedOrder.fundingAllocations) updatedOrder.fundingAllocations = [];
        if (!updatedOrder.depositAllocations) updatedOrder.depositAllocations = [];
        setOrder(updatedOrder);
      }
      
      if (orderType === "sell" && (!order.instrumentAllocations || !order.depositAllocations)) {
        const updatedOrder = { ...order };
        if (!updatedOrder.instrumentAllocations) updatedOrder.instrumentAllocations = [];
        if (!updatedOrder.depositAllocations) updatedOrder.depositAllocations = [];
        setOrder(updatedOrder);
      }
    }
  };

  return {
    renderError,
    isLoading,
    setRenderError,
    handleNext,
    ensureOrderHasAllocations
  };
};
