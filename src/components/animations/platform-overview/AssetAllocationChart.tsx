
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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-3">
        <PieChart size={16} className="text-indigo-600 mr-2" />
        <span className="text-sm font-medium">Asset Allocation</span>
      </div>
      
      <div className="h-[140px] flex justify-center items-center">
        {/* Full Circle Pie Chart with thick outline style instead of filled segments */}
        <motion.svg 
          width="120" 
          height="120" 
          viewBox="0 0 100 100"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        >
          <motion.circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            strokeWidth="10"
            stroke="#E5E7EB"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* First segment - 45% of the circle (162 degrees) */}
          <motion.path
            d="M50,10 A40,40 0 0,1 87.32,35.86"
            fill="none"
            stroke="#818CF8"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          
          {/* Second segment - 30% of the circle (108 degrees) */}
          <motion.path
            d="M87.32,35.86 A40,40 0 0,1 66.82,85.36"
            fill="none"
            stroke="#34D399"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          {/* Third segment - 25% of the circle (90 degrees) */}
          <motion.path
            d="M66.82,85.36 A40,40 0 0,1 10,50 A40,40 0 0,1 50,10"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default AssetAllocationChart;
