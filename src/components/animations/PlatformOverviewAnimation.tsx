
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ChartBar, PieChart, LineChart, Shield, ArrowRight } from "lucide-react";

const PlatformOverviewAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg">
      {/* Header */}
      <motion.div 
        className="bg-gray-50 border-b border-gray-200 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <span className="font-bold text-xl">
            <span className="text-indigo-600">Wealth</span>
            <span className="text-gray-900">Horizon</span>
          </span>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="p-6 h-[calc(100%-60px)]">
        {/* Platform Feature Overview */}
        <motion.div 
          className="mb-4 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-gray-900">Unified Wealth Management</h3>
          <p className="text-sm text-gray-500">All your assets in one place</p>
        </motion.div>
        
        {/* Platform Modules */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { title: 'Portfolio', icon: <Briefcase size={24} />, color: 'bg-indigo-100 text-indigo-600' },
            { title: 'Analysis', icon: <ChartBar size={24} />, color: 'bg-green-100 text-green-600' },
            { title: 'Security', icon: <Shield size={24} />, color: 'bg-amber-100 text-amber-600' }
          ].map((module, i) => (
            <motion.div 
              key={i}
              className={`rounded-lg p-4 flex flex-col items-center ${module.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
            >
              <div className="mb-2">{module.icon}</div>
              <div className="text-sm font-medium">{module.title}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Visualization Area */}
        <motion.div 
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Chart Visualization */}
          <motion.div 
            className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
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
          
          {/* Performance Visualization */}
          <motion.div 
            className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
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
        </motion.div>
        
        {/* Action Area */}
        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center text-sm">
            Get Started <ArrowRight size={16} className="ml-2" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformOverviewAnimation;
