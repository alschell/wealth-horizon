
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
import FormLayout from "@/components/onboarding/common/layouts/FormLayout";
import FormSection from "@/components/onboarding/common/layouts/FormSection";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, TrendingUp } from "lucide-react";
import { OrderType } from "./types";
import TradingValiditySelection from "./sections/TradingValiditySelection";
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
    orderType: formOrderType,
    setOrderType,
    leverage,
    setLeverage
  } = useTradingForm(orderType);

  // Update the form's order type when local state changes
  useEffect(() => {
    setOrderType(orderType);
  }, [orderType, setOrderType]);

  const steps = [
    { title: "Select Instrument", component: TradingInstrumentSearch },
    { title: "Order Type", component: TradingOrderType },
    { 
      title: "Quantity & Price", 
      component: TradingQuantityPrice 
    },
    { 
      title: "Validity & Leverage", 
      component: orderExecutionType !== "market" ? TradingValiditySelection : TradingLeverageOptions 
    },
    { title: "Select Broker", component: TradingBrokerSelection },
    { title: "Allocate", component: TradingAllocation },
    { title: "Review Order", component: TradingReview }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  // Animation variants
  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Order type selection */}
      <div className="flex space-x-4 mb-8">
        <Button
          type="button"
          size="lg"
          variant={orderType === "buy" ? "default" : "outline"}
          className={`flex-1 ${orderType === "buy" ? "bg-green-600 hover:bg-green-700" : ""}`}
          onClick={() => setOrderTypeLocal("buy")}
        >
          <TrendingUp className="mr-2 h-5 w-5" />
          Buy Order
        </Button>
        <Button
          type="button"
          size="lg"
          variant={orderType === "sell" ? "default" : "outline"}
          className={`flex-1 ${orderType === "sell" ? "bg-red-600 hover:bg-red-700" : ""}`}
          onClick={() => setOrderTypeLocal("sell")}
        >
          <ArrowDownUp className="mr-2 h-5 w-5" />
          Sell Order
        </Button>
      </div>

      {/* Progress steps */}
      <div className="mb-8">
        <TradingStepsProgress 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full p-6"
          >
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
              leverage={leverage}
              setLeverage={setLeverage}
              setCurrentStep={setCurrentStep}
            />

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
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default TradingForm;
