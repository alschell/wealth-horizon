
import { Variants } from "framer-motion";

export const headerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export const featureVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 }
};

export const moduleVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export const moduleItemVariants = (index: number): Variants => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
});

export const chartVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 }
};

export const performanceVariants: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 }
};

export const actionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
