
import { Variants } from "framer-motion";

export interface AnimationItemProp {
  item: Variants;
}

// Convenience type for creating animation variants
export type MotionVariants = {
  hidden: any;
  show: any;
};
