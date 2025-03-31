
import { useCallback } from "react";
import { OrderType } from "../types";
import { useFormState } from "./utils/useFormState";
import { useTradingHandlers } from "./utils/tradingHandlers";
import { UseTradingFormReturn } from "./types/tradingHookTypes";

export const useTradingForm = (orderType: OrderType, gtdDate?: Date): UseTradingFormReturn => {
  // Use the extracted form state hook
  const formState = useFormState(orderType);
  
  const {
    currentStep,
    selectedInstrument,
    quantity,
    price,
    selectedBroker,
    orderExecutionType,
    timeInForce,
    currentOrderType,
    leverage,
    order,
    setCurrentStep,
    setOrder,
    resetForm,
    setLeverage
  } = formState;

  // Create trading state object for the handlers - wrap in useCallback to prevent recreation
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

  // Use the extracted handler hooks with optimized state updates
  const { 
    handleNextStep, 
    handlePreviousStep, 
    handleSubmitOrder,
    isSubmitting 
  } = useTradingHandlers({
    state: tradingState,
    setCurrentStep,
    setOrder,
    resetForm,
    gtdDate
  });

  return {
    ...formState,
    // Handlers
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder,
    isSubmitting
  };
};
