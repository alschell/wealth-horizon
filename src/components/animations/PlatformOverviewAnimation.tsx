
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, Wallet, ArrowUpRight, Shield, TrendingUp, Briefcase, Lock } from "lucide-react";

const PlatformOverviewAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg">
      {/* Header with tabs */}
      <motion.div 
        className="bg-gray-50 border-b border-gray-200 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">
            <span className="text-indigo-600">Wealth</span>
            <span className="text-gray-900">Horizon</span>
          </span>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            <div className="w-6 h-6 rounded-full bg-indigo-100"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="p-6 grid grid-cols-10 gap-6 h-[calc(100%-60px)]">
        {/* Sidebar Navigation */}
        <motion.div 
          className="col-span-2 bg-white rounded-lg border border-gray-100 shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { name: 'Portfolio', icon: <Briefcase size={16} />, active: true },
            { name: 'Trading', icon: <TrendingUp size={16} /> },
            { name: 'Analysis', icon: <BarChart3 size={16} /> },
            { name: 'Cash Flow', icon: <Wallet size={16} /> },
            { name: 'Security', icon: <Lock size={16} /> },
          ].map((item, i) => (
            <motion.div 
              key={item.name}
              className={`flex items-center gap-3 p-3 ${item.active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
            >
              <div className={`${item.active ? 'text-indigo-600' : 'text-gray-400'}`}>
                {item.icon}
              </div>
              <div className={`text-sm ${item.active ? 'font-medium' : ''}`}>{item.name}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Main Content Area */}
        <motion.div 
          className="col-span-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Title */}
          <motion.div 
            className="flex items-start justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <div>
              <h2 className="text-xl font-bold text-gray-900">Wealth Overview</h2>
              <p className="text-sm text-gray-500">Unified view across all accounts</p>
            </div>
            
            <motion.button 
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Generate Report
            </motion.button>
          </motion.div>
          
          {/* Key Metrics */}
          <motion.div 
            className="grid grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {[
              { title: 'Total Assets', value: '$3.6M', change: '+8.2%' },
              { title: 'Monthly Return', value: '+2.1%', change: '+0.5%' },
              { title: 'Risk Score', value: 'Moderate', change: 'AA+' },
              { title: 'Asset Classes', value: '6', change: 'Diversified' }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + (i * 0.1) }}
              >
                <div className="text-sm text-gray-500">{metric.title}</div>
                <div className="mt-1 flex items-end justify-between">
                  <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight size={14} />
                    <span>{metric.change}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Charts Area */}
          <div className="grid grid-cols-12 gap-6">
            {/* Portfolio Breakdown */}
            <motion.div 
              className="col-span-5 bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className="mb-3 text-sm font-medium text-gray-900">Asset Allocation</div>
              
              <div className="relative h-[140px] flex items-center justify-center">
                {/* Simplified Pie Chart Animation */}
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <motion.path
                    d="M50,50 L50,10 A40,40 0 0,1 85,65 Z"
                    fill="#818CF8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                  <motion.path
                    d="M50,50 L85,65 A40,40 0 0,1 30,85 Z"
                    fill="#34D399"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  />
                  <motion.path
                    d="M50,50 L30,85 A40,40 0 0,1 15,40 Z"
                    fill="#F59E0B"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  />
                  <motion.path
                    d="M50,50 L15,40 A40,40 0 0,1 50,10 Z"
                    fill="#EC4899"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  />
                </svg>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { label: 'Equities', value: '35%', color: '#818CF8' },
                  { label: 'Fixed Income', value: '25%', color: '#34D399' },
                  { label: 'Real Estate', value: '20%', color: '#F59E0B' },
                  { label: 'Alternatives', value: '20%', color: '#EC4899' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.6 + (i * 0.1) }}
                  >
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <div className="text-xs text-gray-600">{item.label}</div>
                    <div className="text-xs font-medium ml-auto">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Performance Chart */}
            <motion.div 
              className="col-span-7 bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className="mb-3 text-sm font-medium text-gray-900">Performance Trend</div>
              
              <div className="h-[140px] relative">
                {/* Time period filters */}
                <div className="absolute top-0 right-0 flex space-x-1 text-xs">
                  {['1M', '3M', '6M', 'YTD', '1Y'].map((period, i) => (
                    <motion.span 
                      key={period}
                      className={`px-2 py-0.5 rounded ${i === 2 ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 + (i * 0.1) }}
                    >
                      {period}
                    </motion.span>
                  ))}
                </div>
                
                {/* Simplified Line Chart */}
                <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Background grid lines */}
                  {[20, 40, 60, 80].map((y) => (
                    <motion.line
                      key={y}
                      x1="0" y1={y} x2="300" y2={y}
                      stroke="#f0f0f0"
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    />
                  ))}
                  
                  {/* Performance line */}
                  <motion.path
                    d="M0,80 C30,75 60,85 90,65 S150,30 180,40 S250,20 300,10"
                    stroke="#818CF8"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />
                  
                  {/* Area fill */}
                  <motion.path
                    d="M0,80 C30,75 60,85 90,65 S150,30 180,40 S250,20 300,10 L300,100 L0,100 Z"
                    fill="url(#performanceGradient)"
                    fillOpacity="0.2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  />
                  
                  <defs>
                    <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Data point */}
                <motion.div
                  className="absolute top-[40px] right-[100px] w-3 h-3 bg-indigo-600 rounded-full shadow-md"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2 }}
                />
                
                <motion.div
                  className="absolute top-[20px] right-[40px] flex items-center justify-center px-2 py-1 bg-indigo-600 text-white text-xs rounded"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 2.1 }}
                >
                  +12.4%
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformOverviewAnimation;
