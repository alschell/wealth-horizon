
import { useEffect, useState } from "react";
import { Instrument } from "../types";

interface UseTradingFormValidationProps {
  currentStep: number;
  selectedInstrument: Instrument | null;
  orderExecutionType: string | null;
  timeInForce: string | null;
  quantity: number | "";
}

export const useTradingFormValidation = ({
  currentStep,
  selectedInstrument,
  orderExecutionType,
  timeInForce,
  quantity
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
          return !quantity;
        default:
          return false;
      }
    };
    
    setNextButtonDisabled(validateCurrentStep());
  }, [currentStep, selectedInstrument, orderExecutionType, timeInForce, quantity]);

  return { nextButtonDisabled };
};
