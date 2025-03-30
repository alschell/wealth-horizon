
import React, { useState, useEffect } from "react";
import TradingInstrumentSearch from "./sections/TradingInstrumentSearch";
import TradingQuantityPrice from "./sections/TradingQuantityPrice";
import TradingBrokerSelection from "./sections/TradingBrokerSelection";
import TradingAllocation from "./sections/TradingAllocation";
import TradingReview from "./sections/TradingReview";
import TradingOrderType from "./sections/TradingOrderType";
import TradingStepsProgress from "./components/TradingStepsProgress";
import TradingFormContent from "./components/TradingFormContent";
import { useTradingForm } from "./hooks/useTradingForm";
import { useTradingFormValidation } from "./hooks/useTradingFormValidation";
import { OrderType } from "./types";
import TradingLeverageOptions from "./sections/TradingLeverageOptions";

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
    if (currentStep >= 4 && !selectedBroker) {
      console.log("Setting default broker to 'best'");
      setSelectedBroker("best");
    }
    
    // Initialize allocation data when reaching the allocation step
    if (currentStep === 5) {
      console.log("Preparing allocation data");
      setOrder(prevOrder => {
        const updatedOrder = { ...prevOrder };
        
        // Initialize empty arrays for allocations if they don't exist
        if (!updatedOrder.fundingAllocations) {
          updatedOrder.fundingAllocations = [];
        }
        
        if (!updatedOrder.depositAllocations) {
          updatedOrder.depositAllocations = [];
        }
        
        if (!updatedOrder.instrumentAllocations) {
          updatedOrder.instrumentAllocations = [];
        }
        
        return updatedOrder;
      });
    }
  }, [currentStep, selectedBroker, setSelectedBroker, setOrder]);

  useEffect(() => {
    setOrderType(orderType);
  }, [orderType, setOrderType]);

  const steps = [
    { title: "Select Instrument", component: TradingInstrumentSearch },
    { title: "Select Order Type & Validity", component: TradingOrderType },
    { title: "Enter Quantity & Price", component: TradingQuantityPrice },
    { title: "Set Leverage", component: TradingLeverageOptions },
    { title: "Allocate", component: TradingAllocation },
    { title: "Select Broker", component: TradingBrokerSelection },
    { title: "Review Order", component: TradingReview }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-8">New Trade</h2>
        <TradingStepsProgress 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

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
