
import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Instrument, OrderType, TradeOrder } from "../../types";
import { useTradingValidations } from "./tradingValidations";
import { TradingFormState } from "../types/tradingHookTypes";

interface TradingHandlersProps {
  state: TradingFormState;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setOrder: (value: React.SetStateAction<Partial<TradeOrder>>) => void;
  resetForm: () => void;
}

export const useTradingHandlers = ({
  state,
  setCurrentStep,
  setOrder,
  resetForm
}: TradingHandlersProps) => {
  const { toast } = useToast();
  const {
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice,
    validateBrokerSelection,
    validateAllocations
  } = useTradingValidations();

  const {
    currentStep,
    selectedInstrument,
    quantity,
    price,
    orderExecutionType,
    selectedBroker,
    currentOrderType,
    order,
    timeInForce,
    leverage
  } = state;

  const handleNextStep = useCallback(() => {
    if (currentStep === 0 && !validateInstrumentSelection(selectedInstrument)) {
      return;
    }

    if (currentStep === 1 && !validateOrderExecution(orderExecutionType)) {
      return;
    }

    if (currentStep === 2 && !validateQuantityPrice(quantity, price, orderExecutionType)) {
      return;
    }

    // Now step 4 is for broker selection
    if (currentStep === 4 && !validateBrokerSelection(selectedBroker)) {
      return;
    }

    // Now step 5 is for allocation
    if (currentStep === 5 && !validateAllocations(currentOrderType, order)) {
      return;
    }

    // Update order with current selections before proceeding
    setOrder(prev => ({
      ...prev,
      orderType: currentOrderType,
      instrumentId: selectedInstrument?.id || "",
      quantity: Number(quantity),
      price: Number(price),
      totalAmount: Number(quantity) * Number(price || selectedInstrument?.currentPrice || 0),
      brokerId: selectedBroker,
      executionType: orderExecutionType,
      timeInForce: timeInForce,
      leverage: leverage
    }));

    // Move to next step
    setCurrentStep(prev => Math.min(prev + 1, 6));
  }, [
    currentStep, 
    selectedInstrument, 
    quantity, 
    price, 
    selectedBroker, 
    orderExecutionType, 
    timeInForce, 
    currentOrderType, 
    order,
    leverage,
    setOrder,
    setCurrentStep
  ]);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, [setCurrentStep]);

  const handleSubmitOrder = useCallback(() => {
    const calculatedPrice = orderExecutionType === "market"
      ? selectedInstrument?.currentPrice || 0
      : Number(price);
      
    const totalAmount = Number(quantity) * calculatedPrice * leverage;
    
    const completeOrder: TradeOrder = {
      ...order as TradeOrder,
      orderType: currentOrderType,
      instrumentId: selectedInstrument?.id || "",
      quantity: Number(quantity),
      price: calculatedPrice,
      totalAmount,
      brokerId: selectedBroker,
      executionType: orderExecutionType,
      timeInForce: timeInForce,
      leverage: leverage
    };

    // In a real app, you would submit this order to your backend
    console.log("Submitting order:", completeOrder);

    toast({
      title: "Order Submitted",
      description: `Your ${currentOrderType} order for ${quantity} ${selectedInstrument?.symbol} has been submitted successfully.`,
    });

    // Reset form to initial state
    resetForm();
  }, [
    selectedInstrument, 
    price, 
    quantity, 
    orderExecutionType, 
    currentOrderType, 
    selectedBroker, 
    timeInForce, 
    order, 
    leverage,
    resetForm,
    toast
  ]);

  return {
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder
  };
};
