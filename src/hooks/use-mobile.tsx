
import { useState, useEffect, useMemo } from 'react';

interface MobileOptions {
  /** Screen width breakpoint for mobile devices in pixels. Default is 768px. */
  breakpoint?: number;
  /** Whether to watch for resize events. Default is true. */
  watchResize?: boolean;
  /** Additional query to check for mobile devices, like checking for touch events */
  additionalCheck?: () => boolean;
}

/**
 * Hook to detect if the current device is a mobile device based on screen width
 * and optionally other factors like touch capabilities.
 */
export function useMobile(options?: MobileOptions): boolean {
  const {
    breakpoint = 768,
    watchResize = true,
    additionalCheck,
  } = options || {};

  // Check for additional mobile indicators
  const hasAdditionalMobileIndicators = useMemo(() => {
    if (typeof additionalCheck === 'function') {
      return additionalCheck();
    }
    
    // Default check for touch capability if no custom check provided
    return 'ontouchstart' in window || 
           navigator.maxTouchPoints > 0 || 
           (navigator as any).msMaxTouchPoints > 0;
  }, [additionalCheck]);

  // State to track if screen width is below breakpoint
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(() => {
    // Default to false during SSR
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    // Skip if not watching for resize events
    if (!watchResize) return;

    // Function to check window width
    const checkMobile = () => {
      setIsMobileWidth(window.innerWidth < breakpoint);
    };

    // Set initial value
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint, watchResize]);

  // Combine screen width check with additional indicators
  return isMobileWidth || hasAdditionalMobileIndicators;
}

/**
 * Component that renders different content for mobile and desktop
 */
interface ResponsiveProps {
  /** Content to render on mobile devices */
  mobile: React.ReactNode;
  /** Content to render on desktop devices */
  desktop: React.ReactNode;
  /** Options for mobile detection */
  options?: MobileOptions;
}

export const Responsive: React.FC<ResponsiveProps> = ({
  mobile,
  desktop,
  options,
}) => {
  const isMobile = useMobile(options);
  return <>{isMobile ? mobile : desktop}</>;
};

export default useMobile;
