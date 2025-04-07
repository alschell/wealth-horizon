
import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  direction = "up", 
  delay = 0,
  className = "",
  ...props 
}) => {
  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { y: 20, x: 0 };
      case "down":
        return { y: -20, x: 0 };
      case "left":
        return { x: 20, y: 0 };
      case "right":
        return { x: -20, y: 0 };
      default:
        return { y: 20, x: 0 };
    }
  };

  const { x, y } = getDirectionValues();

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
