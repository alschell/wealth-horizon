
import { useState, useCallback, useRef } from "react";
import { OrderType, Instrument, TradeOrder } from "../../types";

export const useFormState = (initialOrderType: OrderType) => {
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [selectedBroker, setSelectedBroker] = useState<string | "best">("best");
  const [orderExecutionType, setOrderExecutionType] = useState<string>("market");
  const [timeInForce, setTimeInForce] = useState<string>("day");
  const [currentOrderType, setOrderType] = useState<OrderType>(initialOrderType);
  const [leverage, setLeverage] = useState<number>(1);
  
  // Use a ref to track previous leverage for performance optimization
  const previousLeverageRef = useRef<number>(1);
  
  // Optimized leverage setter
  const setLeverageOptimized = useCallback((newLeverage: number) => {
    // Only update if the value has actually changed
    if (newLeverage !== previousLeverageRef.current) {
      previousLeverageRef.current = newLeverage;
      setLeverage(newLeverage);
    }
  }, []);
  
  const [order, setOrder] = useState<Partial<TradeOrder>>({
    orderType: initialOrderType,
    instrumentAllocations: [],
    fundingAllocations: [],
    depositAllocations: [],
    brokerId: "best",
    executionType: "market",
    timeInForce: "day",
    leverage: 1
  });

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setSelectedInstrument(null);
    setQuantity("");
    setPrice("");
    setSelectedBroker("best");
    setOrderExecutionType("market");
    setTimeInForce("day");
    setLeverage(1);
    previousLeverageRef.current = 1;
    setOrder({
      orderType: currentOrderType,
      instrumentAllocations: [],
      fundingAllocations: [],
      depositAllocations: [],
      brokerId: "best",
      executionType: "market",
      timeInForce: "day",
      leverage: 1
    });
    setCurrentStep(0);
  }, [currentOrderType]);

  return {
    // State
    currentStep,
    selectedInstrument,
    quantity,
    price,
    selectedBroker,
    orderExecutionType,
    timeInForce,
    currentOrderType, 
    leverage,
    order,
    
    // State setters
    setCurrentStep,
    setSelectedInstrument,
    setQuantity,
    setPrice,
    setSelectedBroker,
    setOrderExecutionType,
    setTimeInForce,
    setOrderType,
    setLeverage: setLeverageOptimized,
    setOrder,
    
    // Utilities
    resetForm
  };
};
