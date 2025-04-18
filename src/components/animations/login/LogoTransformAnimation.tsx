
import React from "react";
import { motion } from "framer-motion";

const LogoTransformAnimation = () => {
  // Generate random bubble configuration
  const generateBubbles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 20, // Size between 20px and 120px
      color: `rgba(78, 70, 220, ${Math.random() * 0.4 + 0.1})`, // Use theme color with opacity
      initialPosition: {
        x: Math.random() * 800 - 400,
        y: Math.random() * 800 - 400,
      },
      duration: Math.random() * 20 + 10, // Animation duration between 10s and 30s
      delay: Math.random() * 5,
    }));
  };

  const bubbles = generateBubbles(50);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
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

      {/* Central glow */}
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
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 blur-3xl opacity-30" />
      </motion.div>

      {/* Animated floating bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            background: bubble.color,
            boxShadow: `0 0 20px ${bubble.color}`,
          }}
          initial={{ 
            x: bubble.initialPosition.x,
            y: bubble.initialPosition.y,
            opacity: 0,
          }}
          animate={{ 
            x: [
              bubble.initialPosition.x,
              bubble.initialPosition.x + Math.random() * 200 - 100,
              bubble.initialPosition.x - Math.random() * 200 + 100,
              bubble.initialPosition.x,
            ],
            y: [
              bubble.initialPosition.y,
              bubble.initialPosition.y - Math.random() * 200 + 100,
              bubble.initialPosition.y + Math.random() * 200 - 100,
              bubble.initialPosition.y,
            ],
            opacity: [0, 0.7, 0.7, 0],
            scale: [0.7, 1, 0.9, 0.7],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default LogoTransformAnimation;
