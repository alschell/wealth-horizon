
import { Variants } from "framer-motion";

export interface AnimationItemProp {
  item?: Variants;
}

export const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    }
  }
};

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};
