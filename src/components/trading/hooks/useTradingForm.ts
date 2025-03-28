
import { useState, useCallback } from "react";
import { OrderType, Instrument, TradeOrder } from "../types";
import { useTradingHandlers } from "./utils/tradingHandlers";
import { UseTradingFormReturn } from "./types/tradingHookTypes";

export const useTradingForm = (orderType: OrderType): UseTradingFormReturn => {
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [selectedBroker, setSelectedBroker] = useState<string | "best">("best");
  const [orderExecutionType, setOrderExecutionType] = useState<string>("market");
  const [timeInForce, setTimeInForce] = useState<string>("day");
  const [currentOrderType, setOrderType] = useState<OrderType>(orderType);
  const [leverage, setLeverage] = useState<number>(1); // Default to 1x (no leverage)
  
  const [order, setOrder] = useState<Partial<TradeOrder>>({
    orderType,
    instrumentAllocations: [],
    fundingAllocations: [],
    depositAllocations: [],
    brokerId: "best",
    executionType: "market",
    timeInForce: "day",
    leverage: 1
  });

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setSelectedInstrument(null);
    setQuantity("");
    setPrice("");
    setSelectedBroker("best");
    setOrderExecutionType("market");
    setTimeInForce("day");
    setLeverage(1);
    setOrder({
      orderType: currentOrderType,
      instrumentAllocations: [],
      fundingAllocations: [],
      depositAllocations: [],
      brokerId: "best",
      executionType: "market",
      timeInForce: "day",
      leverage: 1
    });
    setCurrentStep(0);
  }, [currentOrderType]);

  // Create trading state object for the handlers
  const tradingState = {
    currentStep,
    selectedInstrument,
    quantity,
    price,
    selectedBroker,
    orderExecutionType,
    timeInForce,
    currentOrderType,
    leverage,
    order
  };

  // Use the extracted handler hooks
  const { 
    handleNextStep, 
    handlePreviousStep, 
    handleSubmitOrder 
  } = useTradingHandlers({
    state: tradingState,
    setCurrentStep,
    setOrder,
    resetForm
  });

  return {
    // State
    currentStep,
    selectedInstrument,
    quantity,
    price,
    selectedBroker,
    orderExecutionType,
    timeInForce,
    currentOrderType, // This is the correct property name according to the type definition
    leverage,
    order,
    
    // State setters
    setCurrentStep,
    setSelectedInstrument,
    setQuantity,
    setPrice,
    setSelectedBroker,
    setOrderExecutionType,
    setTimeInForce,
    setOrderType,
    setLeverage,
    setOrder,
    
    // Handlers
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder
  };
};
