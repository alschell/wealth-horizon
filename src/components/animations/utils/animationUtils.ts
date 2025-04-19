
/**
 * Standard animation variants for common animations
 */
export const standardAnimationVariants = {
  fadeIn: (yOffset = 10, duration = 0.5) => ({
    hidden: { 
      opacity: 0, 
      y: yOffset 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration,
        ease: "easeOut" 
      }
    }
  }),
  
  scaleIn: (scale = 0.95, duration = 0.5) => ({
    hidden: { 
      opacity: 0, 
      scale 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration,
        ease: "easeOut" 
      }
    }
  }),
  
  staggerContainer: (delayChildren = 0.1) => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.1,
        staggerChildren: delayChildren 
      }
    }
  }),
  
  staggerItem: (yOffset = 20, duration = 0.5) => ({
    hidden: { 
      opacity: 0, 
      y: yOffset 
    },
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
 * Utilities for optimizing animations based on user preferences
 * and device capabilities
 */
export const optimizeAnimations = {
  shouldSimplifyAnimations: () => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  },
  
  getOptimizedVariants: (variants: any) => {
    // Return simplified variants for reduced motion
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.2 }
      }
    };
  }
};
