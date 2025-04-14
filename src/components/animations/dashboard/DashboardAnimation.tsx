
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart } from 'lucide-react';

const DashboardAnimation: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      className="p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 border shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="h-6 w-36 bg-gray-300 rounded animate-pulse"></div>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-md bg-blue-50 border border-blue-100 p-3 flex flex-col items-center">
          <LineChart className="w-10 h-10 text-blue-500 mb-2" />
          <div className="w-full space-y-1">
            <div className="h-2 bg-blue-200 rounded w-full"></div>
            <div className="h-2 bg-blue-200 rounded w-3/4"></div>
            <div className="h-2 bg-blue-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="rounded-md bg-green-50 border border-green-100 p-3 flex flex-col items-center">
          <BarChart className="w-10 h-10 text-green-500 mb-2" />
          <div className="w-full space-y-1">
            <div className="h-2 bg-green-200 rounded w-full"></div>
            <div className="h-2 bg-green-200 rounded w-2/3"></div>
            <div className="h-2 bg-green-200 rounded w-3/4"></div>
          </div>
        </div>
      </motion.div>

      {/* Data Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-2 rounded border">
            <div className="h-3 w-12 bg-gray-200 rounded mb-1"></div>
            <div className="h-5 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </motion.div>

      {/* Activity Feed */}
      <motion.div variants={itemVariants} className="border rounded-md p-3">
        <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-3 w-full bg-gray-200 rounded"></div>
                <div className="h-2 w-20 bg-gray-100 rounded mt-1"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardAnimation;
