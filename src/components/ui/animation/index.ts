
/**
 * Animation components and utilities for consistent animations
 * throughout the application.
 * 
 * These components provide standardized animation behaviors
 * with performance optimizations.
 */

// Export core animation components
export { StaggerContainer } from './stagger-container';
export { StaggerItem } from './stagger-item';
export { ScaleIn } from './scale-in';
export { FadeIn } from './fade-in';

// Export animation utility types
export type { 
  FadeInProps,
  ScaleInProps,
  StaggerContainerProps,
  StaggerItemProps
} from './types';

// Export animation constants
export { 
  ANIMATION_DURATION,
  ANIMATION_EASE,
  STAGGER_CHILD_VARIANTS,
  STAGGER_CONTAINER_VARIANTS
} from './constants';
