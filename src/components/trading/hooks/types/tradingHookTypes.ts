
import { OrderType, Instrument, TradeOrder, Broker } from "../../types";

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

export interface TradingFormActions {
  setCurrentStep: (step: number) => void;
  setSelectedInstrument: (instrument: Instrument | null) => void;
  setQuantity: (quantity: number | "") => void;
  setPrice: (price: number | "") => void;
  setSelectedBroker: (brokerId: string | "best") => void;
  setOrderExecutionType: (type: string) => void;
  setTimeInForce: (timeInForce: string) => void;
  setOrderType: (orderType: OrderType) => void;
  setLeverage: (leverage: number) => void;
  setOrder: (order: React.SetStateAction<Partial<TradeOrder>>) => void;
}

export interface TradingFormHandlers {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmitOrder: () => void;
}

export type UseTradingFormReturn = TradingFormState & TradingFormActions & TradingFormHandlers;
