
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
        {/* Simple Donut Chart */}
        <svg width="100" height="100" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#818CF8"
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 150 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#34D399"
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset="150"
            initial={{ strokeDashoffset: 150 }}
            animate={{ strokeDashoffset: 70 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#F59E0B"
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset="70"
            initial={{ strokeDashoffset: 70 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          />
          <circle cx="50" cy="50" r="30" fill="white" />
        </svg>
      </div>
    </motion.div>
  );
};

export default AssetAllocationChart;
