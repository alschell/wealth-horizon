
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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-3">
        <LineChart size={16} className="text-green-600 mr-2" />
        <span className="text-sm font-medium">Performance</span>
      </div>
      
      <div className="h-[180px] relative">
        {/* Enhanced Line Chart with better visual effects */}
        <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,80 C20,70 40,85 60,50 S120,20 200,10"
            stroke="#34D399"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              y: [0, -3, 0, 3, 0]
            }}
            transition={{ 
              pathLength: { duration: 1.5, delay: 0.5 },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
          />
          
          <motion.path
            d="M0,80 C20,70 40,85 60,50 S120,20 200,10 V100 H0 Z"
            fill="url(#performanceGradient)"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -3, 0, 3, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 1.5 },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
          />
          
          {/* Animated dot that follows the path */}
          <motion.circle
            r="5"
            fill="#34D399"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              cx: [0, 40, 60, 120, 200],
              cy: [80, 85, 50, 20, 10]
            }}
            transition={{ 
              duration: 2,
              delay: 1.5,
              times: [0, 0.2, 0.4, 0.7, 1],
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1
            }}
          />
        </svg>
        
        {/* Value indicator */}
        <motion.div 
          className="absolute top-0 right-4 bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            opacity: { duration: 0.3, delay: 2 },
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        >
          +12.4%
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;
