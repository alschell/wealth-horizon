
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

  const validateBrokerSelection = (selectedBroker: string | "best") => {
    if (!selectedBroker) {
      toast({
        title: "Error",
        description: "Please select a broker to proceed",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateAllocations = (
    orderType: OrderType, 
    order: Partial<TradeOrder>
  ) => {
    if (orderType === "buy" && (!order.fundingAllocations?.length || !order.depositAllocations?.length)) {
      toast({
        title: "Error",
        description: "Please allocate funding sources and destination portfolios",
        variant: "destructive"
      });
      return false;
    }

    if (orderType === "sell" && (!order.instrumentAllocations?.length || !order.depositAllocations?.length)) {
      toast({
        title: "Error",
        description: "Please allocate source portfolios and destination cash accounts",
        variant: "destructive"
      });
      return false;
    }

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
