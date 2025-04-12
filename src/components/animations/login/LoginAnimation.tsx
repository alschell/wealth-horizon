
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, LineChart, TrendingUp, Shield, Activity, DollarSign, Briefcase, PieChart } from "lucide-react";

const LoginAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-10 overflow-hidden">
      <div className="max-w-2xl w-full">
        {/* Animated grid background */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ["0px 0px", "100px 100px"] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
        />

        {/* Floating platform */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          {/* Platform header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Wealth Management Platform</h2>
            <p className="text-white/80 max-w-md mx-auto">
              Advanced analytics and portfolio management for high-net-worth individuals
            </p>
          </motion.div>

          {/* Main platform dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden p-5 shadow-[0_0_50px_rgba(99,102,241,0.3)]"
          >
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="h-3.5 w-20 bg-white/20 rounded-full mb-2"></div>
                <div className="h-2.5 w-16 bg-white/20 rounded-full"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-indigo-400/50"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/20"></div>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="h-3 w-20 bg-white/20 rounded-full mb-2"></div>
                <div className="h-32 bg-white/10 rounded-lg overflow-hidden relative p-3">
                  <AnimatedChart />
                </div>
              </div>
              <div>
                <div className="h-3 w-16 bg-white/20 rounded-full mb-2"></div>
                <div className="h-32 bg-white/10 rounded-lg overflow-hidden p-3">
                  <AnimatedPieChart />
                </div>
              </div>
            </div>

            {/* Data cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <AnimatedDataCard icon={<TrendingUp size={16} />} delay={0.8} />
              <AnimatedDataCard icon={<BarChart3 size={16} />} delay={0.9} />
              <AnimatedDataCard icon={<DollarSign size={16} />} delay={1.0} />
            </div>

            {/* Bottom panel */}
            <div className="bg-white/5 rounded-lg p-3">
              <div className="h-3 w-24 bg-white/20 rounded-full mb-3"></div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-white/10 rounded-md"></div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating elements */}
          <FloatingElements />
        </motion.div>
      </div>
    </div>
  );
};

const AnimatedChart = () => {
  // Line chart data points
  const points = [30, 22, 40, 25, 45, 30, 50, 35, 55, 40, 60];
  
  return (
    <svg className="w-full h-full" viewBox="0 0 200 100">
      {/* X-axis */}
      <motion.line 
        x1="0" y1="90" x2="200" y2="90" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Graph line */}
      <motion.path
        d={`M 0,${100 - points[0]} ${points.map((point, i) => `L ${i * 20},${100 - point}`).join(' ')}`}
        fill="none"
        stroke="rgba(167, 139, 250, 0.8)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
      />

      {/* Data points */}
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={i * 20}
          cy={100 - point}
          r="3"
          fill="white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
        />
      ))}

      {/* Moving dot */}
      <motion.circle
        cx={0}
        cy={100 - points[0]}
        r="4"
        fill="#a78bfa"
        animate={{ 
          cx: points.map((_, i) => i * 20),
          cy: points.map(p => 100 - p)
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      />
    </svg>
  );
};

const AnimatedPieChart = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="rgba(167, 139, 250, 0.3)"
        strokeWidth="20"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="rgba(167, 139, 250, 0.8)"
        strokeWidth="20"
        strokeDasharray="251.2"
        strokeDashoffset="188.4"
        initial={{ strokeDashoffset: 251.2 }}
        animate={{ strokeDashoffset: 188.4 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      />
      
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        fill="rgba(255, 255, 255, 0.05)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      />

      <motion.text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        75%
      </motion.text>
    </svg>
  );
};

const AnimatedDataCard = ({ icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/10 rounded-lg p-3"
    >
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-2">
          {icon}
        </div>
        <div className="h-2.5 w-10 bg-white/20 rounded-full"></div>
      </div>
      <div className="h-3 w-full bg-white/20 rounded-full mb-1"></div>
      <div className="h-3 w-3/4 bg-white/20 rounded-full"></div>
    </motion.div>
  );
};

const FloatingElements = () => {
  const iconElements = [
    { icon: <Shield size={20} />, delay: 1.5, duration: 7, x: -150, y: -120 },
    { icon: <Activity size={20} />, delay: 2.0, duration: 8, x: 150, y: -80 },
    { icon: <Briefcase size={20} />, delay: 2.5, duration: 7.5, x: -120, y: 120 },
    { icon: <PieChart size={20} />, delay: 3.0, duration: 6.5, x: 140, y: 100 },
  ];

  return (
    <>
      {iconElements.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0.5, 1, 1, 0.5],
            x: [0, item.x/3, item.x, item.x*1.2],
            y: [0, item.y/3, item.y, item.y*1.2]
          }}
          transition={{ 
            delay: item.delay, 
            duration: item.duration,
            repeat: Infinity,
            repeatDelay: 5
          }}
          className="absolute left-1/2 top-1/2 w-10 h-10 -ml-5 -mt-5 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 z-20 text-white/80"
        >
          {item.icon}
        </motion.div>
      ))}
      
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-white/30 blur-sm"
          initial={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200,
            opacity: 0
          }}
          animate={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200,
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </>
  );
};

export default LoginAnimation;
