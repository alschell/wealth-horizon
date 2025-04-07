
import React from "react";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";
import { performanceVariants } from "./AnimationVariants";

const PerformanceChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
      initial="initial"
      animate="animate"
      variants={performanceVariants}
    >
      <div className="flex items-center mb-3">
        <LineChart size={16} className="text-green-600 mr-2" />
        <span className="text-sm font-medium">Performance</span>
      </div>
      
      <div className="h-[120px] relative">
        {/* Simple Line Chart */}
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
          <motion.path
            d="M0,80 C20,70 40,85 60,50 S120,20 200,10"
            stroke="#34D399"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;
