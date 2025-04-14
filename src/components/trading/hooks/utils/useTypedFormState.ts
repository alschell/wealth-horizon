
import { useState, useCallback, useRef } from "react";
import { OrderType, Instrument, TradeOrder } from "../../types";

interface FormStateOptions {
  initialOrderType: OrderType;
}

export interface TradingFormState {
  currentStep: number;
  selectedInstrument: Instrument | null;
  quantity: number | "";
  price: number | "";
  selectedBroker: string | "best";
  orderExecutionType: string;
  timeInForce: string;
  currentOrderType: OrderType;
  leverage: number;
  order: Partial<TradeOrder>;
}

export interface TradingFormSetters {
  setCurrentStep: (step: number) => void;
  setSelectedInstrument: (instrument: Instrument | null) => void;
  setQuantity: (quantity: number | "") => void;
  setPrice: (price: number | "") => void;
  setSelectedBroker: (broker: string | "best") => void;
  setOrderExecutionType: (type: string) => void;
  setTimeInForce: (time: string) => void;
  setOrderType: (type: OrderType) => void;
  setLeverage: (leverage: number) => void;
  setOrder: (order: Partial<TradeOrder>) => void;
  resetForm: () => void;
}

/**
 * Custom hook for managing trading form state with TypeScript typing
 */
export function useTypedFormState({ initialOrderType }: FormStateOptions): TradingFormState & TradingFormSetters {
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
      // Use setTimeout to defer the state update
      setTimeout(() => {
        setLeverage(newLeverage);
      }, 0);
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
    resetForm
  };
}
