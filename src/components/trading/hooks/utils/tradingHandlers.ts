
import { useCallback, useState } from "react";
import { TradingFormState } from "../types/tradingHookTypes";
import { useTradingValidations } from "./tradingValidations";
import { 
  useNextStepHandler, 
  usePreviousStepHandler, 
  useSubmitOrderHandler 
} from "./handlers";
import { useToast } from "@/hooks/use-toast";

interface TradingHandlersProps {
  state: TradingFormState;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setOrder: (value: React.SetStateAction<any>) => void;
  resetForm: () => void;
  gtdDate?: Date;
}

/**
 * Custom hook for handling trading form actions like navigation and submission
 */
export const useTradingHandlers = ({
  state,
  setCurrentStep,
  setOrder,
  resetForm,
  gtdDate
}: TradingHandlersProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Import validation utilities
  const {
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice,
    validateBrokerSelection,
    validateAllocations,
  } = useTradingValidations();
  
  // Use the nextStepHandler hook with all the state props
  const handleNextStep = useNextStepHandler({
    currentStep: state.currentStep,
    selectedInstrument: state.selectedInstrument,
    quantity: state.quantity,
    price: state.price,
    orderExecutionType: state.orderExecutionType,
    selectedBroker: state.selectedBroker,
    timeInForce: state.timeInForce,
    currentOrderType: state.currentOrderType,
    leverage: state.leverage,
    gtdDate,
    setCurrentStep,
    setOrder,
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice
  });
  
  // Use the previousStepHandler hook
  const handlePreviousStep = usePreviousStepHandler({
    currentStep: state.currentStep,
    setCurrentStep
  });
  
  // Use the submitOrderHandler hook with optimized memo dependencies
  const submitHandler = useSubmitOrderHandler({
    selectedInstrument: state.selectedInstrument,
    price: state.price,
    quantity: state.quantity,
    orderExecutionType: state.orderExecutionType,
    currentOrderType: state.currentOrderType,
    selectedBroker: state.selectedBroker,
    timeInForce: state.timeInForce,
    order: state.order,
    leverage: state.leverage,
    gtdDate,
    resetForm
  });
  
  /**
   * Validates and submits the trading order
   */
  const handleSubmitOrder = useCallback(() => {
    console.log("Submitting order");
    
    // Special validation for GTD when timeInForce is set to gtd
    if (state.timeInForce === "gtd" && !gtdDate) {
      toast({
        title: "Error",
        description: "Please select an expiry date for your Good Till Date order",
        variant: "destructive"
      });
      return;
    }
    
    // Final validation before submission in a try/catch to prevent crashes
    try {
      // Run all validations sequentially and exit early if any fail
      const validations = [
        { fn: () => validateInstrumentSelection(state.selectedInstrument), message: "Please select a valid instrument" },
        { fn: () => validateOrderExecution(state.orderExecutionType), message: "Please select a valid order execution type" },
        { fn: () => validateQuantityPrice(state.quantity, state.price, state.orderExecutionType), message: "Please enter valid quantity and price" },
        { fn: () => validateBrokerSelection(state.selectedBroker), message: "Please select a broker" },
        { fn: () => validateAllocations(state.currentOrderType, state.order), message: "Please ensure allocations are valid" }
      ];
      
      for (const validation of validations) {
        if (!validation.fn()) {
          toast({
            title: "Validation Error",
            description: validation.message,
            variant: "destructive"
          });
          return;
        }
      }
      
      setIsSubmitting(true);
      
      // If we pass all validations, submit the order with setTimeout
      // to prevent UI freeze
      setTimeout(() => {
        try {
          submitHandler();
          toast({
            title: "Order Submitted",
            description: "Your order has been submitted successfully",
          });
        } catch (error) {
          console.error("Error submitting order:", error);
          toast({
            title: "Error",
            description: "There was an error submitting your order. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsSubmitting(false);
        }
      }, 0);
    } catch (error) {
      console.error("Error in submit validation:", error);
      toast({
        title: "Error",
        description: "There was an error validating your order. Please check your inputs and try again.",
        variant: "destructive"
      });
    }
  }, [
    state.selectedInstrument,
    state.orderExecutionType,
    state.quantity,
    state.price,
    state.selectedBroker,
    state.currentOrderType,
    state.order,
    state.timeInForce,
    gtdDate,
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice,
    validateBrokerSelection,
    validateAllocations,
    submitHandler,
    toast
  ]);
  
  return {
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder,
    isSubmitting
  };
};
