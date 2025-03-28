
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
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownUp, TrendingUp } from "lucide-react";
import { OrderType } from "./types";
import TradingValiditySelection from "./sections/TradingValiditySelection";

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
    currentOrderType, // Updated to use currentOrderType instead of orderType
    setOrderType,
    leverage,
    setLeverage
  } = useTradingForm(orderType);

  // Update the form's order type when local state changes
  useEffect(() => {
    setOrderType(orderType);
  }, [orderType, setOrderType]);

  // Define the step components with conditions
  const steps = [
    { title: "Select Instrument", component: TradingInstrumentSearch },
    { title: "Order Type", component: TradingOrderType },
    { title: "Quantity & Price", component: TradingQuantityPrice },
    { title: "Validity & Leverage", component: TradingValiditySelection },
    { title: "Select Broker", component: TradingBrokerSelection },
    { title: "Allocate", component: TradingAllocation },
    { title: "Review Order", component: TradingReview }
  ];

  const CurrentStepComponent = steps[currentStep]?.component;

  // Animation variants
  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors ${
              orderType === "buy" 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setOrderTypeLocal("buy")}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Buy
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors ${
              orderType === "sell" 
                ? "bg-red-600 text-white hover:bg-red-700" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setOrderTypeLocal("sell")}
          >
            <ArrowDownUp className="mr-2 h-5 w-5" />
            Sell
          </button>
        </div>
        <TradingStepsProgress 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

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
          {CurrentStepComponent ? (
            <>
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}

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
    </div>
  );
};

export default TradingForm;
