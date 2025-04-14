
import { useCallback, useState } from "react";
import { TradingFormState } from "../types/tradingHookTypes";
import { showError, showSuccess } from "@/utils/toast";
import { tradingValidation } from "./tradingValidation";

interface EnhancedTradingHandlersProps {
  state: TradingFormState;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setOrder: (value: React.SetStateAction<any>) => void;
  resetForm: () => void;
  gtdDate?: Date;
}

/**
 * Enhanced trading handlers with better performance and error handling
 */
export const useEnhancedTradingHandlers = ({
  state,
  setCurrentStep,
  setOrder,
  resetForm,
  gtdDate
}: EnhancedTradingHandlersProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  // Handle moving to the next step
  const handleNextStep = useCallback(() => {
    console.log("Current step:", currentStep);
    
    if (currentStep === 1) {
      if (!tradingValidation.validateInstrumentSelection(selectedInstrument)) {
        return;
      }
      setCurrentStep(2);
    }
    else if (currentStep === 2) {
      if (!tradingValidation.validateOrderExecution(orderExecutionType)) {
        return;
      }
      if (!tradingValidation.validateQuantityPrice(quantity, price, orderExecutionType)) {
        return;
      }
      setCurrentStep(3);
    }
    else if (currentStep === 3) {
      if (!tradingValidation.validateBrokerSelection(selectedBroker)) {
        return;
      }
      
      // Prepare order data for next step
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
    setOrder
  ]);
  
  // Handle moving to the previous step
  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(current => current - 1);
    }
  }, [currentStep, setCurrentStep]);
  
  // Handle order submission
  const handleSubmitOrder = useCallback(() => {
    console.log("Submitting order");
    
    // Validate time in force settings
    if (timeInForce === "gtd" && !gtdDate) {
      showError('Error', 'Please select an expiry date for your Good Till Date order');
      return;
    }
    
    // Validate allocations for specific order types
    if (!tradingValidation.validateAllocations(currentOrderType, order)) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        // Calculate final price based on execution type
        const finalPrice = orderExecutionType === "market"
          ? selectedInstrument?.currentPrice || 0
          : Number(price);
        
        // Calculate total order amount
        const totalAmount = Number(quantity) * finalPrice * (leverage || 1);
        
        // Prepare complete order data
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
        
        // Add GTD date if applicable
        if (timeInForce === "gtd" && gtdDate) {
          (completeOrder as any).gtdDate = gtdDate;
        }
        
        console.log("Submitting order:", completeOrder);
        
        // Show success message
        showSuccess(
          'Order Submitted', 
          `Your ${currentOrderType} order for ${quantity} ${selectedInstrument?.symbol} has been submitted successfully.`
        );
        
        // Reset form after successful submission
        resetForm();
      } catch (error) {
        console.error("Error submitting order:", error);
        showError(
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
    resetForm
  ]);
  
  return {
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder,
    isSubmitting
  };
};
