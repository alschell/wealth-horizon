
import React from "react";
import { motion } from "framer-motion";

const LogoTransformAnimation = () => {
  // Create array for the full WealthHorizon text animation
  const wealthPaths = [
    { id: 'w1', d: "M10,50 25,10 40,50", color: "rgba(255,255,255,0.8)" },
    { id: 'w2', d: "M40,50 55,10 70,50", color: "rgba(255,255,255,0.8)" },
    { id: 'e', d: "M80,10 80,50 100,50 100,40 90,40 90,35 100,35 100,25 90,25 90,20 100,20 100,10 80,10", color: "rgba(255,255,255,0.8)" },
    { id: 'a', d: "M110,50 110,20 130,20 130,50 M110,35 130,35 M110,20 120,10 130,20", color: "rgba(255,255,255,0.8)" },
    { id: 'l', d: "M140,10 140,50 160,50", color: "rgba(255,255,255,0.8)" },
    { id: 't', d: "M170,10 170,50 M160,20 180,20", color: "rgba(255,255,255,0.8)" },
    { id: 'h1', d: "M190,10 190,50", color: "rgba(255,255,255,0.8)" },
    { id: 'h2', d: "M190,30 210,30 210,50", color: "rgba(255,255,255,0.8)" },
    { id: 'h3', d: "M210,10 210,30", color: "rgba(255,255,255,0.8)" },
  ];

  const horizonPaths = [
    { id: 'h4', d: "M10,80 10,120", color: "rgba(255,255,255,0.8)" },
    { id: 'o', d: "M25,80 25,120 45,120 45,80 25,80", color: "rgba(255,255,255,0.8)" },
    { id: 'r', d: "M55,80 55,120 M55,90 70,90 70,80 55,80", color: "rgba(255,255,255,0.8)" },
    { id: 'i', d: "M80,80 80,120 M80,70 80,75", color: "rgba(255,255,255,0.8)" },
    { id: 'z', d: "M90,80 110,80 90,120 110,120", color: "rgba(255,255,255,0.8)" },
    { id: 'o2', d: "M120,80 120,120 140,120 140,80 120,80", color: "rgba(255,255,255,0.8)" },
    { id: 'n', d: "M150,80 150,120 M150,80 170,120 M170,80 170,120", color: "rgba(255,255,255,0.8)" },
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
        <svg viewBox="0 0 220 140" className="w-full h-64 mx-auto">
          {/* All paths for WealthHorizon */}
          {allPaths.map((path, index) => (
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
                duration: 1.5,
                ease: "easeInOut",
                delay: index * 0.05 + (Math.random() * 0.3),
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
