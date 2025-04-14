
import React from "react";
import { motion } from "framer-motion";
import { standardAnimationVariants, optimizeAnimations } from "@/components/animations/utils/animationUtils";

/**
 * ScaleIn - A component that animates its children with a scale-in effect
 * 
 * @param children - The content to be animated
 * @param delay - The delay before the animation starts (in seconds)
 * @param duration - The duration of the animation (in seconds)
 * @param scale - The initial scale factor (default: 0.95)
 * @param className - Additional CSS classes to apply
 */
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
  // Get variants and potentially optimize them
  const variants = standardAnimationVariants.scaleIn(scale, duration);
  const optimizedVariants = optimizeAnimations.shouldSimplifyAnimations()
    ? optimizeAnimations.getOptimizedVariants(variants)
    : variants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={optimizedVariants}
      transition={{ 
        delay,
        ease: "easeOut" 
      }}
      className={className}
      data-testid="scale-in-animation"
    >
      {children}
    </motion.div>
  );
};
