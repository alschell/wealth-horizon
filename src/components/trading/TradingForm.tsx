
import React, { useState, useEffect } from "react";
import TradingInstrumentSearch from "./sections/TradingInstrumentSearch";
import TradingQuantityPrice from "./sections/TradingQuantityPrice";
import TradingBrokerSelection from "./sections/TradingBrokerSelection";
import TradingAllocation from "./sections/TradingAllocation";
import TradingReview from "./sections/TradingReview";
import TradingOrderType from "./sections/TradingOrderType";
import TradingStepsProgress from "./components/TradingStepsProgress";
import TradingFormNavigation from "./components/TradingFormNavigation";
import { useTradingForm } from "./hooks/useTradingForm";
import { OrderType } from "./types";
import FormLayout from "@/components/onboarding/common/layouts/FormLayout";
import FormSection from "@/components/onboarding/common/layouts/FormSection";

interface TradingFormProps {
  orderType: OrderType;
}

const TradingForm: React.FC<TradingFormProps> = ({ orderType: initialOrderType }) => {
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
    orderType,
    setOrderType
  } = useTradingForm(initialOrderType);

  // Update base order type when parent changes the tab
  useEffect(() => {
    setOrderType(initialOrderType);
  }, [initialOrderType, setOrderType]);

  const steps = [
    { title: "Select Instrument", component: TradingInstrumentSearch },
    { title: "Order Type", component: TradingOrderType },
    { title: "Quantity & Price", component: TradingQuantityPrice },
    { title: "Select Broker", component: TradingBrokerSelection },
    { title: "Allocate", component: TradingAllocation },
    { title: "Review Order", component: TradingReview }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress steps outside the card */}
      <div className="mb-8">
        <TradingStepsProgress 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      <FormLayout>
        <FormSection>
          <h2 className="text-xl font-semibold mb-6">{steps[currentStep].title}</h2>
          
          <CurrentStepComponent 
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
            setCurrentStep={setCurrentStep}
          />
        </FormSection>

        {/* Navigation buttons */}
        <div className="mt-8">
          <TradingFormNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            onSubmit={handleSubmitOrder}
          />
        </div>
      </FormLayout>
    </div>
  );
};

export default TradingForm;
