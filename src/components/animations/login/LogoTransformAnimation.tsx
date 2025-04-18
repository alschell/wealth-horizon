
import React from "react";
import { motion } from "framer-motion";

const LogoTransformAnimation = () => {
  // Define a variety of shapes with different properties
  const shapes = [
    { type: "circle", size: 50, color: "rgba(255,255,255,0.2)", delay: 0 },
    { type: "square", size: 40, color: "rgba(255,255,255,0.15)", delay: 0.5 },
    { type: "triangle", size: 45, color: "rgba(255,255,255,0.18)", delay: 1 },
    { type: "circle", size: 30, color: "rgba(255,255,255,0.22)", delay: 1.5 },
    { type: "square", size: 60, color: "rgba(255,255,255,0.12)", delay: 2 },
    { type: "pentagon", size: 50, color: "rgba(255,255,255,0.2)", delay: 2.5 },
    { type: "hexagon", size: 45, color: "rgba(255,255,255,0.18)", delay: 3 },
    { type: "circle", size: 25, color: "rgba(255,255,255,0.25)", delay: 3.5 },
  ];

  // Function to generate SVG path for different shapes
  const getShapePath = (type: string, size: number) => {
    switch (type) {
      case "square":
        return `M${-size/2},${-size/2} L${size/2},${-size/2} L${size/2},${size/2} L${-size/2},${size/2} Z`;
      case "triangle":
        return `M0,${-size/2} L${size/2},${size/2} L${-size/2},${size/2} Z`;
      case "pentagon":
        const pentagonPoints = [];
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
          pentagonPoints.push(`${(size/2) * Math.cos(angle)},${(size/2) * Math.sin(angle)}`);
        }
        return `M${pentagonPoints.join(' L')} Z`;
      case "hexagon":
        const hexagonPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI / 6);
          hexagonPoints.push(`${(size/2) * Math.cos(angle)},${(size/2) * Math.sin(angle)}`);
        }
        return `M${hexagonPoints.join(' L')} Z`;
      case "circle":
      default:
        return "";
    }
  };

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

        {/* Animated shapes */}
        <svg viewBox="-150 -150 300 300" className="w-full h-64 mx-auto">
          {shapes.map((shape, index) => (
            shape.type === "circle" ? (
              <motion.circle
                key={`shape-${index}`}
                cx="0"
                cy="0"
                r={shape.size / 2}
                fill="none"
                stroke={shape.color}
                strokeWidth="1.5"
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  scale: 0.5
                }}
                animate={{ 
                  opacity: [0, 0.8, 0.6, 0.8, 0],
                  x: Array.from({ length: 5 }, () => Math.random() * 200 - 100),
                  y: Array.from({ length: 5 }, () => Math.random() * 200 - 100),
                  scale: [0.5, 1.2, 0.8, 1.1, 0.5],
                  rotate: [0, 180, 90, 270, 360]
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  ease: "easeInOut",
                  delay: shape.delay,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ) : (
              <motion.path
                key={`shape-${index}`}
                d={getShapePath(shape.type, shape.size)}
                fill="none"
                stroke={shape.color}
                strokeWidth="1.5"
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  scale: 0.5
                }}
                animate={{ 
                  opacity: [0, 0.7, 0.5, 0.7, 0],
                  x: Array.from({ length: 5 }, () => Math.random() * 200 - 100),
                  y: Array.from({ length: 5 }, () => Math.random() * 200 - 100),
                  scale: [0.5, 1.1, 0.9, 1.2, 0.5],
                  rotate: [0, 120, 240, 360, 0] 
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  ease: "easeInOut",
                  delay: shape.delay,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            )
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

        {/* Glowing orb in center */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 blur-xl opacity-30" />
        </motion.div>
      </div>
    </div>
  );
};

export default LogoTransformAnimation;
