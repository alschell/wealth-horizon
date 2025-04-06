
import { Variants } from "framer-motion";

export interface MotionVariants {
  hidden: Variants["hidden"];
  show: Variants["show"];
}

export interface AnimationItemProp {
  item: MotionVariants;
}
