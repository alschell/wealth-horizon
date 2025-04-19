
import React from 'react';
import { motion } from 'framer-motion';
import { OrderType, Instrument, TradeOrder } from '../../types';
import TradingStepRenderer from '../TradingStepRenderer';
import { TRADING_FORM_STEPS } from '../TradingFormSteps';
import TradingOrderTypeSelector from '../TradingOrderTypeSelector';

interface TradingFormContentBodyProps {
  currentStep: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
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
  setGtdDate: (date?: Date) => void;
  setCurrentStep: (step: number) => void;
  renderError: string | null;
  ensureOrderHasAllocations: () => void;
}

const variants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const TradingFormContentBody: React.FC<TradingFormContentBodyProps> = ({
  currentStep,
  orderType,
  setOrderType,
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
  orderExecutionType,
  setOrderExecutionType,
  timeInForce,
  setTimeInForce,
  leverage,
  setLeverage,
  gtdDate,
  setGtdDate,
  setCurrentStep,
  renderError,
  ensureOrderHasAllocations
}) => {
  const CurrentStepComponent = TRADING_FORM_STEPS[currentStep]?.component;

  return (
    <>
      {/* Step Header - Consistent across all steps */}
      <h2 className="text-xl font-semibold mb-6">
        {TRADING_FORM_STEPS[currentStep]?.title || ""}
      </h2>
      
      {currentStep === 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Type</h3>
          <TradingOrderTypeSelector 
            orderType={orderType} 
            setOrderType={setOrderType} 
          />
        </div>
      )}
      
      <TradingStepRenderer
        CurrentStepComponent={CurrentStepComponent}
        stepTitle=""
        orderType={orderType}
        selectedInstrument={selectedInstrument}
        setSelectedInstrument={setSelectedInstrument}
        quantity={quantity}
        setQuantity={setQuantity}
        price={price}
        setPrice={setPrice}
        selectedBroker={selectedBroker}
        setSelectedBroker={setSelectedBroker}
        order={order}
        setOrder={setOrder}
        orderExecutionType={orderExecutionType}
        setOrderExecutionType={setOrderExecutionType}
        timeInForce={timeInForce}
        setTimeInForce={setTimeInForce}
        leverage={leverage}
        setLeverage={setLeverage}
        gtdDate={gtdDate}
        setGtdDate={setGtdDate}
        setCurrentStep={setCurrentStep}
        renderError={renderError}
        ensureOrderHasAllocations={ensureOrderHasAllocations}
      />
    </>
  );
};
