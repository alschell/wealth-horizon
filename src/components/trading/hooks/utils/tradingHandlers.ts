
import { useCallback } from "react";
import { TradingFormState } from "../types/tradingHookTypes";
import { TradeOrder } from "../../types";
import { useTradingValidations } from "./tradingValidations";
import { 
  useNextStepHandler, 
  usePreviousStepHandler, 
  useSubmitOrderHandler
} from "./handlers";

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
  const {
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice,
    validateBrokerSelection
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

  // Use the extracted handler hooks
  const handleNextStepRaw = useNextStepHandler({
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
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice
  });

  const handlePreviousStepRaw = usePreviousStepHandler(currentStep, setCurrentStep);
  
  const handleSubmitOrderRaw = useSubmitOrderHandler({
    selectedInstrument,
    price,
    quantity,
    orderExecutionType,
    currentOrderType,
    selectedBroker, 
    timeInForce,
    order,
    leverage,
    resetForm
  });

  // Wrap handlers with useCallback to prevent unnecessary re-renders
  const handleNextStep = useCallback(handleNextStepRaw, [
    currentStep, 
    selectedInstrument, 
    quantity, 
    price, 
    selectedBroker, 
    orderExecutionType, 
    timeInForce, 
    currentOrderType, 
    leverage,
    setOrder,
    setCurrentStep,
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice
  ]);

  const handlePreviousStep = useCallback(handlePreviousStepRaw, [
    currentStep,
    setCurrentStep
  ]);

  const handleSubmitOrder = useCallback(handleSubmitOrderRaw, [
    selectedInstrument, 
    price, 
    quantity, 
    orderExecutionType, 
    currentOrderType, 
    selectedBroker, 
    timeInForce, 
    order, 
    leverage,
    resetForm
  ]);

  return {
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder
  };
};
