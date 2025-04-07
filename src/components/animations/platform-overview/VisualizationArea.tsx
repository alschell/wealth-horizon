
import React from "react";
import { motion } from "framer-motion";
import AssetAllocationChart from "./AssetAllocationChart";
import PerformanceChart from "./PerformanceChart";

const VisualizationArea: React.FC = () => {
  return (
    <motion.div 
      className="grid grid-cols-2 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <AssetAllocationChart />
      <PerformanceChart />
    </motion.div>
  );
};

export default VisualizationArea;
