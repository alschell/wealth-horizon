
import React from "react";
import { motion } from "framer-motion";
import { PieChart } from "lucide-react";
import { chartVariants } from "./AnimationVariants";

const AssetAllocationChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
      initial="initial"
      animate="animate"
      variants={chartVariants}
    >
      <div className="flex items-center mb-3">
        <PieChart size={16} className="text-indigo-600 mr-2" />
        <span className="text-sm font-medium">Asset Allocation</span>
      </div>
      
      <div className="h-[140px] flex justify-center items-center">
        {/* Full Circle Pie Chart with three unequal segments */}
        <svg width="120" height="120" viewBox="0 0 100 100">
          {/* First segment - 45% */}
          <motion.path
            d="M50,50 L50,0 A50,50 0 0,1 97.6,34.2 Z"
            fill="#818CF8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          {/* Second segment - 30% */}
          <motion.path
            d="M50,50 L97.6,34.2 A50,50 0 0,1 70.7,95.1 Z"
            fill="#34D399"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          {/* Third segment - 25% */}
          <motion.path
            d="M50,50 L70.7,95.1 A50,50 0 0,1 0,50 L50,50 Z"
            fill="#F59E0B"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default AssetAllocationChart;
