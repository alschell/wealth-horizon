
import React from "react";
import { motion } from "framer-motion";

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  scale = 0.95,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
