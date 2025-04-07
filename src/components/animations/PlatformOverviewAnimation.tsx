
import React from "react";
import { motion } from "framer-motion";
import { Header, FeatureOverview, ActionButton } from "./platform-overview";
import { PieChart, BarChart3, Shield, Users, Wallet, ArrowUpDown } from "lucide-react";

const PlatformOverviewAnimation: React.FC = () => {
  const tileVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  };
  
  const functionalities = [
    { icon: <PieChart size={20} />, title: "Portfolio", color: "bg-indigo-100 text-indigo-600" },
    { icon: <BarChart3 size={20} />, title: "Analytics", color: "bg-green-100 text-green-600" },
    { icon: <Shield size={20} />, title: "Security", color: "bg-blue-100 text-blue-600" },
    { icon: <Users size={20} />, title: "Users", color: "bg-amber-100 text-amber-600" },
    { icon: <Wallet size={20} />, title: "Assets", color: "bg-rose-100 text-rose-600" },
    { icon: <ArrowUpDown size={20} />, title: "Trading", color: "bg-purple-100 text-purple-600" }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <Header />
      <FeatureOverview />
      
      <motion.div 
        className="grid grid-cols-3 gap-3 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {functionalities.map((item, index) => (
          <motion.div 
            key={index}
            className={`rounded-lg ${item.color} p-3 flex flex-col items-center justify-center aspect-square`}
            variants={tileVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 + (index * 0.1) }}
          >
            <div className="mb-2">{item.icon}</div>
            <div className="text-xs font-medium">{item.title}</div>
          </motion.div>
        ))}
      </motion.div>
      
      <ActionButton />
    </div>
  );
};

export default PlatformOverviewAnimation;
