
import React from "react";
import { motion } from "framer-motion";

const PlatformOverviewAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg">
      {/* Header with tabs */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 pt-4">
        <div className="flex space-x-6">
          {["Overview", "Analysis", "Reports", "Settings"].map((tab, i) => (
            <motion.div 
              key={tab}
              className={`pb-4 relative ${i === 0 ? 'border-b-2 border-indigo-500' : ''}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
            >
              <span className={`font-medium ${i === 0 ? 'text-indigo-600' : 'text-gray-500'}`}>{tab}</span>
              {i === 0 && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-6 grid grid-cols-3 gap-6">
        {/* Left Panel */}
        <motion.div 
          className="col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Summary Card */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <motion.div 
                    className="h-8 bg-indigo-100 rounded font-medium flex items-center justify-center text-indigo-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                  >
                    {i % 2 === 0 ? '+' : ''}
                    {Math.floor(Math.random() * 100)}%
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* List Cards */}
          {[1, 2].map((cardIndex) => (
            <div key={cardIndex} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  className="py-3 border-b border-gray-100 flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + (i * 0.1) }}
                >
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-indigo-100" />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
        
        {/* Main Content Area */}
        <motion.div 
          className="col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* Chart Area */}
          <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="flex space-x-3">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    className={`h-8 w-20 rounded flex items-center justify-center ${i === 1 ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 + (i * 0.1) }}
                  />
                ))}
              </div>
            </div>
            
            {/* Interactive Chart */}
            <div className="h-64 relative">
              {/* Chart lines */}
              <motion.div 
                className="absolute inset-x-0 bottom-0 h-px bg-gray-200"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
              />
              
              {/* Data series */}
              <div className="absolute inset-0 flex items-end">
                <motion.svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full" 
                  preserveAspectRatio="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <motion.path
                    d="M0,50 C20,30 40,80 60,40 S80,50 100,20"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, delay: 1.4, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M0,70 C25,65 40,40 60,60 S80,30 100,50"
                    fill="none"
                    stroke="#93C5FD"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, delay: 1.6, ease: "easeInOut" }}
                  />
                </motion.svg>
              </div>
              
              {/* Data points */}
              {[10, 30, 50, 70, 90].map((pos, i) => (
                <motion.div 
                  key={i}
                  className="absolute bottom-0 h-1 w-1 rounded-full bg-indigo-500"
                  style={{ left: `${pos}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 2 + (i * 0.1) }}
                >
                  <motion.div 
                    className="absolute bottom-full mb-1 w-10 text-xs text-center text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 2.2 + (i * 0.1) }}
                  >
                    {i * 25}%
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Data Grid */}
          <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <motion.button 
                className="h-8 w-24 bg-indigo-100 rounded text-indigo-600 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2.5 }}
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="bg-white p-4 rounded shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 2.6 + (i * 0.05) }}
                >
                  <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                  <div className="h-10 w-full bg-gray-50 rounded" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformOverviewAnimation;
