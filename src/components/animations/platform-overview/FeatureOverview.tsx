import React from "react";
import { motion } from "framer-motion";
import { featureVariants } from "./AnimationVariants";
import { Briefcase, ChartPie, Shield, 
         Globe, LayoutDashboard, Calendar, 
         FileText, Bell, DollarSign } from "lucide-react";
import VisualizationArea from "./VisualizationArea";

const FeatureOverview: React.FC = () => {
  const keyFeatures = [
    { icon: <Globe size={16} />, title: "Multi-jurisdictional", color: "bg-blue-100 text-blue-600" },
    { icon: <LayoutDashboard size={16} />, title: "Unified dashboard", color: "bg-indigo-100 text-indigo-600" },
    { icon: <Calendar size={16} />, title: "Smart scheduling", color: "bg-green-100 text-green-600" },
    { icon: <FileText size={16} />, title: "Document center", color: "bg-rose-100 text-rose-600" },
    { icon: <Bell size={16} />, title: "Notifications", color: "bg-amber-100 text-amber-600" },
    { icon: <DollarSign size={16} />, title: "FX management", color: "bg-purple-100 text-purple-600" },
  ];

  const platformModules = [
    {
      title: "Portfolio Management",
      icon: <Briefcase size={20} />,
      color: "bg-indigo-600",
      features: ["Asset allocation", "Performance tracking", "Risk analysis"]
    },
    {
      title: "Wealth Analysis",
      icon: <ChartPie size={20} />,
      color: "bg-green-600",
      features: ["Scenario modeling", "Goal planning", "Net worth tracking"]
    },
    {
      title: "Financial Planning",
      icon: <Shield size={20} />,
      color: "bg-amber-600",
      features: ["Cash flow", "Tax optimization", "Retirement planning"]
    }
  ];

  return (
    <motion.div 
      className="mb-4"
      initial="initial"
      animate="animate"
      variants={featureVariants}
    >
      {/* Platform modules with hover animation */}
      <motion.div 
        className="grid grid-cols-3 gap-4 mt-4 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
      >
        {platformModules.map((module, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className={`${module.color} w-8 h-8 rounded-lg text-white flex items-center justify-center mb-3`}>
              {module.icon}
            </div>
            <h3 className="text-sm font-medium mb-2">{module.title}</h3>
            <ul className="text-xs text-gray-500 space-y-1">
              {module.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-1.5"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Key features grid with staggered float animation */}
      <motion.div 
        className="grid grid-cols-3 gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}
      >
        {keyFeatures.map((item, index) => (
          <motion.div 
            key={index}
            className={`rounded-lg ${item.color} p-2 flex items-center`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5 }
            }}
            whileHover={{ y: -2 }}
            animate={{ 
              y: [0, -3, 0],
              transition: { 
                repeat: Infinity, 
                repeatType: "mirror", 
                duration: 2, 
                delay: index * 0.3,
                ease: "easeInOut"
              } 
            }}
          >
            <div className="mr-2">{item.icon}</div>
            <div className="text-xs font-medium">{item.title}</div>
          </motion.div>
        ))}
      </motion.div>
      
      <VisualizationArea />
    </motion.div>
  );
};

export default FeatureOverview;
