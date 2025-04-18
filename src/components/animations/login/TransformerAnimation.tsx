
import React from "react";
import { motion } from "framer-motion";

const TransformerAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-10 overflow-hidden">
      <div className="relative w-full max-w-2xl">
        {/* Animated background grid */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ["0px 0px", "20px 20px", "0px 0px"] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        />

        {/* Glowing orb */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 blur-xl opacity-50" />
        </motion.div>

        {/* Abstract shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: [0, Math.sin(i * 72) * 100, 0],
              y: [0, Math.cos(i * 72) * 100, 0],
              scale: [0, 1, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2 border border-white/20" />
          </motion.div>
        ))}

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/40"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TransformerAnimation;
