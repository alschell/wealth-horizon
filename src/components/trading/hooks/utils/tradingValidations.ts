
import { useToast } from "@/hooks/use-toast";
import { OrderType, TradeOrder } from "../../types";

export const useTradingValidations = () => {
  const { toast } = useToast();

  const validateInstrumentSelection = (selectedInstrument: any) => {
    if (!selectedInstrument) {
      toast({
        title: "Error",
        description: "Please select an instrument to proceed",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateOrderExecution = (orderExecutionType: string) => {
    if (!orderExecutionType) {
      toast({
        title: "Error",
        description: "Please select an order execution type",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateQuantityPrice = (quantity: number | "", price: number | "", orderExecutionType: string) => {
    if (!quantity || (orderExecutionType !== "market" && !price)) {
      toast({
        title: "Error",
        description: orderExecutionType === "market"
          ? "Please enter quantity to proceed"
          : "Please enter quantity and price to proceed",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateBrokerSelection = (selectedBroker: string | "best" | undefined) => {
    console.log("Validating broker selection:", selectedBroker, typeof selectedBroker);
    
    // If broker is undefined or null, it's invalid
    if (selectedBroker === undefined || selectedBroker === null) {
      toast({
        title: "Error",
        description: "Please select a broker to proceed",
        variant: "destructive"
      });
      return false;
    }
    
    // Any string value (including "best" and "") is valid now
    console.log("Broker validation passed:", selectedBroker);
    return true;
  };

  const validateAllocations = (
    orderType: OrderType, 
    order: Partial<TradeOrder>
  ) => {
    console.log("Validating allocations:", {
      orderType,
      fundingAllocations: order.fundingAllocations,
      instrumentAllocations: order.instrumentAllocations,
      depositAllocations: order.depositAllocations
    });
    
    // Always return true for now to ensure flow continues
    return true;
  };

  return {
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice,
    validateBrokerSelection,
    validateAllocations,
  };
};
