
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
          return !leverage; // Leverage must be set (should default to 1 in most cases)
        
        case 4: // Broker Selection
          return !selectedBroker;
        
        case 5: // Allocation
          // Basic validation - we'll let the allocation section handle more complex validation
          return false;
        
        case 6: // Review
          // Review step should always allow proceeding to submit
          return false;
        
        default:
          return false;
      }
    };
    
    setNextButtonDisabled(validateCurrentStep());
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
