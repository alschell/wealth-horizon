
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, Wallet, DollarSign, TrendingUp, Shield, ArrowUpRight } from "lucide-react";

const DashboardAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg shadow-md">
      {/* Header with Logo */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-bold text-xl">
            <span className="text-indigo-600">Wealth</span>
            <span className="text-gray-900">Horizon</span>
          </span>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </motion.div>
      </div>
      
      {/* Main Content */}
      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <motion.div 
          className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 h-[calc(100%-24px)]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="py-3 px-4 border-b border-gray-100">
            <div className="h-6 w-24 bg-gray-100 rounded"></div>
          </div>
          
          {['Dashboard', 'Portfolio', 'Trading', 'Analysis', 'Reports'].map((item, i) => (
            <motion.div 
              key={item}
              className="flex items-center gap-3 py-3 px-4 border-b border-gray-50"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
            >
              <div className={`h-6 w-6 rounded-md flex items-center justify-center ${i === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
                {i === 0 && <BarChart3 size={14} />}
                {i === 1 && <PieChart size={14} />}
                {i === 2 && <TrendingUp size={14} />}
                {i === 3 && <Wallet size={14} />}
                {i === 4 && <DollarSign size={14} />}
              </div>
              <div className={`text-sm ${i === 0 ? 'font-medium text-indigo-600' : 'text-gray-600'}`}>{item}</div>
              {i === 0 && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 ml-auto"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Main Dashboard Content */}
        <div className="col-span-10 space-y-6">
          {/* Welcome Section */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white relative overflow-hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="absolute top-0 right-0 w-64 h-full opacity-10">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,50 C20,20 50,0 80,20 S100,80 50,100 S0,80 0,50" fill="white" />
              </svg>
            </div>
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Welcome back, Emily</h2>
                <p className="text-indigo-100 mb-4">Your portfolio is performing well today</p>
                <div className="flex space-x-2">
                  <motion.button 
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Portfolio
                  </motion.button>
                  <motion.button 
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Latest Reports
                  </motion.button>
                </div>
              </div>
              <motion.div 
                className="flex items-center space-x-1"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="text-3xl font-bold">+8.2%</div>
                <ArrowUpRight className="text-green-300" size={24} />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { title: 'Total Assets', value: '$2.4M', change: '+5.3%', icon: <Wallet size={20} />, color: 'bg-blue-500' },
              { title: 'Monthly Return', value: '$32.5K', change: '+2.1%', icon: <TrendingUp size={20} />, color: 'bg-green-500' },
              { title: 'Risk Score', value: 'Moderate', change: 'AA+', icon: <Shield size={20} />, color: 'bg-amber-500' },
              { title: 'Liquidity', value: '$428K', change: '+12%', icon: <DollarSign size={20} />, color: 'bg-purple-500' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`${stat.color} w-10 h-10 rounded-lg text-white flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded">
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <div className="text-gray-900 text-xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Portfolio Allocation */}
            <motion.div 
              className="col-span-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <h3 className="text-gray-900 font-medium mb-4">Asset Allocation</h3>
              <div className="aspect-square relative flex items-center justify-center">
                <div className="absolute inset-0">
                  {/* Donut Chart Animation */}
                  {[
                    { color: '#818CF8', size: 360, delay: 0 },
                    { color: '#34D399', size: 280, delay: 0.1 },
                    { color: '#F59E0B', size: 160, delay: 0.2 },
                    { color: '#EC4899', size: 90, delay: 0.3 }
                  ].map((segment, i) => (
                    <motion.div 
                      key={i}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: segment.size }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 1.1 + segment.delay, 
                        ease: "easeOut" 
                      }}
                    >
                      <motion.div 
                        className="h-full w-full rounded-full border-8 border-transparent"
                        style={{ 
                          borderLeftColor: segment.color, 
                          borderTopColor: i % 2 ? segment.color : 'transparent'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.1 + segment.delay }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="bg-white rounded-full h-[60%] w-[60%] z-10 flex flex-col items-center justify-center">
                  <span className="text-gray-400 text-xs">Total Assets</span>
                  <span className="text-gray-900 font-bold text-lg">$2.4M</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { label: 'Stocks', value: '42%', color: '#818CF8' },
                  { label: 'Bonds', value: '28%', color: '#34D399' },
                  { label: 'Real Estate', value: '18%', color: '#F59E0B' },
                  { label: 'Alternatives', value: '12%', color: '#EC4899' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.5 + (i * 0.1) }}
                  >
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <div className="text-xs text-gray-600">{item.label}</div>
                    <div className="text-xs font-medium ml-auto">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Performance Chart */}
            <motion.div 
              className="col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900 font-medium">Portfolio Performance</h3>
                <div className="flex space-x-2">
                  {['1W', '1M', '3M', 'YTD', '1Y', 'All'].map((period, i) => (
                    <motion.button 
                      key={period}
                      className={`px-2 py-1 text-xs rounded ${i === 2 ? 'bg-indigo-100 text-indigo-600 font-medium' : 'text-gray-500'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.3 + (i * 0.1) }}
                    >
                      {period}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="h-64 relative">
                {/* Chart Grid Lines */}
                {[0, 1, 2, 3, 4].map((line) => (
                  <motion.div 
                    key={line}
                    className="absolute left-0 right-0 h-px bg-gray-100"
                    style={{ top: `${20 + line * 20}%` }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + (line * 0.1) }}
                  />
                ))}
                
                {/* Y-axis labels */}
                {[0, 1, 2, 3, 4].map((label, i) => (
                  <motion.div 
                    key={label}
                    className="absolute left-0 text-xs text-gray-400"
                    style={{ top: `${17 + (4-i) * 20}%` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.6 }}
                  >
                    {`$${(i * 500)}K`}
                  </motion.div>
                ))}
                
                {/* Chart Line */}
                <svg className="absolute inset-0 h-full w-full" style={{ marginLeft: '24px' }}>
                  <motion.path
                    d="M0,160 C20,140 40,180 60,160 S80,120 100,130 S140,160 180,140 S220,90 260,85 S300,70 340,50 S380,30 420,20"
                    stroke="#818CF8"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.7 }}
                  />
                  <motion.path
                    d="M0,160 C20,140 40,180 60,160 S80,120 100,130 S140,160 180,140 S220,90 260,85 S300,70 340,50 S380,30 420,20"
                    stroke="url(#gradient)"
                    strokeWidth="30"
                    strokeOpacity="0.1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.7 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                    <motion.div 
                      key={month}
                      className="text-xs text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.9 + (i * 0.1) }}
                    >
                      {month}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnimation;
