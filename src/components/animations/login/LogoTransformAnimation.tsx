
import React from "react";
import { motion } from "framer-motion";

const LogoTransformAnimation = () => {
  // Create array for the full WealthHorizon text animation
  const wealthPaths = [
    { id: 'w1', d: "M10,50 25,10 40,50", color: "rgba(255,255,255,0.7)" },
    { id: 'w2', d: "M40,50 55,10 70,50", color: "rgba(255,255,255,0.7)" },
    { id: 'e', d: "M80,10 80,50 100,50 100,40 90,40 90,35 100,35 100,25 90,25 90,20 100,20 100,10 80,10", color: "rgba(255,255,255,0.7)" },
    { id: 'a', d: "M110,50 110,20 130,20 130,50 M110,35 130,35 M110,20 120,10 130,20", color: "rgba(255,255,255,0.7)" },
    { id: 'l', d: "M140,10 140,50 150,50", color: "rgba(255,255,255,0.7)" },
    { id: 't', d: "M160,10 160,50 M150,20 170,20", color: "rgba(255,255,255,0.7)" },
    { id: 'h1', d: "M180,10 180,50", color: "rgba(255,255,255,0.7)" },
    { id: 'h2', d: "M180,30 200,30 200,50", color: "rgba(255,255,255,0.7)" },
    { id: 'h3', d: "M200,10 200,30", color: "rgba(255,255,255,0.7)" },
  ];

  const horizonPaths = [
    { id: 'h4', d: "M10,70 10,110", color: "rgba(255,255,255,0.7)" },
    { id: 'o', d: "M25,80 25,100 40,100 40,80 25,80", color: "rgba(255,255,255,0.7)" },
    { id: 'r', d: "M50,80 50,110 M50,90 65,90 65,80 50,80", color: "rgba(255,255,255,0.7)" },
    { id: 'i', d: "M75,80 75,110 M75,70 75,75", color: "rgba(255,255,255,0.7)" },
    { id: 'z', d: "M85,80 105,80 85,110 105,110", color: "rgba(255,255,255,0.7)" },
    { id: 'o2', d: "M115,80 115,100 130,100 130,80 115,80", color: "rgba(255,255,255,0.7)" },
    { id: 'n', d: "M140,80 140,110 M140,80 155,110 M155,80 155,110", color: "rgba(255,255,255,0.7)" },
  ];

  // Combine all paths
  const allPaths = [...wealthPaths, ...horizonPaths];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-2xl">
        {/* Background grid animation */}
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

        {/* Logo shapes container */}
        <svg viewBox="0 0 220 120" className="w-full h-64 mx-auto">
          {/* All paths for WealthHorizon */}
          {allPaths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke={path.color}
              strokeWidth="2"
              fill="none"
              initial={{ 
                pathLength: 0,
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: 0
              }}
              animate={{ 
                pathLength: 1,
                x: 0,
                y: 0,
                opacity: 1
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
              }}
            />
          ))}
        </svg>

        {/* Floating particles */}
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

export default LogoTransformAnimation;
