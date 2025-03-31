
import { Instrument, OrderType } from "../../../types";

interface NextStepHandlerProps {
  currentStep: number;
  selectedInstrument: Instrument | null;
  quantity: number | "";
  price: number | "";
  orderExecutionType: string;
  selectedBroker: string | "best";
  timeInForce: string;
  currentOrderType: OrderType;
  leverage: number;
  gtdDate?: Date;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setOrder: (value: React.SetStateAction<any>) => void;
  validateInstrumentSelection: (instrument: Instrument | null) => boolean;
  validateOrderExecution: (type: string) => boolean;
  validateQuantityPrice: (quantity: number | "", price: number | "", type: string) => boolean;
}

export const useNextStepHandler = ({
  currentStep,
  selectedInstrument,
  quantity,
  price,
  orderExecutionType,
  selectedBroker,
  timeInForce,
  currentOrderType,
  leverage,
  gtdDate,
  setCurrentStep,
  setOrder,
  validateInstrumentSelection,
  validateOrderExecution,
  validateQuantityPrice
}: NextStepHandlerProps) => {
  const handleNextStep = () => {
    console.log(`Attempting to move from step ${currentStep} to ${currentStep + 1}`);

    // Common validation for all steps
    switch (currentStep) {
      case 0: // Instrument selection
        if (!validateInstrumentSelection(selectedInstrument)) return;
        break;
        
      case 1: // Order type & validity
        if (!validateOrderExecution(orderExecutionType)) return;
        // Additional validation for GTD orders
        if (timeInForce === "gtd" && !gtdDate) {
          console.log("GTD selected but no date specified");
          return;
        }
        break;
        
      case 2: // Quantity & Price
        if (!validateQuantityPrice(quantity, price, orderExecutionType)) return;
        break;
        
      case 3: // Allocation step handled by form validation
        break;
        
      case 4: // Leverage step has no specific validation
        if (typeof leverage !== 'number' || leverage < 1) {
          console.log("Invalid leverage value:", leverage);
          return;
        }
        break;
        
      case 5: // Broker selection step
        // Ensure the broker selection is valid - it can be "best" or any string value
        if (selectedBroker === undefined || selectedBroker === null) {
          console.log("Invalid broker selection:", selectedBroker);
          return;
        }
        break;
        
      // Review step -> Submit
      case 6:
        return; // Should use submit handler instead
    }

    // Update the order object with the latest values using setTimeout to avoid blocking the UI
    setTimeout(() => {
      setOrder(prevOrder => ({
        ...prevOrder,
        instrumentId: selectedInstrument?.id,
        quantity: Number(quantity),
        price: orderExecutionType === "market" ? selectedInstrument?.currentPrice : Number(price),
        brokerId: selectedBroker,
        executionType: orderExecutionType,
        timeInForce,
        orderType: currentOrderType,
        leverage,
        gtdDate: timeInForce === "gtd" ? gtdDate : undefined
      }));

      // Wait for state update before navigating
      setTimeout(() => {
        setCurrentStep(current => current + 1);
        console.log(`Successfully moved to step ${currentStep + 1}`);
      }, 0);
    }, 0);
  };

  return handleNextStep;
};
