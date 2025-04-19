
import { HTMLMotionProps } from "framer-motion";

/**
 * Base props interface for all animation components
 */
export interface AnimationBaseProps {
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Duration of the animation (in seconds)
   * @default 0.5
   */
  duration?: number;
  
  /**
   * Children elements to animate
   */
  children: React.ReactNode;
  
  /**
   * Additional className to apply to the animated element
   */
  className?: string;
}

/**
 * Props for the FadeIn animation component
 */
export interface FadeInProps extends AnimationBaseProps {
  /**
   * Initial Y offset for the fade animation
   * @default 10
   */
  yOffset?: number;
}

/**
 * Props for the ScaleIn animation component
 */
export interface ScaleInProps extends AnimationBaseProps {
  /**
   * Initial scale value
   * @default 0.95
   */
  initialScale?: number;
}

/**
 * Props for the StaggerContainer animation component
 */
export interface StaggerContainerProps extends AnimationBaseProps {
  /**
   * Delay between each child animation (in seconds)
   * @default 0.1
   */
  staggerDelay?: number;
  
  /**
   * HTML element tag to use for the container
   * @default "div"
   */
  as?: keyof JSX.IntrinsicElements;
  
  /**
   * Additional motion props to pass to the container
   */
  motionProps?: HTMLMotionProps<"div">;
}

/**
 * Props for the StaggerItem animation component
 */
export interface StaggerItemProps extends AnimationBaseProps {
  /**
   * Index of the item in the stagger sequence
   * Only needed if not using inside StaggerContainer
   */
  index?: number;
  
  /**
   * HTML element tag to use for the item
   * @default "div"
   */
  as?: keyof JSX.IntrinsicElements;
  
  /**
   * Additional motion props to pass to the item
   */
  motionProps?: HTMLMotionProps<"div">;
}
