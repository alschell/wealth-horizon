
import React from "react";
import { Card } from "@/components/ui/card";
import TradingInstrumentSearch from "./sections/TradingInstrumentSearch";
import TradingQuantityPrice from "./sections/TradingQuantityPrice";
import TradingBrokerSelection from "./sections/TradingBrokerSelection";
import TradingAllocation from "./sections/TradingAllocation";
import TradingReview from "./sections/TradingReview";
import TradingStepsProgress from "./components/TradingStepsProgress";
import TradingFormNavigation from "./components/TradingFormNavigation";
import { useTradingForm } from "./hooks/useTradingForm";
import { OrderType } from "./types";

interface TradingFormProps {
  orderType: OrderType;
}

const TradingForm: React.FC<TradingFormProps> = ({ orderType }) => {
  const {
    currentStep,
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
    handleSubmitOrder
  } = useTradingForm(orderType);

  const steps = [
    { title: "Select Instrument", component: TradingInstrumentSearch },
    { title: "Quantity & Price", component: TradingQuantityPrice },
    { title: "Select Broker", component: TradingBrokerSelection },
    { title: "Allocate Sources/Destinations", component: TradingAllocation },
    { title: "Review Order", component: TradingReview }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6">
      {/* Progress steps */}
      <TradingStepsProgress 
        steps={steps}
        currentStep={currentStep}
      />

      {/* Step content */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
        
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
        />
      </Card>

      {/* Navigation buttons */}
      <TradingFormNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={handlePreviousStep}
        onNext={handleNextStep}
        onSubmit={handleSubmitOrder}
      />
    </div>
  );
};

export default TradingForm;
