
import React, { useState, useEffect } from "react";
import TradingInstrumentSearch from "./sections/TradingInstrumentSearch";
import TradingQuantityPrice from "./sections/quantity-price";
import TradingBrokerSelection from "./sections/TradingBrokerSelection";
import TradingAllocation from "./sections/allocation/TradingAllocation";
import TradingReview from "./sections/TradingReview";
import TradingOrderType from "./sections/TradingOrderType";
import TradingStepsProgress from "./components/TradingStepsProgress";
import TradingFormContent from "./components/TradingFormContent";
import { useTradingForm } from "./hooks/useTradingForm";
import { useTradingFormValidation } from "./hooks/useTradingFormValidation";
import { OrderType } from "./types";
import TradingLeverageOptions from "./sections/TradingLeverageOptions";
import { motion } from "framer-motion";
import MarketInsights from "./sections/MarketInsights";

const TradingForm: React.FC = () => {
  const [orderType, setOrderTypeLocal] = useState<OrderType>("buy");
  
  const {
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
    currentOrderType,
    setOrderType,
    leverage,
    setLeverage
  } = useTradingForm(orderType);

  // Validation hook - Pass leverage to ensure proper validation
  const { nextButtonDisabled } = useTradingFormValidation({
    currentStep,
    selectedInstrument,
    orderExecutionType,
    timeInForce,
    quantity,
    price,
    selectedBroker,
    leverage
  });

  useEffect(() => {
    console.log("TradingForm - Current step:", currentStep);
    console.log("TradingForm - Current order state:", JSON.stringify(order));
    
    // Ensure we have a broker selected, defaulting to "best" if not set
    if (currentStep >= 5 && !selectedBroker) {
      console.log("Setting default broker to 'best'");
      setSelectedBroker("best");
    }
  }, [currentStep, selectedBroker, setSelectedBroker]);

  useEffect(() => {
    setOrderType(orderType);
  }, [orderType, setOrderType]);

  // Reordered steps to improve logical flow:
  // 1. Select Instrument
  // 2. Specify Order Type & Validity
  // 3. Enter Quantity & Price
  // 4. Define Allocations (funding & destination)
  // 5. Set Leverage (if applicable)
  // 6. Select Broker
  // 7. Review & Submit
  const steps = [
    { title: "Instrument", component: TradingInstrumentSearch },
    { title: "Type & Validity", component: TradingOrderType },
    { title: "Quantity & Price", component: TradingQuantityPrice },
    { title: "Allocation", component: TradingAllocation },
    { title: "Leverage", component: TradingLeverageOptions },
    { title: "Broker", component: TradingBrokerSelection },
    { title: "Review", component: TradingReview }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">New Trade</h1>
      </motion.div>

      <div className="mb-8">
        <TradingStepsProgress 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      {currentStep === 0 && <MarketInsights className="mb-8" />}

      <TradingFormContent
        currentStep={currentStep}
        steps={steps}
        orderType={orderType}
        setOrderType={setOrderTypeLocal}
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
        setCurrentStep={setCurrentStep}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleSubmitOrder={handleSubmitOrder}
        nextButtonDisabled={nextButtonDisabled}
      />
    </div>
  );
};

export default TradingForm;
