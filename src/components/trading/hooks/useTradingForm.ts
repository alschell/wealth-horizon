
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { OrderType, Instrument, TradeOrder, Broker } from "../types";

export const useTradingForm = (orderType: OrderType) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [selectedBroker, setSelectedBroker] = useState<string | "best">("best");
  const [order, setOrder] = useState<Partial<TradeOrder>>({
    orderType,
    instrumentAllocations: [],
    fundingAllocations: [],
    depositAllocations: [],
    brokerId: "best"
  });

  const handleNextStep = () => {
    if (currentStep === 0 && !selectedInstrument) {
      toast({
        title: "Error",
        description: "Please select an instrument to proceed",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 1 && (!quantity || !price)) {
      toast({
        title: "Error",
        description: "Please enter quantity and price to proceed",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3) {
      // Validate allocations
      if (orderType === "buy" && (!order.fundingAllocations?.length || !order.depositAllocations?.length)) {
        toast({
          title: "Error",
          description: "Please allocate funding sources and destination portfolios",
          variant: "destructive"
        });
        return;
      }

      if (orderType === "sell" && (!order.instrumentAllocations?.length || !order.depositAllocations?.length)) {
        toast({
          title: "Error",
          description: "Please allocate source portfolios and destination cash accounts",
          variant: "destructive"
        });
        return;
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmitOrder = () => {
    const totalAmount = Number(quantity) * Number(price);
    const completeOrder: TradeOrder = {
      ...order as TradeOrder,
      orderType,
      instrumentId: selectedInstrument?.id || "",
      quantity: Number(quantity),
      price: Number(price),
      totalAmount,
      brokerId: selectedBroker
    };

    // In a real app, you would submit this order to your backend
    console.log("Submitting order:", completeOrder);

    toast({
      title: "Order Submitted",
      description: `Your ${orderType} order for ${quantity} ${selectedInstrument?.symbol} has been submitted successfully.`,
    });

    // Reset form
    setSelectedInstrument(null);
    setQuantity("");
    setPrice("");
    setSelectedBroker("best");
    setOrder({
      orderType,
      instrumentAllocations: [],
      fundingAllocations: [],
      depositAllocations: [],
      brokerId: "best"
    });
    setCurrentStep(0);
  };

  return {
    currentStep,
    selectedInstrument,
    setSelectedInstrument,
    quantity,
    setQuantity,
    price,
    setPrice,
    selectedBroker,
    setSelectedBroker,
    order,
    setOrder,
    handleNextStep,
    handlePreviousStep,
    handleSubmitOrder
  };
};
