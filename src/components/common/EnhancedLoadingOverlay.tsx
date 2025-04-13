
import React from 'react';
import EnhancedLoadingSpinner from './EnhancedLoadingSpinner';
import { cn } from '@/lib/utils';

interface EnhancedLoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
  opacity?: 'light' | 'medium' | 'dark';
  blur?: boolean;
  className?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Enhanced loading overlay with more customization options
 */
export const EnhancedLoadingOverlay: React.FC<EnhancedLoadingOverlayProps> = ({
  isLoading,
  children,
  text,
  opacity = 'medium',
  blur = true,
  className,
  spinnerSize = 'lg'
}) => {
  const opacityClass = {
    light: 'bg-white/30',
    medium: 'bg-white/50',
    dark: 'bg-white/80'
  };

  return (
    <div className={cn("relative", className)}>
      {children}
      
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center z-50",
            opacityClass[opacity],
            blur && "backdrop-blur-sm"
          )}
        >
          <EnhancedLoadingSpinner size={spinnerSize} text={text} />
        </div>
      )}
    </div>
  );
};

export default EnhancedLoadingOverlay;
