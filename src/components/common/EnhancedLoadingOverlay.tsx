
import React from 'react';
import EnhancedLoadingSpinner from './EnhancedLoadingSpinner';
import { cn } from '@/lib/utils';

export interface EnhancedLoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
  opacity?: 'light' | 'medium' | 'dark' | 'transparent';
  blur?: boolean;
  className?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spinnerColor?: string;
  spinnerVariant?: 'primary' | 'secondary' | 'accent' | 'muted';
  zIndex?: number;
  showSpinnerAfterDelay?: number;
  backdropColor?: string;
  showBackdrop?: boolean;
  preventScroll?: boolean;
}

/**
 * Enhanced loading overlay with more customization options
 */
export const EnhancedLoadingOverlay = React.forwardRef<HTMLDivElement, EnhancedLoadingOverlayProps>(({
  isLoading,
  children,
  text,
  opacity = 'medium',
  blur = true,
  className,
  spinnerSize = 'lg',
  spinnerColor,
  spinnerVariant = 'primary',
  zIndex = 50,
  showSpinnerAfterDelay = 0,
  backdropColor,
  showBackdrop = true,
  preventScroll = false
}, ref) => {
  const opacityClass = {
    light: 'bg-white/30',
    medium: 'bg-white/50',
    dark: 'bg-white/80',
    transparent: 'bg-transparent'
  };

  // Handle scroll prevention
  React.useEffect(() => {
    if (preventScroll && isLoading) {
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [preventScroll, isLoading]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
      
      {isLoading && showBackdrop && (
        <div 
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center",
            `z-[${zIndex}]`,
            backdropColor ? '' : opacityClass[opacity],
            blur && "backdrop-blur-sm"
          )}
          style={backdropColor ? { backgroundColor: backdropColor } : undefined}
        >
          <EnhancedLoadingSpinner 
            size={spinnerSize} 
            text={text} 
            color={spinnerColor}
            variant={spinnerVariant}
            showDelay={showSpinnerAfterDelay}
          />
        </div>
      )}
    </div>
  );
});

EnhancedLoadingOverlay.displayName = 'EnhancedLoadingOverlay';

export default EnhancedLoadingOverlay;
