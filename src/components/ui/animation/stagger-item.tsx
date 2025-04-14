
import React from "react";
import { motion } from "framer-motion";
import { standardAnimationVariants, optimizeAnimations } from "@/components/animations/utils/animationUtils";

/**
 * StaggerItem - An individual item to be animated within a StaggerContainer
 * 
 * This component should be used as a child of StaggerContainer to create
 * staggered animation effects.
 * 
 * @param children - The content to be animated
 * @param className - Additional CSS classes to apply
 * @param duration - The duration of the animation (in seconds)
 * @param yOffset - The y-offset for the animation (default: 20)
 */
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = "",
  duration = 0.5,
  yOffset = 20
}) => {
  // Get optimized variants
  const variants = standardAnimationVariants.staggerItem(yOffset, duration);
  const optimizedVariants = optimizeAnimations.shouldSimplifyAnimations()
    ? optimizeAnimations.getOptimizedVariants(variants)
    : variants;

  return (
    <motion.div
      className={className}
      variants={optimizedVariants}
      data-testid="stagger-item"
    >
      {children}
    </motion.div>
  );
};
