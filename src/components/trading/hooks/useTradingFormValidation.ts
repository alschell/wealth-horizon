
import { useEffect, useState } from "react";
import { Instrument, TradeOrder, OrderType } from "../types";

interface UseTradingFormValidationProps {
  currentStep: number;
  selectedInstrument: Instrument | null;
  orderExecutionType: string | null;
  timeInForce: string | null;
  quantity: number | "";
  price?: number | "";
  selectedBroker?: string | "best";
  order?: Partial<TradeOrder>;
  gtdDate?: Date;
}

export const useTradingFormValidation = ({
  currentStep,
  selectedInstrument,
  orderExecutionType,
  timeInForce,
  quantity,
  price,
  selectedBroker,
  order,
  gtdDate
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
        order,
        gtdDate
      });

      switch (currentStep) {
        case 0: // Type & Instrument
          return !selectedInstrument;
        
        case 1: // Execution & Validity
          // Check if execution type and timeInForce are set
          if (!orderExecutionType || !timeInForce) {
            return true;
          }
          // Check if GTD is selected but no date is set
          if (timeInForce === "gtd" && !gtdDate) {
            console.log("GTD selected but no date set, disabling next button");
            return true;
          }
          return false;
        
        case 2: // Quantity & Price
          if (!quantity) return true;
          // For limit and stop orders, price is required
          if (orderExecutionType === "limit" || orderExecutionType === "stop" || 
              orderExecutionType === "stop_limit" || orderExecutionType === "trailing_stop") {
            return !price;
          }
          return false;
        
        case 3: // Allocation
          // Check if proper allocations have been made based on order type
          if (!order) return true;
          
          // For buy orders, check both funding and destination
          if (order.orderType === 'buy') {
            const hasFunding = order.fundingAllocations && order.fundingAllocations.length > 0;
            const hasDestination = order.depositAllocations && order.depositAllocations.length > 0;
            return !(hasFunding && hasDestination);
          } 
          // For sell orders, check source and cash destination
          else if (order.orderType === 'sell') {
            const hasInstrumentSource = order.instrumentAllocations && order.instrumentAllocations.length > 0;
            
            const hasCashDestination = order.depositAllocations && 
              order.depositAllocations.some(allocation => allocation.destinationType === 'cash');
            
            return !(hasInstrumentSource && hasCashDestination);
          }
          
          return true;
        
        case 4: // Leverage - Now before broker
          // Make sure leverage has a valid value (greater than or equal to 1)
          return !(order?.leverage !== undefined && order.leverage >= 1);
          
        case 5: // Broker Selection - Now after leverage
          // Check if broker is undefined/null, but allow empty string as valid
          // because "best" is a valid broker selection
          return selectedBroker === undefined || selectedBroker === null;
          
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
    order,
    gtdDate
  ]);

  return { nextButtonDisabled };
};
