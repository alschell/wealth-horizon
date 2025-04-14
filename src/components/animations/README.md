
# Animation System

This directory contains all the animation components and utilities used throughout the application.

## Key Components

- **OptimizedDashboardAnimation**: A performance-optimized dashboard animation
- **PlatformOverviewAnimation**: Animation for the platform overview section
- **WealthTransformAnimation**: Animation for wealth transformation visualizations
- **FeatureAnimation**: Animated feature showcase

## Animation Utils

The `utils` directory contains shared animation utilities:

- **animationUtils.ts**: Provides standard animation variants, optimization tools and helper functions
- **AnimationVariants.ts**: Framer Motion animation variant presets

## Performance Considerations

Animations are automatically optimized based on:

- User preference (prefers-reduced-motion)
- Device capabilities (through performance monitoring)
- Battery status (when available)

## Usage Examples

```tsx
// Using the optimized dashboard animation
import DashboardAnimation from '@/components/animations/dashboard';

const MyComponent = () => {
  return (
    <div className="container">
      <DashboardAnimation />
    </div>
  );
};

// Using animation components from the UI library
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animation';

const FeatureList = () => {
  return (
    <StaggerContainer className="grid grid-cols-2 gap-4">
      {features.map((feature) => (
        <StaggerItem key={feature.id}>
          <FeatureCard {...feature} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};
```

## Performance Monitoring

The animation system includes built-in performance monitoring in development mode. It tracks animation durations and logs warnings for animations that may cause frame drops.

To access these metrics:

```tsx
import { getAnimationMetrics } from '@/utils/performance/animationPerformance';

// In a developer tool component
const metrics = getAnimationMetrics();
console.table(metrics);
```

## Best Practices

1. Use the predefined animation components whenever possible
2. For custom animations, use the standardAnimationVariants from animationUtils
3. Always test animations on low-powered devices
4. Consider disabling or simplifying animations for users who prefer reduced motion
