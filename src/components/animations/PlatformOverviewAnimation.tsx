
import React from "react";
import { motion } from "framer-motion";
import { Header, FeatureOverview, ActionButton } from "./platform-overview";
import { 
  PieChart, BarChart3, Shield, Users, Wallet, ArrowUpDown, 
  LineChart, Briefcase, ChartPie, Globe, LayoutDashboard, Calendar, 
  FileText, Bell, DollarSign, Activity 
} from "lucide-react";

const PlatformOverviewAnimation: React.FC = () => {
  const mainVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const moduleVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

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
      icon: <LineChart size={20} />,
      color: "bg-amber-600",
      features: ["Cash flow", "Tax optimization", "Retirement planning"]
    }
  ];

  const keyFeatures = [
    { icon: <Globe size={16} />, title: "Multi-jurisdictional", color: "bg-blue-100 text-blue-600" },
    { icon: <LayoutDashboard size={16} />, title: "Unified dashboard", color: "bg-indigo-100 text-indigo-600" },
    { icon: <Calendar size={16} />, title: "Smart scheduling", color: "bg-green-100 text-green-600" },
    { icon: <FileText size={16} />, title: "Document center", color: "bg-rose-100 text-rose-600" },
    { icon: <Bell size={16} />, title: "Notifications", color: "bg-amber-100 text-amber-600" },
    { icon: <DollarSign size={16} />, title: "FX management", color: "bg-purple-100 text-purple-600" },
    { icon: <Activity size={16} />, title: "Market alerts", color: "bg-cyan-100 text-cyan-600" },
    { icon: <Shield size={16} />, title: "Secure access", color: "bg-emerald-100 text-emerald-600" }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <Header />
      <FeatureOverview />
      
      {/* Platform modules */}
      <motion.div 
        className="grid grid-cols-3 gap-4 mt-4 mb-5"
        initial="initial"
        animate="animate"
        variants={mainVariants}
      >
        {platformModules.map((module, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
            variants={moduleVariants}
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

      {/* Key features grid */}
      <motion.div 
        className="grid grid-cols-4 gap-2 mb-4"
        initial="initial"
        animate="animate"
        variants={mainVariants}
      >
        {keyFeatures.map((item, index) => (
          <motion.div 
            key={index}
            className={`rounded-lg ${item.color} p-2 flex items-center`}
            variants={itemVariants}
          >
            <div className="mr-2">{item.icon}</div>
            <div className="text-xs font-medium">{item.title}</div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Interactive chart preview */}
      <motion.div
        className="rounded-lg bg-gray-50 p-3 mb-4 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <svg className="w-full h-10" viewBox="0 0 300 40">
          <motion.path
            d="M0,20 C25,28 50,10 75,15 S125,30 150,20 S200,5 225,15 S275,25 300,20"
            stroke="#4F46E5"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <motion.path
            d="M0,30 C25,38 50,20 75,25 S125,40 150,30 S200,15 225,25 S275,35 300,30"
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.4 }}
          />
        </svg>
      </motion.div>
      
      <ActionButton />
    </div>
  );
};

export default PlatformOverviewAnimation;
