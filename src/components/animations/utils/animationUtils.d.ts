
/**
 * Type definitions for animation utilities
 */
import { Variants } from "framer-motion";

export interface StandardAnimationVariants {
  fadeIn: (yOffset?: number, duration?: number) => Variants;
  scaleIn: (initialScale?: number, duration?: number) => Variants;
  staggerContainer: (staggerDelay?: number) => Variants;
  staggerItem: (yOffset?: number, duration?: number) => Variants;
}

export interface AnimationOptimization {
  shouldSimplifyAnimations: () => boolean;
  getOptimizedVariants: (variants: Variants) => Variants;
}

export interface MotionProps {
  initial: string;
  animate: string;
  variants: Variants;
}

export const standardAnimationVariants: StandardAnimationVariants;
export const optimizeAnimations: AnimationOptimization;
export function createMotionProps(
  initialVariant: string,
  animateVariant: string,
  customVariants: Variants
): MotionProps;
