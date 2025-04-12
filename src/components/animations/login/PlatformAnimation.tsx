
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  Lock, 
  CheckCircle, 
  Shield, 
  Activity, 
  Briefcase,
  DollarSign
} from "lucide-react";
import { ScaleIn } from "@/components/ui/animation";

const PlatformAnimation = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 overflow-hidden">
      <div className="w-full max-w-lg relative">
        <motion.div
          className="absolute top-0 right-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <svg className="h-full w-full text-white/5" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        <div className="relative z-10">
          <ScaleIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Wealth Management Platform
            </h2>

            <p className="text-white/90 text-lg mb-12 text-center max-w-md mx-auto">
              Streamline your wealth management with our cutting-edge platform
            </p>
          </ScaleIn>

          <div className="grid grid-cols-2 gap-6">
            <AnimatedDashboardCard delay={0.2} />
            
            <div className="space-y-6">
              <AnimatedFeatureCard 
                icon={<Shield className="h-6 w-6 text-indigo-200" />} 
                title="Secure Platform" 
                description="Bank-level security protocols" 
                delay={0.3}
                color="from-indigo-500/30 to-indigo-700/30"
              />
              
              <AnimatedFeatureCard 
                icon={<Activity className="h-6 w-6 text-green-200" />} 
                title="Real-time Analytics" 
                description="Track performance in real-time" 
                delay={0.5}
                color="from-green-500/30 to-green-700/30"
              />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-6">
            <AnimatedIconCard icon={<TrendingUp />} delay={0.6} />
            <AnimatedIconCard icon={<BarChart3 />} delay={0.7} />
            <AnimatedIconCard icon={<LineChart />} delay={0.8} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedDashboardCard = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 overflow-hidden relative"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-24 bg-white/30 rounded-full"></div>
          <div className="flex space-x-2">
            <div className="h-3 w-3 bg-white/30 rounded-full"></div>
            <div className="h-3 w-3 bg-white/30 rounded-full"></div>
            <div className="h-3 w-3 bg-white/30 rounded-full"></div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="h-4 w-32 bg-white/30 rounded-full mb-2"></div>
          <div className="h-10 w-full bg-white/20 rounded-lg"></div>
        </div>
        
        <div className="relative h-24 mb-3">
          <FloatingChart />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 bg-white/20 rounded-lg"></div>
          <div className="h-12 bg-white/20 rounded-lg"></div>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-600/20 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </motion.div>
  );
};

const AnimatedFeatureCard = ({ icon, title, description, delay = 0, color = "from-blue-500/30 to-indigo-700/30" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-gradient-to-br ${color} backdrop-blur-md rounded-xl p-5 border border-white/20 overflow-hidden relative`}
    >
      <div className="flex items-start space-x-3">
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white/10 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: Math.random() * 2
        }}
      />
    </motion.div>
  );
};

const AnimatedIconCard = ({ icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl aspect-square flex items-center justify-center border border-white/20 relative overflow-hidden"
    >
      <div className="text-white/80">
        {icon}
      </div>

      <motion.div
        className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-white/10 blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: Math.random()
        }}
      />
    </motion.div>
  );
};

const FloatingChart = () => {
  const points = [10, 25, 15, 30, 18, 35, 25, 40, 30, 45, 40, 35];
  
  return (
    <div className="w-full h-full flex items-end">
      <motion.svg 
        viewBox="0 0 240 100" 
        className="w-full h-full overflow-visible"
      >
        <motion.path
          d={`M 0,${100 - points[0]} ${points.map((point, i) => `L ${i * 20},${100 - point}`).join(' ')}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={i * 20}
            cy={100 - point}
            r="3"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
          />
        ))}

        <motion.circle
          cx={0}
          cy={100 - points[0]}
          r="4"
          fill="#4F46E5"
          animate={{ 
            cx: points.map((_, i) => i * 20),
            cy: points.map(p => 100 - p)
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      </motion.svg>
    </div>
  );
};

export default PlatformAnimation;
