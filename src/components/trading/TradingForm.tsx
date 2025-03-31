
import React, { useState, useEffect } from "react";
import TradingFormHeader from "./components/TradingFormHeader";
import TradingFormContent from "./components/TradingFormContent";
import { useTradingForm } from "./hooks/useTradingForm";
import { useTradingFormValidation } from "./hooks/useTradingFormValidation";
import { OrderType } from "./types";

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
  } = useTradingForm(orderType, gtdDate);

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
    if (currentStep >= 5 && !selectedBroker) {
      setSelectedBroker("best");
    }
  }, [currentStep, selectedBroker, setSelectedBroker]);

  useEffect(() => {
    setOrderType(orderType);
  }, [orderType, setOrderType]);

  // Set the order's gtdDate whenever it changes
  useEffect(() => {
    if (timeInForce === "gtd") {
      setOrder(prev => ({
        ...prev,
        gtdDate
      }));
    }
  }, [gtdDate, timeInForce, setOrder]);

  return (
    <div className="max-w-4xl mx-auto">
      <TradingFormHeader 
        currentStep={currentStep}
        orderType={orderType}
        setOrderType={setOrderTypeLocal}
      />
      
      <TradingFormContent
        currentStep={currentStep}
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
