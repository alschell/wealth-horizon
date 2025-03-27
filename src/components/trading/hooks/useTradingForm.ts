
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { OrderType, Instrument, TradeOrder, Broker } from "../types";

export const useTradingForm = (orderType: OrderType) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [selectedBroker, setSelectedBroker] = useState<string | "best">("best");
  const [orderExecutionType, setOrderExecutionType] = useState<string>("market");
  const [timeInForce, setTimeInForce] = useState<string>("day");
  const [currentOrderType, setOrderType] = useState<OrderType>(orderType);
  
  const [order, setOrder] = useState<Partial<TradeOrder>>({
    orderType,
    instrumentAllocations: [],
    fundingAllocations: [],
    depositAllocations: [],
    brokerId: "best",
    executionType: "market",
    timeInForce: "day"
  });

  const handleNextStep = useCallback(() => {
    if (currentStep === 0 && !selectedInstrument) {
      toast({
        title: "Error",
        description: "Please select an instrument to proceed",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 1 && !orderExecutionType) {
      toast({
        title: "Error",
        description: "Please select an order execution type",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 2 && (!quantity || (orderExecutionType !== "market" && !price))) {
      toast({
        title: "Error",
        description: orderExecutionType === "market"
          ? "Please enter quantity to proceed"
          : "Please enter quantity and price to proceed",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3 && !selectedBroker) {
      toast({
        title: "Error",
        description: "Please select a broker to proceed",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 4) {
      // Validate allocations
      if (currentOrderType === "buy" && (!order.fundingAllocations?.length || !order.depositAllocations?.length)) {
        toast({
          title: "Error",
          description: "Please allocate funding sources and destination portfolios",
          variant: "destructive"
        });
        return;
      }

      if (currentOrderType === "sell" && (!order.instrumentAllocations?.length || !order.depositAllocations?.length)) {
        toast({
          title: "Error",
          description: "Please allocate source portfolios and destination cash accounts",
          variant: "destructive"
        });
        return;
      }
    }

    // Update order with current selections before proceeding
    setOrder(prev => ({
      ...prev,
      orderType: currentOrderType,
      instrumentId: selectedInstrument?.id || "",
      quantity: Number(quantity),
      price: Number(price),
      totalAmount: Number(quantity) * Number(price || selectedInstrument?.currentPrice || 0),
      brokerId: selectedBroker,
      executionType: orderExecutionType,
      timeInForce: timeInForce
    }));

    // Move to next step
    setCurrentStep(prev => Math.min(prev + 1, 5));
  }, [
    currentStep, 
    selectedInstrument, 
    quantity, 
    price, 
    selectedBroker, 
    orderExecutionType, 
    timeInForce, 
    currentOrderType, 
    order.fundingAllocations, 
    order.depositAllocations, 
    order.instrumentAllocations, 
    toast
  ]);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const handleSubmitOrder = useCallback(() => {
    const calculatedPrice = orderExecutionType === "market"
      ? selectedInstrument?.currentPrice || 0
      : Number(price);
      
    const totalAmount = Number(quantity) * calculatedPrice;
    
    const completeOrder: TradeOrder = {
      ...order as TradeOrder,
      orderType: currentOrderType,
      instrumentId: selectedInstrument?.id || "",
      quantity: Number(quantity),
      price: calculatedPrice,
      totalAmount,
      brokerId: selectedBroker,
      executionType: orderExecutionType,
      timeInForce: timeInForce
    };

    // In a real app, you would submit this order to your backend
    console.log("Submitting order:", completeOrder);

    toast({
      title: "Order Submitted",
      description: `Your ${currentOrderType} order for ${quantity} ${selectedInstrument?.symbol} has been submitted successfully.`,
    });

    // Reset form
    setSelectedInstrument(null);
    setQuantity("");
    setPrice("");
    setSelectedBroker("best");
    setOrderExecutionType("market");
    setTimeInForce("day");
    setOrder({
      orderType: currentOrderType,
      instrumentAllocations: [],
      fundingAllocations: [],
      depositAllocations: [],
      brokerId: "best",
      executionType: "market",
      timeInForce: "day"
    });
    setCurrentStep(0);
  }, [
    selectedInstrument, 
    price, 
    quantity, 
    orderExecutionType, 
    currentOrderType, 
    selectedBroker, 
    timeInForce, 
    order, 
    toast
  ]);

  return {
    currentStep,
    setCurrentStep,
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
    handleSubmitOrder,
    orderExecutionType,
    setOrderExecutionType,
    timeInForce,
    setTimeInForce,
    orderType: currentOrderType,
    setOrderType
  };
};
