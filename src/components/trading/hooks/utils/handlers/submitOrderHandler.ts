
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
  gtdDate?: Date; // Added gtdDate property
  resetForm: () => void;
}

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

  const handleSubmitOrder = () => {
    const calculatedPrice = orderExecutionType === "market"
      ? selectedInstrument?.currentPrice || 0
      : Number(price);
      
    const totalAmount = Number(quantity) * calculatedPrice * (leverage || 1);
    
    const completeOrder: TradeOrder = {
      ...order as TradeOrder,
      orderType: currentOrderType,
      instrumentId: selectedInstrument?.id || "",
      quantity: Number(quantity),
      price: calculatedPrice,
      totalAmount,
      brokerId: selectedBroker || "best", 
      executionType: orderExecutionType || "market",
      timeInForce: timeInForce || "day", 
      leverage: leverage || 1
    };

    // Add gtdDate to the completeOrder if timeInForce is gtd
    if (timeInForce === "gtd" && gtdDate) {
      (completeOrder as any).gtdDate = gtdDate;
    }

    // In a real app, you would submit this order to your backend
    console.log("Submitting order:", completeOrder);

    toast({
      title: "Order Submitted",
      description: `Your ${currentOrderType} order for ${quantity} ${selectedInstrument?.symbol} has been submitted successfully.`,
    });

    // Reset form to initial state
    resetForm();
  };

  return handleSubmitOrder;
};
