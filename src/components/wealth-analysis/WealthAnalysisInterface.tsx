
import React from "react";
import { motion } from "framer-motion";
import WealthAnalysisHeader from "./components/WealthAnalysisHeader";
import AssetAllocation from "./sections/AssetAllocation";
import PerformanceAnalysis from "./sections/PerformanceAnalysis";
import ScenarioSimulation from "./sections/scenario-simulation";
import RiskAssessment from "./sections/risk-assessment/RiskAssessment";

const WealthAnalysisInterface = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <WealthAnalysisHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetAllocation />
        <PerformanceAnalysis />
      </div>
      
      <ScenarioSimulation />
      <RiskAssessment />
    </motion.div>
  );
};

export default WealthAnalysisInterface;
