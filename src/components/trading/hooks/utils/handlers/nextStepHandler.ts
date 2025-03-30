
import { useToast } from "@/components/ui/use-toast";
import { Instrument, OrderType, TradeOrder } from "../../../types";

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
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setOrder: (value: React.SetStateAction<Partial<TradeOrder>>) => void;
  validateInstrumentSelection: (selectedInstrument: any) => boolean;
  validateOrderExecution: (orderExecutionType: string) => boolean;
  validateQuantityPrice: (quantity: number | "", price: number | "", orderExecutionType: string) => boolean;
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
  setCurrentStep,
  setOrder,
  validateInstrumentSelection,
  validateOrderExecution,
  validateQuantityPrice
}: NextStepHandlerProps) => {
  const { toast } = useToast();
  
  const handleNextStep = () => {
    console.log("handleNextStep called, current step:", currentStep);
    console.log("Current state:", {
      selectedInstrument: selectedInstrument?.symbol,
      quantity,
      price,
      orderExecutionType,
      selectedBroker,
      timeInForce,
      leverage
    });
    
    try {
      // Step 0: Instrument Selection
      if (currentStep === 0 && !validateInstrumentSelection(selectedInstrument)) {
        console.log("Validation failed: instrument selection");
        return;
      }

      // Step 1: Order Type
      if (currentStep === 1 && !validateOrderExecution(orderExecutionType)) {
        console.log("Validation failed: order execution");
        return;
      }

      // Step 2: Quantity & Price
      if (currentStep === 2 && !validateQuantityPrice(quantity, price, orderExecutionType)) {
        console.log("Validation failed: quantity/price");
        return;
      }
      
      // Step 3: Allocation validation
      
      // Step 4: Broker Selection
      if (currentStep === 4) {
        console.log("Validating broker:", selectedBroker);
        // Only validate if defined (undefined means no selection has been made)
        if (selectedBroker === undefined || selectedBroker === null) {
          console.log("Validation failed: broker selection");
          toast({
            title: "Error",
            description: "Please select a broker to proceed",
            variant: "destructive"
          });
          return;
        }
      }

      // Update order with current selections before proceeding
      console.log("Updating order state with current selections");
      setOrder(prev => {
        // Create updated order with all current values
        const updatedOrder: Partial<TradeOrder> = {
          ...prev,
          orderType: currentOrderType,
          instrumentId: selectedInstrument?.id || "",
          quantity: Number(quantity),
          price: Number(price || (selectedInstrument?.currentPrice || 0)),
          totalAmount: Number(quantity) * Number(price || selectedInstrument?.currentPrice || 0),
          brokerId: selectedBroker || "best",
          executionType: orderExecutionType || "market", 
          timeInForce: timeInForce || "day",
          leverage: 1 // Just set a default value of 1, no longer using leverage
        };
        console.log("Updated order:", updatedOrder);
        return updatedOrder;
      });

      // Move to next step
      const nextStep = currentStep + 1;
      console.log("Moving to next step:", nextStep);
      setCurrentStep(nextStep);
    } catch (error) {
      console.error("Error in handleNextStep:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  return handleNextStep;
};
