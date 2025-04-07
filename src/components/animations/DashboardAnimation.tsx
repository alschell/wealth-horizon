
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, Wallet, ArrowUpRight, Shield, TrendingUp } from "lucide-react";

const DashboardAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg">
      {/* Header with Logo */}
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
      
      {/* Main Content */}
      <div className="p-6 flex flex-col h-[calc(100%-60px)]">
        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { title: 'Total Assets', value: '$2.4M', icon: <Wallet size={18} />, color: 'bg-blue-500' },
            { title: 'Performance', value: '+8.2%', icon: <TrendingUp size={18} />, color: 'bg-green-500' },
            { title: 'Risk Score', value: 'AA+', icon: <Shield size={18} />, color: 'bg-amber-500' }
          ].map((card, i) => (
            <motion.div 
              key={i}
              className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
            >
              <div className="flex justify-between items-start">
                <div className={`${card.color} w-8 h-8 rounded-lg text-white flex items-center justify-center`}>
                  {card.icon}
                </div>
                <ArrowUpRight className="text-green-500" size={16} />
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-500">{card.title}</div>
                <div className="text-lg font-bold">{card.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Chart Area */}
        <motion.div 
          className="flex-1 grid grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Asset Allocation Chart - Updated with outline style */}
          <motion.div 
            className="col-span-1 bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <div className="mb-3 text-sm font-medium">Asset Allocation</div>
            <div className="relative h-[150px] flex items-center justify-center">
              {/* Updated pie chart with thick stroke instead of fill */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  strokeWidth="8"
                  stroke="#E5E7EB"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                
                {/* First segment - 45% of the circle (162 degrees) */}
                <motion.path
                  d="M50,10 A40,40 0 0,1 87.32,35.86"
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
                
                {/* Second segment - 30% of the circle (108 degrees) */}
                <motion.path
                  d="M87.32,35.86 A40,40 0 0,1 66.82,85.36"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                />
                
                {/* Third segment - 25% of the circle (90 degrees) */}
                <motion.path
                  d="M66.82,85.36 A40,40 0 0,1 10,50"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </svg>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {[
                { label: 'Stocks', value: '45%', color: '#818CF8' },
                { label: 'Bonds', value: '30%', color: '#34D399' },
                { label: 'Alt', value: '25%', color: '#F59E0B' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 + (i * 0.1) }}
                >
                  <div className="w-3 h-3 rounded-sm mb-1" style={{ backgroundColor: item.color }}></div>
                  <div className="text-xs text-center">{item.label}</div>
                  <div className="text-xs font-medium">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Performance Chart */}
          <motion.div 
            className="col-span-2 bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <div className="mb-3 text-sm font-medium">Portfolio Performance</div>
            <div className="h-[120px] relative">
              {/* Simplified Line Chart */}
              <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                <motion.path
                  d="M0,80 C20,70 40,85 60,75 S100,50 140,60 S220,40 280,20"
                  stroke="#818CF8"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                <motion.path
                  d="M0,80 C20,70 40,85 60,75 S100,50 140,60 S220,40 280,20"
                  stroke="url(#gradient)"
                  strokeWidth="20"
                  strokeOpacity="0.1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Value indicators */}
              <motion.div 
                className="absolute top-0 right-6 bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2 }}
              >
                +12.4%
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardAnimation;
