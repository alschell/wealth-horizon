
import React from "react";
import { motion } from "framer-motion";

const LogoTransformAnimation = () => {
  // SVG paths for "Wealth" - first row
  const wealthPaths = [
    { id: 'W1', d: "M10,30 L20,10 L30,30 L40,10 L50,30", color: "rgba(255,255,255,0.9)" },
    { id: 'E', d: "M60,10 L60,30 L80,30 L80,25 L65,25 L65,22 L75,22 L75,17 L65,17 L65,15 L80,15 L80,10 L60,10", color: "rgba(255,255,255,0.9)" },
    { id: 'A', d: "M90,30 L95,10 L105,10 L110,30 M92,22 L108,22", color: "rgba(255,255,255,0.9)" },
    { id: 'L', d: "M120,10 L120,30 L140,30 L140,25 L125,25 L125,10 L120,10", color: "rgba(255,255,255,0.9)" },
    { id: 'T', d: "M150,10 L170,10 L170,15 L165,15 L165,30 L155,30 L155,15 L150,15 L150,10", color: "rgba(255,255,255,0.9)" },
    { id: 'H', d: "M180,10 L180,30 L185,30 L185,22 L195,22 L195,30 L200,30 L200,10 L195,10 L195,18 L185,18 L185,10 L180,10", color: "rgba(255,255,255,0.9)" },
  ];

  // SVG paths for "Horizon" - second row
  const horizonPaths = [
    { id: 'H2', d: "M10,40 L10,60 L15,60 L15,52 L25,52 L25,60 L30,60 L30,40 L25,40 L25,48 L15,48 L15,40 L10,40", color: "rgba(255,255,255,0.9)" },
    { id: 'O', d: "M40,40 C35,40 35,45 35,50 C35,55 35,60 40,60 L50,60 C55,60 55,55 55,50 C55,45 55,40 50,40 L40,40 M40,45 L50,45 L50,55 L40,55 L40,45", color: "rgba(255,255,255,0.9)" },
    { id: 'R', d: "M65,40 L65,60 L70,60 L70,52 L75,52 L80,60 L85,60 L80,50 C82,50 85,48 85,45 C85,42 82,40 80,40 L65,40 M70,45 L75,45 C77,45 77,47 77,47 C77,47 77,49 75,49 L70,49 L70,45", color: "rgba(255,255,255,0.9)" },
    { id: 'I', d: "M95,40 L95,60 L100,60 L100,40 L95,40", color: "rgba(255,255,255,0.9)" },
    { id: 'Z', d: "M110,40 L110,45 L125,55 L110,55 L110,60 L130,60 L130,55 L115,45 L130,45 L130,40 L110,40", color: "rgba(255,255,255,0.9)" },
    { id: 'O2', d: "M140,40 C135,40 135,45 135,50 C135,55 135,60 140,60 L150,60 C155,60 155,55 155,50 C155,45 155,40 150,40 L140,40 M140,45 L150,45 L150,55 L140,55 L140,45", color: "rgba(255,255,255,0.9)" },
    { id: 'N', d: "M165,40 L165,60 L170,60 L170,45 L180,60 L185,60 L185,40 L180,40 L180,55 L170,40 L165,40", color: "rgba(255,255,255,0.9)" },
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

        {/* Logo text container */}
        <svg viewBox="0 0 220 80" className="w-full h-64 mx-auto">
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
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10,
                opacity: 0
              }}
              animate={{ 
                pathLength: 1,
                x: 0,
                y: 0,
                opacity: 1
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                delay: index * 0.05,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 5
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
