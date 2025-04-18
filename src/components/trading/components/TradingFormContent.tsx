
import React, { memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TradingFormNavigation from "./TradingFormNavigation";
import { OrderType, Instrument, TradeOrder } from "../types";
import TradingStepRenderer from "./TradingStepRenderer";
import { useTradingFormContent } from "../hooks/useTradingFormContent";
import TradingOrderTypeSelector from "./TradingOrderTypeSelector";
import { TRADING_FORM_STEPS } from "./TradingFormSteps";

interface TradingFormContentProps {
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
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmitOrder: () => void;
  nextButtonDisabled: boolean;
}

const TradingFormContent: React.FC<TradingFormContentProps> = ({
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
  handleNextStep,
  handlePreviousStep,
  handleSubmitOrder,
  nextButtonDisabled
}) => {
  const {
    renderError,
    isLoading,
    handleNext,
    ensureOrderHasAllocations
  } = useTradingFormContent({
    currentStep,
    selectedInstrument,
    orderType,
    order,
    setOrder,
    handleNextStep
  });
  
  // Optimize navigation handlers
  const handleNextClick = useCallback(() => {
    // Add a small delay to prevent UI blocking
    setTimeout(handleNext, 5);
  }, [handleNext]);
  
  const handlePreviousClick = useCallback(() => {
    // Add a small delay to prevent UI blocking
    setTimeout(handlePreviousStep, 5);
  }, [handlePreviousStep]);
  
  const handleSubmit = useCallback(() => {
    // Add a small delay to prevent UI blocking
    setTimeout(handleSubmitOrder, 5);
  }, [handleSubmitOrder]);
  
  const CurrentStepComponent = TRADING_FORM_STEPS[currentStep]?.component;

  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
        className="w-full p-6 border border-gray-200 rounded-md shadow-sm bg-white"
      >
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

        <div className="mt-8">
          <TradingFormNavigation
            currentStep={currentStep}
            totalSteps={TRADING_FORM_STEPS.length}
            onPrevious={handlePreviousClick}
            onNext={handleNextClick}
            onSubmit={handleSubmit}
            disabled={nextButtonDisabled}
            isLoading={isLoading}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(TradingFormContent);
