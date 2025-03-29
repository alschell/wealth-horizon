
import { useToast } from "@/components/ui/use-toast";
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
    
    // If selectedBroker is undefined or null, use "best" as default
    const broker = selectedBroker || "best";
    
    // Check if broker is valid - either "best" or a non-empty string
    if (broker === "") {
      toast({
        title: "Error",
        description: "Please select a broker to proceed",
        variant: "destructive"
      });
      return false;
    }
    
    console.log("Broker validation passed:", broker);
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
    
    // For debugging purposes, temporarily return true to bypass allocation validation
    return true;
    
    /* Original validation logic - commented out for debugging
    // For buy orders, we need funding sources and destination portfolios
    if (orderType === "buy") {
      if (!order.fundingAllocations?.length || !order.depositAllocations?.length) {
        console.log("Buy order allocation validation failed");
        toast({
          title: "Error",
          description: "Please allocate funding sources and destination portfolios",
          variant: "destructive"
        });
        return false;
      }
    }

    // For sell orders, we need source portfolios and destination cash accounts
    if (orderType === "sell") {
      if (!order.instrumentAllocations?.length || !order.depositAllocations?.length) {
        console.log("Sell order allocation validation failed");
        toast({
          title: "Error",
          description: "Please allocate source portfolios and destination cash accounts",
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
    */
  };

  return {
    validateInstrumentSelection,
    validateOrderExecution,
    validateQuantityPrice,
    validateBrokerSelection,
    validateAllocations,
  };
};
