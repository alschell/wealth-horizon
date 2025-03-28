
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
    console.log("handleNextStep called, current step:", currentStep);
    
    // Step 0: Instrument Selection
    if (currentStep === 0 && !validateInstrumentSelection(selectedInstrument)) {
      console.log("Validation failed: instrument selection");
      return;
    }

    // Step 1: Order Type
    if (currentStep === 1 && !validateOrderExecution(orderExecutionType)) {
      console.log("Validation failed: order execution");
      return;
    }

    // Step 2: Quantity & Price
    if (currentStep === 2 && !validateQuantityPrice(quantity, price, orderExecutionType)) {
      console.log("Validation failed: quantity/price");
      return;
    }

    // Step 4: Broker Selection (since step 3 is Validity & Leverage)
    if (currentStep === 4 && !validateBrokerSelection(selectedBroker)) {
      console.log("Validation failed: broker selection");
      return;
    }

    // Step 5: Allocation
    if (currentStep === 5) {
      console.log("Validating allocations:", currentOrderType, order);
      if (!validateAllocations(currentOrderType, order)) {
        console.log("Validation failed: allocations");
        return;
      }
    }

    // Update order with current selections before proceeding
    console.log("Updating order state with current selections");
    setOrder(prev => {
      const updatedOrder = {
        ...prev,
        orderType: currentOrderType,
        instrumentId: selectedInstrument?.id || "",
        quantity: Number(quantity),
        price: Number(price || (selectedInstrument?.currentPrice || 0)),
        totalAmount: Number(quantity) * Number(price || selectedInstrument?.currentPrice || 0),
        brokerId: selectedBroker,
        executionType: orderExecutionType,
        timeInForce: timeInForce,
        leverage: leverage
      };
      console.log("Updated order:", updatedOrder);
      return updatedOrder;
    });

    console.log("Moving to next step:", currentStep + 1);
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
    setCurrentStep,
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice,
    validateBrokerSelection,
    validateAllocations
  ]);

  const handlePreviousStep = useCallback(() => {
    console.log("Moving to previous step:", currentStep - 1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, [setCurrentStep, currentStep]);

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
