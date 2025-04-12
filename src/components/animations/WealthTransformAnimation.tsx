
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Shield, Layers, Clock, PieChart, Users, Database, ChartLine, LucideIcon } from "lucide-react";

interface TransformItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const transformItems: TransformItem[] = [
  {
    title: "Centralized Management",
    description: "Eliminate data silos with unified platform",
    icon: <Layers size={20} />,
    color: "bg-indigo-500"
  },
  {
    title: "Data-Driven Insights",
    description: "Leverage AI-powered analytics",
    icon: <Database size={20} />,
    color: "bg-blue-500"
  },
  {
    title: "Operational Efficiency",
    description: "Streamline workflows and tasks",
    icon: <Clock size={20} />,
    color: "bg-green-500"
  },
  {
    title: "Risk Assessment",
    description: "Identify and mitigate potential risks",
    icon: <Shield size={20} />,
    color: "bg-amber-500"
  }
];

const WealthTransformAnimation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  // Auto-rotate through items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % transformItems.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white h-full w-full overflow-hidden p-6 rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-indigo-600">Transform</span>
            <span className="text-gray-900">Wealth</span>
          </span>
        </div>
        <div className="flex space-x-2">
          <div className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">Advanced</div>
          <div className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">AI-Powered</div>
        </div>
      </div>

      {/* Main visualization area */}
      <div className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`transform-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-md ${transformItems[activeIndex].color} flex items-center justify-center text-white`}>
                {transformItems[activeIndex].icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{transformItems[activeIndex].title}</h3>
                <p className="text-sm text-gray-600">{transformItems[activeIndex].description}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {transformItems.map((item, idx) => (
                <motion.div
                  key={`item-${idx}`}
                  className={`cursor-pointer p-2 rounded-md ${idx === activeIndex ? 'bg-gray-100' : 'bg-white'} border border-gray-100`}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white mb-1`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium text-center">{item.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Analytics visualization */}
      <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Transformation Impact</h4>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    Efficiency
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    78%
                  </span>
                </div>
              </div>
              <motion.div 
                className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              >
                <motion.div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                  initial={{ width: "30%" }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.div>
              </motion.div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-green-600">
                    Cost Savings
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    65%
                  </span>
                </div>
              </div>
              <motion.div 
                className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              >
                <motion.div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                  initial={{ width: "20%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                ></motion.div>
              </motion.div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-amber-600">
                    Risk Reduction
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-amber-600">
                    92%
                  </span>
                </div>
              </div>
              <motion.div 
                className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              >
                <motion.div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-600"
                  initial={{ width: "40%" }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthTransformAnimation;
