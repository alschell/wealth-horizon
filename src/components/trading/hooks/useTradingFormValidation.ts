
import { useEffect, useState } from "react";
import { Instrument } from "../types";

interface UseTradingFormValidationProps {
  currentStep: number;
  selectedInstrument: Instrument | null;
  orderExecutionType: string | null;
  timeInForce: string | null;
  quantity: number | "";
  price?: number | "";
  selectedBroker?: string | "best";
  leverage?: number;
}

export const useTradingFormValidation = ({
  currentStep,
  selectedInstrument,
  orderExecutionType,
  timeInForce,
  quantity,
  price,
  selectedBroker,
  leverage
}: UseTradingFormValidationProps) => {
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  useEffect(() => {
    const validateCurrentStep = () => {
      console.log("Validating step:", currentStep, {
        selectedInstrument: selectedInstrument?.symbol,
        orderExecutionType,
        timeInForce, 
        quantity,
        price,
        selectedBroker,
        leverage
      });

      switch (currentStep) {
        case 0: // Instrument Selection
          return !selectedInstrument;
        
        case 1: // Order Type & Validity
          return !orderExecutionType || !timeInForce;
        
        case 2: // Quantity & Price
          if (!quantity) return true;
          // For limit and stop orders, price is required
          if (orderExecutionType === "limit" || orderExecutionType === "stop") {
            return !price;
          }
          return false;
        
        case 3: // Leverage
          return leverage === undefined || leverage === null || leverage <= 0;
        
        case 4: // Broker Selection
          // Important: Only check if broker is undefined/null, but allow empty string as valid
          // because "best" is a valid broker selection
          const isBrokerInvalid = selectedBroker === undefined || selectedBroker === null;
          console.log("Broker selection validation:", {
            selectedBroker, 
            isBrokerInvalid
          });
          return isBrokerInvalid;
        
        case 5: // Allocation
          // Always allow proceeding from allocation step (validation happens in handlers)
          return false;
        
        case 6: // Review
          // Review step should always allow proceeding to submit
          return false;
        
        default:
          return false;
      }
    };
    
    const isDisabled = validateCurrentStep();
    console.log(`Step ${currentStep} button disabled:`, isDisabled);
    setNextButtonDisabled(isDisabled);
  }, [
    currentStep, 
    selectedInstrument, 
    orderExecutionType, 
    timeInForce, 
    quantity, 
    price, 
    selectedBroker, 
    leverage
  ]);

  return { nextButtonDisabled };
};
