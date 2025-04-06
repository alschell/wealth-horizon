
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  onClick?: () => void; // Add onClick handler to the interface
}

export function FadeIn({
  children,
  duration = 0.5,
  delay = 0,
  className,
  direction = "up",
  distance = 20,
  once = true,
  onClick, // Include onClick in the component props
}: FadeInProps) {
  // Define direction variants
  const directionOffsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directionOffsets[direction]
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
      onClick={onClick} // Pass onClick to the motion.div
    >
      {children}
    </motion.div>
  );
}
