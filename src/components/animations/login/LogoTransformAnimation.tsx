
import React from "react";
import { motion } from "framer-motion";

const LogoTransformAnimation = () => {
  // Create array of shapes that will form the "W" and "H"
  const wShapes = [
    { id: 'w1', points: "0,50 15,0 30,50", color: "rgba(255,255,255,0.7)" },
    { id: 'w2', points: "30,50 45,0 60,50", color: "rgba(255,255,255,0.7)" },
  ];

  const hShapes = [
    { id: 'h1', points: "70,0 70,50", color: "rgba(255,255,255,0.7)" },
    { id: 'h2', points: "70,25 100,25", color: "rgba(255,255,255,0.7)" },
    { id: 'h3', points: "100,0 100,50", color: "rgba(255,255,255,0.7)" },
  ];

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
        <svg viewBox="0 0 120 60" className="w-64 h-32 mx-auto">
          {/* W shapes */}
          {wShapes.map((shape) => (
            <motion.path
              key={shape.id}
              d={`M ${shape.points}`}
              stroke={shape.color}
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

          {/* H shapes */}
          {hShapes.map((shape) => (
            <motion.path
              key={shape.id}
              d={`M ${shape.points}`}
              stroke={shape.color}
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
                delay: Math.random() * 0.5 + 0.5,
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
