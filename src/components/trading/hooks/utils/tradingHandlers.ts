
import { useCallback, useState } from "react";
import { TradingFormState } from "../types/tradingHookTypes";
import { useTradingValidations } from "./tradingValidations";
import { 
  useNextStepHandler, 
  usePreviousStepHandler, 
  useSubmitOrderHandler 
} from "./handlers";
import { useToast } from "@/components/ui/use-toast";

interface TradingHandlersProps {
  state: TradingFormState;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setOrder: (value: React.SetStateAction<any>) => void;
  resetForm: () => void;
  gtdDate?: Date;
}

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
    gtdDate, // Pass gtdDate to submit handler
    resetForm
  });
  
  // Wrap the submit handler to ensure we validate everything before submitting
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
    
    // Final validation before submission
    if (
      !validateInstrumentSelection(state.selectedInstrument) ||
      !validateOrderExecution(state.orderExecutionType) ||
      !validateQuantityPrice(state.quantity, state.price, state.orderExecutionType) ||
      !validateBrokerSelection(state.selectedBroker) ||
      !validateAllocations(state.currentOrderType, state.order)
    ) {
      return;
    }
    
    setIsSubmitting(true);
    
    // If we pass all validations, submit the order
    try {
      submitHandler();
    } finally {
      setIsSubmitting(false);
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
