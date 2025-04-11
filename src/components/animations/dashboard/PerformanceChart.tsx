
import React from "react";
import { motion } from "framer-motion";

const PerformanceChart = () => {
  return (
    <motion.div 
      className="col-span-2 bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <div className="mb-3 text-sm font-medium">Portfolio Performance</div>
      <div className="h-[180px] relative">
        {/* Simplified Line Chart */}
        <svg width="100%" height="100%" viewBox="0 0 300 140" preserveAspectRatio="none">
          <motion.path
            d="M0,80 C20,70 40,85 60,75 S100,50 140,60 S220,40 280,20"
            stroke="#818CF8"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <motion.path
            d="M0,80 C20,70 40,85 60,75 S100,50 140,60 S220,40 280,20"
            stroke="url(#gradient)"
            strokeWidth="20"
            strokeOpacity="0.1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Value indicators */}
        <motion.div 
          className="absolute top-0 right-6 bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2 }}
        >
          +12.4%
        </motion.div>
      </div>
      <div className="h-[20px]"></div> {/* Added spacing at bottom for consistency */}
    </motion.div>
  );
};

export default PerformanceChart;
