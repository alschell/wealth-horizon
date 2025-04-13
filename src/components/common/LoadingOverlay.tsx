
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
  opacity?: 'light' | 'medium' | 'dark';
  blur?: boolean;
  className?: string;
}

/**
 * A loading overlay that covers a component while showing a loading spinner
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  text,
  opacity = 'medium',
  blur = true,
  className
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
          <LoadingSpinner size="lg" text={text} />
        </div>
      )}
    </div>
  );
};
