
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -200px 0px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
