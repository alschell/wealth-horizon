
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 20,
  duration = 0.5,
}: StaggerItemProps) {
  // Define direction variants
  const getInitialOffset = () => {
    switch (direction) {
      case "up": return { y: distance };
      case "down": return { y: -distance };
      case "left": return { x: distance };
      case "right": return { x: -distance };
      case "none": return {};
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0,
          ...getInitialOffset()
        },
        visible: { 
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
          }
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
