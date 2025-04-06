
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScaleInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  initialScale?: number;
  once?: boolean;
}

export function ScaleIn({
  children,
  duration = 0.5,
  delay = 0,
  className,
  initialScale = 0.95,
  once = true,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        scale: initialScale
      }}
      whileInView={{ 
        opacity: 1,
        scale: 1
      }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
