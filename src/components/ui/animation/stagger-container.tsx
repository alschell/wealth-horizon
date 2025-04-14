
import React from "react";
import { motion } from "framer-motion";
import { standardAnimationVariants, optimizeAnimations } from "@/components/animations/utils/animationUtils";

/**
 * StaggerContainer - A container that staggers the animations of its children
 * 
 * This component is typically used with StaggerItem components as children.
 * It will animate each child with a delay between them for a staggered effect.
 * 
 * @param children - The content to be animated (typically StaggerItem components)
 * @param className - Additional CSS classes to apply
 * @param delay - The delay before the animation starts (in seconds)
 * @param duration - The duration of the animation (in seconds)
 * @param staggerDelay - The delay between each child's animation (in seconds)
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.1
}) => {
  // Get optimized variants
  const variants = standardAnimationVariants.staggerContainer(staggerDelay);
  const optimizedVariants = optimizeAnimations.shouldSimplifyAnimations()
    ? optimizeAnimations.getOptimizedVariants(variants)
    : variants;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={optimizedVariants}
      transition={{
        duration,
        delay
      }}
      data-testid="stagger-container"
    >
      {children}
    </motion.div>
  );
};
