
import { Variants } from "framer-motion";

/**
 * Default animation duration in seconds
 */
export const ANIMATION_DURATION = 0.5;

/**
 * Default animation easing function
 */
export const ANIMATION_EASE = [0.25, 0.1, 0.25, 1.0]; // Cubic bezier curve for smooth easing

/**
 * Default stagger container animation variants
 */
export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

/**
 * Default stagger child item animation variants
 */
export const STAGGER_CHILD_VARIANTS: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE
    }
  }
};

/**
 * Default fade in animation variants
 */
export const FADE_IN_VARIANTS: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE
    }
  }
};

/**
 * Default scale in animation variants
 */
export const SCALE_IN_VARIANTS: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE
    }
  }
};
