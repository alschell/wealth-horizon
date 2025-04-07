
import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ScaleInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  className?: string;
  scale?: number;
}

export const ScaleIn: React.FC<ScaleInProps> = ({ 
  children, 
  delay = 0,
  className = "",
  scale = 0.95,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
