
import React from "react";
import { motion } from "framer-motion";
import DashboardHeader from "./DashboardHeader";
import SummaryCards from "./SummaryCards";
import AssetAllocationChart from "./AssetAllocationChart";
import PerformanceChart from "./PerformanceChart";

const DashboardAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg">
      <DashboardHeader />
      
      {/* Main Content */}
      <div className="p-6 flex flex-col h-[calc(100%-60px)]">
        <SummaryCards />
        
        {/* Chart Area */}
        <motion.div 
          className="flex-1 grid grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <AssetAllocationChart />
          <PerformanceChart />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardAnimation;
