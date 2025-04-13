
import { useCallback, useState, useMemo } from "react";
import { TradingFormState } from "../types/tradingHookTypes";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

interface EnhancedTradingHandlersProps {
  state: TradingFormState;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setOrder: (value: React.SetStateAction<any>) => void;
  resetForm: () => void;
  gtdDate?: Date;
  validations: {
    validateInstrumentSelection: (instrument: any) => boolean;
    validateOrderExecution: (executionType: string) => boolean;
    validateQuantityPrice: (quantity: number | "", price: number | "", executionType: string) => boolean;
    validateBrokerSelection: (broker: string | "best" | undefined) => boolean;
    validateAllocations: (orderType: string, order: any) => boolean;
  };
}

/**
 * Enhanced trading handlers with better performance and error handling
 */
export const useEnhancedTradingHandlers = ({
  state,
  setCurrentStep,
  setOrder,
  resetForm,
  gtdDate,
  validations
}: EnhancedTradingHandlersProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Memoize state values to prevent unnecessary rerenders
  const {
    currentStep,
    selectedInstrument,
    quantity,
    price,
    orderExecutionType,
    selectedBroker,
    timeInForce,
    currentOrderType,
    leverage,
    order
  } = state;
  
  // Handle next step with optimized validations
  const handleNextStep = useCallback(() => {
    console.log("Current step:", currentStep);
    
    // Step 1: Instrument selection
    if (currentStep === 1) {
      if (!validations.validateInstrumentSelection(selectedInstrument)) {
        return;
      }
      setCurrentStep(2);
    }
    // Step 2: Order execution and quantity/price
    else if (currentStep === 2) {
      if (!validations.validateOrderExecution(orderExecutionType)) {
        return;
      }
      if (!validations.validateQuantityPrice(quantity, price, orderExecutionType)) {
        return;
      }
      setCurrentStep(3);
    }
    // Step 3: Broker selection
    else if (currentStep === 3) {
      if (!validations.validateBrokerSelection(selectedBroker)) {
        return;
      }
      
      // Create the basic order object
      setOrder({
        instrumentId: selectedInstrument?.id || '',
        orderType: currentOrderType,
        quantity: Number(quantity),
        price: orderExecutionType === 'market' ? 
          selectedInstrument?.currentPrice || 0 : 
          Number(price),
        executionType: orderExecutionType,
        broker: selectedBroker,
        timeInForce,
        leverage
      });
      
      setCurrentStep(4);
    }
    // Add more steps as needed
  }, [
    currentStep, 
    selectedInstrument, 
    quantity, 
    price, 
    orderExecutionType, 
    selectedBroker,
    timeInForce,
    currentOrderType,
    leverage,
    setCurrentStep,
    setOrder,
    validations
  ]);
  
  // Handle previous step
  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(current => current - 1);
    }
  }, [currentStep, setCurrentStep]);
  
  // Handle submit order with performance improvements
  const handleSubmitOrder = useCallback(() => {
    console.log("Submitting order");
    
    // Special validation for GTD when timeInForce is set to gtd
    if (timeInForce === "gtd" && !gtdDate) {
      showErrorToast('Error', 'Please select an expiry date for your Good Till Date order');
      return;
    }
    
    // Final validation for allocations
    if (!validations.validateAllocations(currentOrderType, order)) {
      return;
    }
    
    // Set submitting state
    setIsSubmitting(true);
    
    // Use setTimeout to prevent UI freeze during order submission
    setTimeout(() => {
      try {
        // Calculate final price based on order execution type
        const finalPrice = orderExecutionType === "market"
          ? selectedInstrument?.currentPrice || 0
          : Number(price);
        
        // Calculate total amount including leverage
        const totalAmount = Number(quantity) * finalPrice * (leverage || 1);
        
        // Create the complete order object
        const completeOrder = {
          ...order,
          orderType: currentOrderType,
          instrumentId: selectedInstrument?.id || "",
          quantity: Number(quantity),
          price: finalPrice,
          totalAmount,
          brokerId: selectedBroker || "best", 
          executionType: orderExecutionType || "market",
          timeInForce: timeInForce || "day", 
          leverage: leverage || 1
        };
        
        // Add gtdDate to the order if timeInForce is gtd
        if (timeInForce === "gtd" && gtdDate) {
          (completeOrder as any).gtdDate = gtdDate;
        }
        
        console.log("Submitting order:", completeOrder);
        
        // Show success message
        showSuccessToast(
          'Order Submitted', 
          `Your ${currentOrderType} order for ${quantity} ${selectedInstrument?.symbol} has been submitted successfully.`
        );
        
        // Reset form
        resetForm();
      } catch (error) {
        console.error("Error submitting order:", error);
        showErrorToast(
          'Error', 
          'There was an error submitting your order. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }, 0);
  }, [
    timeInForce,
    gtdDate,
    currentOrderType,
    order,
    orderExecutionType,
    selectedInstrument,
    price,
    quantity,
    leverage,
    selectedBroker,
    resetForm,
    validations
  ]);
  
  return {
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder,
    isSubmitting
  };
};
