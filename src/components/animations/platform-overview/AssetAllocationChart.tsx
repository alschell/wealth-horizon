
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
      
      <div className="h-[120px] flex justify-center items-center">
        {/* Simple Pie Chart with three segments */}
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* First segment - 40% */}
          <motion.path
            d="M50,50 L50,0 A50,50 0 0,1 96.6,35 Z"
            fill="#818CF8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          {/* Second segment - 35% */}
          <motion.path
            d="M50,50 L96.6,35 A50,50 0 0,1 69.1,95.1 Z"
            fill="#34D399"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          {/* Third segment - 25% */}
          <motion.path
            d="M50,50 L69.1,95.1 A50,50 0 0,1 0,50 L50,50 Z"
            fill="#F59E0B"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          {/* Center circle for cleaner look */}
          <circle cx="50" cy="50" r="15" fill="white" />
        </svg>
      </div>
    </motion.div>
  );
};

export default AssetAllocationChart;
