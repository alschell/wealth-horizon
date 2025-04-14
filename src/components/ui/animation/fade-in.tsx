
import React from "react";
import { motion } from "framer-motion";
import { standardAnimationVariants, optimizeAnimations } from "@/components/animations/utils/animationUtils";

/**
 * FadeIn - A component that animates its children with a fade-in effect
 * 
 * @param children - The content to be animated
 * @param delay - The delay before the animation starts (in seconds)
 * @param duration - The duration of the animation (in seconds)
 * @param className - Additional CSS classes to apply
 * @param yOffset - The y-offset for the animation (default: 10)
 */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = "",
  yOffset = 10
}) => {
  // Get variants and potentially optimize them
  const variants = standardAnimationVariants.fadeIn(yOffset, duration);
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
      data-testid="fade-in-animation"
    >
      {children}
    </motion.div>
  );
};
