
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TradingFormNavigation from "./TradingFormNavigation";
import { OrderType, Instrument, TradeOrder } from "../types";

interface Step {
  title: string;
  component: React.ComponentType<any>;
}

interface TradingFormContentProps {
  currentStep: number;
  steps: Step[];
  orderType: OrderType;
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
  setCurrentStep: (step: number) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmitOrder: () => void;
  nextButtonDisabled: boolean;
}

const TradingFormContent: React.FC<TradingFormContentProps> = ({
  currentStep,
  steps,
  orderType,
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
  setCurrentStep,
  handleNextStep,
  handlePreviousStep,
  handleSubmitOrder,
  nextButtonDisabled
}) => {
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Log whenever the current step changes to help with debugging
  useEffect(() => {
    console.log(`TradingFormContent: Current step changed to ${currentStep}`, { 
      stepName: steps[currentStep]?.title,
      component: steps[currentStep]?.component?.name
    });
  }, [currentStep, steps]);
  
  const CurrentStepComponent = steps[currentStep]?.component;

  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // Wrap next button click with loading state
  const handleNext = () => {
    setIsLoading(true);
    
    // Use setTimeout to allow UI to update before potentially heavy operations
    setTimeout(() => {
      try {
        handleNextStep();
      } catch (error) {
        console.error("Error in next step handler:", error);
        setRenderError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }, 10);
  };

  const renderCurrentStep = () => {
    try {
      if (!CurrentStepComponent) {
        console.error("No component found for step", currentStep);
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Component not found for this step.</p>
          </div>
        );
      }

      console.log(`Rendering step ${currentStep}:`, {
        component: CurrentStepComponent.name || "Unknown",
        orderType,
        selectedBroker,
        orderExecutionType
      });

      return (
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
      );
    } catch (error) {
      console.error("Error rendering trading step:", error);
      setRenderError(error instanceof Error ? error.message : "Unknown error");
      return (
        <div className="text-center py-12 text-red-500">
          <p>An error occurred while rendering this step.</p>
          <p className="text-sm mt-2">{renderError}</p>
        </div>
      );
    }
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
        {renderCurrentStep()}

        <div className="mt-8">
          <TradingFormNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePreviousStep}
            onNext={handleNext}
            onSubmit={handleSubmitOrder}
            disabled={nextButtonDisabled}
            isLoading={isLoading}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TradingFormContent;
