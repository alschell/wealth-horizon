
import React from "react";
import { motion } from "framer-motion";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = "",
  duration = 0.5
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          y: 20 
        },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration,
            ease: "easeOut"
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
