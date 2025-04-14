
import React from "react";
import { OrderType, Instrument, TradeOrder } from "../types";

// Import all step components
import TradingInstrumentSearch from "../sections/TradingInstrumentSearch";
import TradingQuantityPrice from "../sections/quantity-price";
import TradingBrokerSelection from "../sections/TradingBrokerSelection";
import TradingAllocation from "../sections/allocation/TradingAllocation";
import TradingReview from "../sections/TradingReview";
import TradingOrderType from "../sections/order-type/TradingOrderType";
import TradingLeverageOptions from "../sections/leverage/TradingLeverageOptions";

export interface Step {
  title: string;
  component: React.ComponentType<any>;
}

/**
 * Trading form steps configuration
 */
export const TRADING_FORM_STEPS: Step[] = [
  { title: "Type & Instrument", component: TradingInstrumentSearch },
  { title: "Execution & Validity", component: TradingOrderType },
  { title: "Quantity & Price", component: TradingQuantityPrice },
  { title: "Allocation", component: TradingAllocation },
  { title: "Leverage", component: TradingLeverageOptions },
  { title: "Broker", component: TradingBrokerSelection },
  { title: "Review", component: TradingReview }
];

/**
 * Common props interface for trading form components
 */
export interface TradingFormComponentProps {
  orderType: OrderType;
  selectedInstrument: Instrument | null;
  setSelectedInstrument: (instrument: Instrument | null) => void;
  quantity: number | "";
  setQuantity: (quantity: number | "") => void;
  price: number | "";
  setPrice: (price: number | "") => void;
  selectedBroker: string | "best";
  setSelectedBroker: (broker: string | "best") => void;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
  timeInForce: string;
  setTimeInForce: (time: string) => void;
  leverage: number;
  setLeverage: (leverage: number) => void;
  gtdDate?: Date;
  setGtdDate?: (date?: Date) => void;
  setCurrentStep: (step: number) => void;
}
