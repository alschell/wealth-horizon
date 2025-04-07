
import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Shield, ArrowUpRight } from "lucide-react";

const SummaryCards = () => {
  const cards = [
    { title: 'Total Assets', value: '$2.4M', icon: <Wallet size={18} />, color: 'bg-blue-500' },
    { title: 'Performance', value: '+8.2%', icon: <TrendingUp size={18} />, color: 'bg-green-500' },
    { title: 'Risk Score', value: 'AA+', icon: <Shield size={18} />, color: 'bg-amber-500' }
  ];

  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {cards.map((card, i) => (
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
  );
};

export default SummaryCards;
