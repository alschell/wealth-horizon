
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
}

export const useTradingFormValidation = ({
  currentStep,
  selectedInstrument,
  orderExecutionType,
  timeInForce,
  quantity,
  price,
  selectedBroker,
  order
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
        order
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
        
        case 4: // Broker Selection (now step 4 instead of 5)
          // Important: Only check if broker is undefined/null, but allow empty string as valid
          // because "best" is a valid broker selection
          const isBrokerInvalid = selectedBroker === undefined || selectedBroker === null;
          console.log("Broker selection validation:", {
            selectedBroker, 
            isBrokerInvalid
          });
          return isBrokerInvalid;
        
        case 5: // Review
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
    order
  ]);

  return { nextButtonDisabled };
};
