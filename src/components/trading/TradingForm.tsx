
import React, { useState, useEffect } from "react";
import TradingInstrumentSearch from "./sections/TradingInstrumentSearch";
import TradingQuantityPrice from "./sections/quantity-price";
import TradingBrokerSelection from "./sections/TradingBrokerSelection";
import TradingAllocation from "./sections/allocation/TradingAllocation";
import TradingReview from "./sections/TradingReview";
import TradingOrderType from "./sections/order-type/TradingOrderType";
import TradingStepsProgress from "./components/TradingStepsProgress";
import TradingFormContent from "./components/TradingFormContent";
import { useTradingForm } from "./hooks/useTradingForm";
import { useTradingFormValidation } from "./hooks/useTradingFormValidation";
import { OrderType } from "./types";
import { motion } from "framer-motion";
import TradingLeverageOptions from "./sections/leverage/TradingLeverageOptions";

const TradingForm: React.FC = () => {
  const [orderType, setOrderTypeLocal] = useState<OrderType>("buy");
  const [gtdDate, setGtdDate] = useState<Date | undefined>(undefined);
  
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

  const { nextButtonDisabled } = useTradingFormValidation({
    currentStep,
    selectedInstrument,
    orderExecutionType,
    timeInForce,
    quantity,
    price,
    selectedBroker,
    order,
    gtdDate
  });

  useEffect(() => {
    console.log("TradingForm - Current step:", currentStep);
    console.log("TradingForm - Current order state:", JSON.stringify(order));
    console.log("TradingForm - GTD Date:", gtdDate);
    
    if (currentStep >= 5 && !selectedBroker) {
      console.log("Setting default broker to 'best'");
      setSelectedBroker("best");
    }
  }, [currentStep, selectedBroker, setSelectedBroker, order, gtdDate]);

  useEffect(() => {
    setOrderType(orderType);
  }, [orderType, setOrderType]);

  const steps = [
    { title: "Type & Instrument", component: TradingInstrumentSearch },
    { title: "Execution & Validity", component: TradingOrderType },
    { title: "Quantity & Price", component: TradingQuantityPrice },
    { title: "Allocation", component: TradingAllocation },
    { title: "Leverage", component: TradingLeverageOptions }, 
    { title: "Broker", component: TradingBrokerSelection },
    { title: "Review", component: TradingReview }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <header className="max-w-4xl mx-auto py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold text-black mb-8">New Trade</h1>
        </motion.div>

        <TradingStepsProgress 
          steps={steps}
          currentStep={currentStep}
        />
      </header>

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
        gtdDate={gtdDate}
        setGtdDate={setGtdDate}
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
