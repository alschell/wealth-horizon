
import { Variants } from "framer-motion";

export const headerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const featureVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const moduleVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const moduleItemVariants = (index: number): Variants => ({
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1 }
  }
});

export const chartVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

export const performanceVariants: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

export const actionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};
