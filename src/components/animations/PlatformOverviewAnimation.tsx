
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Wallet, FileText, Users, MessageSquare, Briefcase, Lock, BellRing, ArrowUpRight, PieChart, TrendingUp, EyeOff } from "lucide-react";

const PlatformOverviewAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg shadow-md">
      {/* Header with tabs and logo */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 pt-4 pb-0">
        <div className="flex items-center justify-between mb-4">
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
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              <BellRing size={16} />
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Lock size={16} />
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users size={16} />
            </div>
          </motion.div>
        </div>
        
        <div className="flex space-x-6">
          {["Overview", "Portfolio", "Trading", "Analysis", "Reports"].map((tab, i) => (
            <motion.div 
              key={tab}
              className={`pb-4 relative ${i === 0 ? 'border-b-2 border-indigo-500' : ''}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
            >
              <span className={`font-medium ${i === 0 ? 'text-indigo-600' : 'text-gray-500'}`}>{tab}</span>
              {i === 0 && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Sidebar/Navigation */}
        <motion.div 
          className="col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Module Navigation */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-700">Modules</div>
            </div>
            
            {[
              { name: 'Portfolio', icon: <Briefcase size={16} />, active: true },
              { name: 'Trading', icon: <TrendingUp size={16} /> },
              { name: 'Advice', icon: <MessageSquare size={16} /> },
              { name: 'Reports', icon: <FileText size={16} /> },
              { name: 'Analysis', icon: <BarChart3 size={16} /> },
              { name: 'Cash Flow', icon: <Wallet size={16} /> },
            ].map((item, i) => (
              <motion.div 
                key={item.name}
                className={`flex items-center gap-3 p-3 ${item.active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
              >
                <div className={`${item.active ? 'text-indigo-600' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <div className={`text-sm ${item.active ? 'font-medium' : ''}`}>{item.name}</div>
                {item.active && (
                  <motion.div 
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Quick Access */}
          <motion.div 
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="p-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-700">Quick Access</div>
            </div>
            
            <div className="p-3 space-y-3">
              {['Recent Files', 'Saved Reports', 'Watchlist'].map((item, i) => (
                <motion.div 
                  key={item}
                  className="text-sm text-gray-600 py-1 px-2 rounded hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.3 + (i * 0.1) }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Main Content Area */}
        <motion.div 
          className="col-span-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* Page Title and Actions */}
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
              <p className="text-gray-500">Manage and monitor your assets across all accounts</p>
            </div>
            
            <div className="flex space-x-3">
              <motion.button 
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <EyeOff size={16} />
                <span>Hide Inactive</span>
              </motion.button>
              
              <motion.button 
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Generate Report
              </motion.button>
            </div>
          </motion.div>
          
          {/* Portfolio Summary */}
          <motion.div 
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {[
              { title: 'Total Assets', value: '$3.6M', change: '+8.2%', color: 'text-green-500' },
              { title: 'Growth YTD', value: '12.4%', change: '+2.3%', color: 'text-green-500' },
              { title: 'Asset Classes', value: '6', change: 'Diversified', color: 'text-blue-500' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.1 + (i * 0.1) }}
              >
                <div className="text-gray-500 text-sm">{item.title}</div>
                <div className="flex items-end justify-between mt-1">
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className={`flex items-center gap-1 ${item.color}`}>
                    <ArrowUpRight size={16} />
                    <span className="text-sm font-medium">{item.change}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Portfolio Breakdown */}
          <div className="grid grid-cols-12 gap-6">
            {/* Asset Allocation */}
            <motion.div 
              className="col-span-5 bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-gray-900">Asset Allocation</h3>
                <div className="flex items-center gap-1 text-sm text-indigo-600">
                  <PieChart size={16} />
                  <span>View Details</span>
                </div>
              </div>
              
              <div className="relative h-48 flex items-center justify-center">
                {/* Donut Chart Animation */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {[
                    { color: '#818CF8', percent: 35, delay: 0 },
                    { color: '#34D399', percent: 25, delay: 0.1 },
                    { color: '#F59E0B', percent: 20, delay: 0.2 },
                    { color: '#EC4899', percent: 12, delay: 0.3 },
                    { color: '#60A5FA', percent: 8, delay: 0.4 }
                  ].map((segment, i) => (
                    <motion.div 
                      key={i}
                      className="absolute inset-0"
                      style={{ 
                        clipPath: i === 0 ? 
                          'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' : 
                          i === 1 ? 
                            'polygon(50% 50%, 100% 0%, 100% 100%, 50% 100%)' : 
                            i === 2 ? 
                              'polygon(50% 50%, 100% 100%, 0% 100%, 0% 50%)' : 
                              i === 3 ? 
                                'polygon(50% 50%, 0% 50%, 0% 0%, 30% 0%)' :
                                'polygon(50% 50%, 30% 0%, 50% 0%)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 + (i * 0.1) }}
                    >
                      <div 
                        className="w-full h-full rounded-full" 
                        style={{ backgroundColor: segment.color }}
                      />
                    </motion.div>
                  ))}
                  
                  <div className="absolute inset-[20%] bg-white rounded-full z-10 flex flex-col items-center justify-center">
                    <motion.div 
                      className="text-sm text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.9 }}
                    >
                      Total Assets
                    </motion.div>
                    <motion.div 
                      className="text-xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 2 }}
                    >
                      $3.6M
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { label: 'Equities', value: '35%', color: '#818CF8' },
                  { label: 'Fixed Income', value: '25%', color: '#34D399' },
                  { label: 'Real Estate', value: '20%', color: '#F59E0B' },
                  { label: 'Alternatives', value: '12%', color: '#EC4899' },
                  { label: 'Cash', value: '8%', color: '#60A5FA' },
                ].map((item, i) => (
                  <motion.div 
                    key={item.label} 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 2 + (i * 0.1) }}
                  >
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <div className="text-sm text-gray-600 flex-1">{item.label}</div>
                    <div className="text-sm font-medium text-gray-900">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Top Holdings */}
            <motion.div 
              className="col-span-7 bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-gray-900">Top Holdings</h3>
                <div className="flex items-center gap-1 text-sm text-indigo-600">
                  <BarChart3 size={16} />
                  <span>View All</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'US Technology ETF', ticker: 'USTEC', value: '$820,500', allocation: '22%', change: '+12.4%', color: 'text-green-500' },
                  { name: 'Global Bond Fund', ticker: 'GBND', value: '$535,000', allocation: '15%', change: '+3.2%', color: 'text-green-500' },
                  { name: 'Real Estate Portfolio', ticker: 'REIT', value: '$430,000', allocation: '12%', change: '+6.8%', color: 'text-green-500' },
                  { name: 'Emerging Markets', ticker: 'EMKT', value: '$320,000', allocation: '9%', change: '-2.3%', color: 'text-red-500' },
                  { name: 'Healthcare Innovation', ticker: 'HLTH', value: '$285,000', allocation: '8%', change: '+9.1%', color: 'text-green-500' },
                ].map((holding, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.5 + (i * 0.1) }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 mr-3">
                      {holding.ticker.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{holding.name}</div>
                          <div className="text-xs text-gray-500">{holding.ticker}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{holding.value}</div>
                          <div className="text-xs text-gray-500">{holding.allocation}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="bg-gray-100 h-1.5 rounded-full flex-1 mr-3">
                          <motion.div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: holding.allocation }}
                            initial={{ width: 0 }}
                            animate={{ width: holding.allocation }}
                            transition={{ duration: 0.8, delay: 1.7 + (i * 0.1) }}
                          />
                        </div>
                        <div className={`text-xs font-medium ${holding.color}`}>
                          {holding.change}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformOverviewAnimation;
