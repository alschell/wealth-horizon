
import { useState, useEffect, useCallback } from "react";
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
  setOrder,
  handleNextStep
}: TradingFormContentProps) => {
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Log whenever the current step changes to help with debugging
  useEffect(() => {
    console.log(`TradingFormContent: Current step changed to ${currentStep}`, { 
      stepName: currentStep,
      orderType,
      selectedInstrument: selectedInstrument?.symbol,
      // Avoid stringifying the entire order to prevent performance issues
      orderPartial: {
        instrumentId: order.instrumentId,
        quantity: order.quantity,
        executionType: order.executionType
      }
    });
  }, [currentStep, orderType, selectedInstrument, order.instrumentId, order.quantity, order.executionType]);

  // Wrap next button click with loading state
  const handleNext = useCallback(() => {
    setIsLoading(true);
    
    try {
      // Use requestAnimationFrame to wait for browser paint before proceeding
      requestAnimationFrame(() => {
        try {
          handleNextStep();
        } catch (error) {
          console.error("Error in next step handler:", error);
          setRenderError(error instanceof Error ? error.message : "An unexpected error occurred");
        } finally {
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Error in handleNext wrapper:", error);
      setIsLoading(false);
    }
  }, [handleNextStep]);

  // Helper to ensure order has proper allocation arrays
  const ensureOrderHasAllocations = useCallback(() => {
    if (currentStep === 4) {
      console.log("Ensuring order has proper allocation arrays before rendering allocation step");
      
      // Make sure allocations are initialized before rendering
      setOrder(prevOrder => {
        // Only update if needed to avoid unnecessary renders
        const needsUpdate = (
          (orderType === "buy" && (!prevOrder.fundingAllocations || !prevOrder.depositAllocations)) ||
          (orderType === "sell" && (!prevOrder.instrumentAllocations || !prevOrder.depositAllocations))
        );
        
        if (!needsUpdate) return prevOrder;
        
        // Create new object with initialized arrays
        const updatedOrder = { ...prevOrder };
        
        if (orderType === "buy") {
          if (!updatedOrder.fundingAllocations) updatedOrder.fundingAllocations = [];
          if (!updatedOrder.depositAllocations) updatedOrder.depositAllocations = [];
        }
        
        if (orderType === "sell") {
          if (!updatedOrder.instrumentAllocations) updatedOrder.instrumentAllocations = [];
          if (!updatedOrder.depositAllocations) updatedOrder.depositAllocations = [];
        }
        
        return updatedOrder;
      });
    }
  }, [currentStep, orderType, setOrder]);

  return {
    renderError,
    isLoading,
    setRenderError,
    handleNext,
    ensureOrderHasAllocations
  };
};
