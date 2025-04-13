
import { useToast } from "@/hooks/use-toast";
import { Instrument, OrderType, TradeOrder } from "../../../types";

interface SubmitOrderHandlerProps {
  selectedInstrument: Instrument | null;
  price: number | "";
  quantity: number | "";
  orderExecutionType: string;
  currentOrderType: OrderType;
  selectedBroker: string | "best";
  timeInForce: string;
  order: Partial<TradeOrder>;
  leverage: number;
  gtdDate?: Date;
  resetForm: () => void;
}

/**
 * Custom hook for handling order submission in trading application
 */
export const useSubmitOrderHandler = ({
  selectedInstrument,
  price,
  quantity,
  orderExecutionType,
  currentOrderType,
  selectedBroker,
  timeInForce,
  order,
  leverage,
  gtdDate,
  resetForm
}: SubmitOrderHandlerProps) => {
  const { toast } = useToast();

  /**
   * Handles the submission of a trade order
   */
  const handleSubmitOrder = () => {
    if (!selectedInstrument) {
      toast({
        title: "Error",
        description: "No instrument selected",
        variant: "destructive"
      });
      return;
    }

    // Calculate price based on order execution type
    const calculatedPrice = orderExecutionType === "market"
      ? selectedInstrument.currentPrice || 0
      : Number(price);
    
    // Calculate total amount including leverage
    const totalAmount = Number(quantity) * calculatedPrice * (leverage || 1);
    
    // Construct the complete order object
    const completeOrder: TradeOrder = {
      ...order as TradeOrder,
      orderType: currentOrderType,
      instrumentId: selectedInstrument.id || "",
      quantity: Number(quantity),
      price: calculatedPrice,
      totalAmount,
      brokerId: selectedBroker || "best", 
      executionType: orderExecutionType || "market",
      timeInForce: timeInForce || "day", 
      leverage: leverage || 1
    };

    // Add gtdDate to the order if timeInForce is gtd
    if (timeInForce === "gtd" && gtdDate) {
      (completeOrder as any).gtdDate = gtdDate;
    }

    // In a real app, you would submit this order to your backend
    console.log("Submitting order:", completeOrder);

    // Notify the user
    toast({
      title: "Order Submitted",
      description: `Your ${currentOrderType} order for ${quantity} ${selectedInstrument.symbol} has been submitted successfully.`
    });

    // Reset form to initial state
    resetForm();
  };

  return handleSubmitOrder;
};
