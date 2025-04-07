
import React from "react";
import { motion } from "framer-motion";

const DashboardAnimation = () => {
  return (
    <div className="relative w-full h-full bg-gray-50 overflow-hidden rounded-lg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <motion.div 
          className="h-6 w-40 bg-indigo-100 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Main Content */}
      <div className="p-6 grid grid-cols-6 gap-4">
        {/* Sidebar */}
        <motion.div 
          className="col-span-1 bg-white h-64 rounded-lg shadow-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i}
              className="h-8 mx-3 my-4 bg-gray-100 rounded"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
            />
          ))}
        </motion.div>
        
        {/* Main Dashboard */}
        <div className="col-span-5 space-y-4">
          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm h-40 relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="h-6 w-24 bg-gray-100 rounded mb-4" />
              {/* Chart Animation */}
              <div className="flex items-end h-24 space-x-2">
                {[40, 70, 45, 80, 60, 75, 65, 90].map((height, i) => (
                  <motion.div 
                    key={i}
                    className="bg-indigo-400 rounded-t w-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.6, delay: 0.8 + (i * 0.1) }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm h-40 flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="relative w-32 h-32">
                <motion.div 
                  className="absolute inset-0 rounded-full border-8 border-indigo-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-indigo-500"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, delay: 1.2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Data Rows */}
          {[1, 2].map((row) => (
            <motion.div 
              key={row}
              className="bg-white p-4 rounded-lg shadow-sm"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + (row * 0.2) }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-32 bg-gray-100 rounded" />
                <div className="h-8 w-24 bg-indigo-100 rounded" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    className="h-12 bg-gray-50 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 + (i * 0.1) }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnimation;
