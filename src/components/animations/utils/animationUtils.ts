
import { Variants } from "framer-motion";

/**
 * Standard animation variants for consistent animation across components
 */
export const standardAnimationVariants = {
  /**
   * Fade in animation variant with optional Y offset
   * @param yOffset - The Y offset to animate from (default: 10)
   * @param duration - Animation duration in seconds (default: 0.5)
   */
  fadeIn: (yOffset = 10, duration = 0.5): Variants => ({
    hidden: { opacity: 0, y: yOffset },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration,
        ease: "easeOut"
      }
    }
  }),

  /**
   * Scale in animation variant
   * @param initialScale - The starting scale (default: 0.95)
   * @param duration - Animation duration in seconds (default: 0.5)
   */
  scaleIn: (initialScale = 0.95, duration = 0.5): Variants => ({
    hidden: { opacity: 0, scale: initialScale },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration,
        ease: "easeOut"
      }
    }
  }),

  /**
   * Stagger container animation variant
   * @param staggerDelay - Delay between child animations (default: 0.1)
   */
  staggerContainer: (staggerDelay = 0.1): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  }),

  /**
   * Stagger item animation variant
   * @param yOffset - The Y offset to animate from (default: 20)
   * @param duration - Animation duration in seconds (default: 0.5)
   */
  staggerItem: (yOffset = 20, duration = 0.5): Variants => ({
    hidden: { opacity: 0, y: yOffset },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration,
        ease: "easeOut"
      }
    }
  })
};

/**
 * Performance optimization utility for animations
 * Helps reduce unnecessary animations on small devices or when performance is a concern
 */
export const optimizeAnimations = {
  /**
   * Determines if animations should be simplified based on device capabilities
   * @returns boolean indicating if animations should be simplified
   */
  shouldSimplifyAnimations: (): boolean => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    }
    
    // Add additional checks for low-powered devices if needed
    return false;
  },

  /**
   * Gets optimized animation variants based on device capabilities
   * @param variants - The standard animation variants
   * @returns Optimized variants with adjusted duration/complexity
   */
  getOptimizedVariants: (variants: Variants): Variants => {
    if (optimizeAnimations.shouldSimplifyAnimations()) {
      // Return simplified variants with shorter durations
      return {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible?.transition,
            duration: (variants.visible?.transition as any)?.duration 
              ? (variants.visible?.transition as any).duration * 0.7 
              : 0.3
          }
        }
      };
    }
    return variants;
  }
};

/**
 * Creates optimized motion props for components
 * @param initialVariant - Initial animation state
 * @param animateVariant - Animation target state
 * @param customVariants - Custom animation variants
 * @returns Object with motion props
 */
export const createMotionProps = (
  initialVariant: string,
  animateVariant: string,
  customVariants: Variants
) => {
  return {
    initial: initialVariant,
    animate: animateVariant,
    variants: optimizeAnimations.shouldSimplifyAnimations()
      ? optimizeAnimations.getOptimizedVariants(customVariants)
      : customVariants
  };
};
