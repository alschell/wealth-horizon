
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = ""
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.5,
            ease: "easeOut"
          } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
