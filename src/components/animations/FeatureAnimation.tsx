
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, BarChart3, FileText, Shield, Users, Lock } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface FeatureAnimationProps {
  features: FeatureItem[];
}

const FeatureAnimation: React.FC<FeatureAnimationProps> = ({ features }) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  
  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  // Get the current active feature
  const activeFeature = features[activeFeatureIndex];
  const ActiveIcon = activeFeature?.icon;

  return (
    <div className="bg-white h-full w-full overflow-hidden p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-indigo-600">Wealth</span>
            <span className="text-gray-900">Horizon</span>
          </span>
        </div>
        <div className="flex space-x-3">
          <motion.div 
            className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"
            whileHover={{ scale: 1.1 }}
          >
            <Users size={18} />
          </motion.div>
          <motion.div 
            className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"
            whileHover={{ scale: 1.1 }}
          >
            <Lock size={18} />
          </motion.div>
        </div>
      </div>

      {/* Main visualization area */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {features.slice(0, 3).map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <motion.div
              key={`summary-${index}`}
              className={`bg-white rounded-lg border p-4 shadow-sm ${index === activeFeatureIndex % 3 ? 'border-indigo-300 ring-1 ring-indigo-300' : 'border-gray-100'}`}
              animate={{ 
                scale: index === activeFeatureIndex % 3 ? 1.05 : 1,
                boxShadow: index === activeFeatureIndex % 3 ? "0 8px 30px rgba(0, 0, 0, 0.12)" : "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`w-8 h-8 rounded-lg text-white flex items-center justify-center ${
                  index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-amber-500'
                }`}>
                  <FeatureIcon size={16} />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">{feature.title}</div>
                <div className="text-sm font-medium">{index === 0 ? "$1.3B" : index === 1 ? "+8.2%" : "AA+"}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Feature highlight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`feature-${activeFeatureIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              {ActiveIcon && <ActiveIcon size={20} />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{activeFeature?.title}</h3>
          </div>
          <p className="text-sm text-gray-600">{activeFeature?.description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Chart visualization */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 overflow-hidden">
        <div className="h-20 relative">
          <motion.svg 
            className="w-full h-full" 
            viewBox="0 0 300 80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.path
              d="M0,60 C25,40 50,30 75,50 S125,70 150,35 S200,10 225,25 S275,60 300,40"
              stroke="#4F46E5"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,70 C25,65 50,60 75,55 S125,45 150,50 S200,60 225,50 S275,40 300,45"
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
            />
          </motion.svg>
          
          {/* Feature indicators on chart */}
          {features.slice(0, 4).map((_, index) => (
            <motion.div
              key={`dot-${index}`}
              className={`absolute w-3 h-3 rounded-full ${
                index === activeFeatureIndex % 4 ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              style={{
                top: `${30 + (index * 10)}%`,
                left: `${20 + (index * 25)}%`,
              }}
              animate={{
                scale: index === activeFeatureIndex % 4 ? [1, 1.5, 1] : 1,
                backgroundColor: index === activeFeatureIndex % 4 ? "#4F46E5" : "#D1D5DB"
              }}
              transition={{
                scale: {
                  duration: 1,
                  repeat: index === activeFeatureIndex % 4 ? Infinity : 0,
                  repeatType: "loop"
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureAnimation;
