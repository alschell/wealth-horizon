
import React from "react";
import { motion } from "framer-motion";

const AssetAllocationChart = () => {
  return (
    <motion.div 
      className="col-span-1 bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <div className="mb-3 text-sm font-medium">Asset Allocation</div>
      <div className="relative h-[180px] flex items-center justify-center">
        {/* Updated pie chart with thick stroke instead of fill */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            strokeWidth="12"
            stroke="#E5E7EB"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          
          {/* First segment - 45% of the circle (162 degrees) */}
          <motion.path
            d="M50,10 A40,40 0 0,1 87.32,35.86"
            fill="none"
            stroke="#818CF8"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          
          {/* Second segment - 30% of the circle (108 degrees) */}
          <motion.path
            d="M87.32,35.86 A40,40 0 0,1 66.82,85.36"
            fill="none"
            stroke="#34D399"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
          
          {/* Third segment - 25% of the circle (90 degrees) */}
          <motion.path
            d="M66.82,85.36 A40,40 0 0,1 10,50 A40,40 0 0,1 50,10"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
        </svg>
      </div>
      <div className="h-[20px]"></div> {/* Added spacing at bottom for consistency */}
    </motion.div>
  );
};

export default AssetAllocationChart;
