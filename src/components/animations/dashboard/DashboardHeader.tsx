
import React from "react";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <motion.div 
      className="bg-gray-50 border-b border-gray-200 p-4 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-bold text-xl">
        <span className="text-indigo-600">Wealth</span>
        <span className="text-gray-900">Horizon</span>
      </span>
    </motion.div>
  );
};

export default DashboardHeader;
