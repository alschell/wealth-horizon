
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ChartBar, Shield } from "lucide-react";
import { moduleVariants, moduleItemVariants } from "./AnimationVariants";

const modules = [
  { title: 'Portfolio', icon: <Briefcase size={24} />, color: 'bg-indigo-100 text-indigo-600' },
  { title: 'Analysis', icon: <ChartBar size={24} />, color: 'bg-green-100 text-green-600' },
  { title: 'Security', icon: <Shield size={24} />, color: 'bg-amber-100 text-amber-600' }
];

const PlatformModules: React.FC = () => {
  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 mb-6"
      initial="initial"
      animate="animate"
      variants={moduleVariants}
    >
      {modules.map((module, i) => (
        <motion.div 
          key={i}
          className={`rounded-lg p-4 flex flex-col items-center ${module.color}`}
          variants={moduleItemVariants(i)}
        >
          <div className="mb-2">{module.icon}</div>
          <div className="text-sm font-medium">{module.title}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlatformModules;
