
import React from "react";
import { motion } from "framer-motion";
import { OrderType } from "../types";
import TradingStepsProgress from "./TradingStepsProgress";

// Import order type selector
import TradingOrderTypeSelector from "./TradingOrderTypeSelector";

// Define the trading steps
const steps = [
  { title: "Type & Instrument", component: null },
  { title: "Execution & Validity", component: null },
  { title: "Quantity & Price", component: null },
  { title: "Allocation", component: null },
  { title: "Leverage", component: null },
  { title: "Broker", component: null },
  { title: "Review", component: null }
];

interface TradingFormHeaderProps {
  currentStep: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
}

const TradingFormHeader: React.FC<TradingFormHeaderProps> = ({
  currentStep,
  orderType,
  setOrderType
}) => {
  return (
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
  );
};

export default TradingFormHeader;
