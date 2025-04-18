
import React from 'react';
import { cn } from '@/lib/utils';
import EnhancedLoadingSpinner from './EnhancedLoadingSpinner';

interface EnhancedLoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spinnerVariant?: 'default' | 'primary' | 'secondary' | 'muted';
  loadingText?: string;  // Changed from deprecated "text" property
  className?: string;
  overlayClassName?: string;
  spinnerClassName?: string;
  blur?: boolean;
  fullScreen?: boolean;
}

export const EnhancedLoadingOverlay: React.FC<EnhancedLoadingOverlayProps> = ({
  isLoading,
  children,
  spinnerSize = 'md',
  spinnerVariant = 'primary',
  loadingText,  // Use the new property name consistently
  className,
  overlayClassName,
  spinnerClassName,
  blur = true,
  fullScreen = false,
}) => {
  const containerClasses = cn(
    'relative',
    fullScreen ? 'min-h-screen w-full' : 'w-full h-full',
    className
  );
  
  const overlayClasses = cn(
    'absolute inset-0 flex items-center justify-center z-50 transition-opacity duration-200',
    blur ? 'backdrop-blur-sm' : 'bg-background/80',
    isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none',
    overlayClassName
  );
  
  const contentClasses = cn(
    'transition-opacity duration-200',
    isLoading && 'opacity-50'
  );
  
  return (
    <div className={containerClasses}>
      <div className={contentClasses}>{children}</div>
      
      {isLoading && (
        <div className={overlayClasses}>
          <div className="flex flex-col items-center gap-3">
            <EnhancedLoadingSpinner 
              size={spinnerSize} 
              variant={spinnerVariant} 
              className={spinnerClassName}
              label={loadingText}
              labelPosition="bottom"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedLoadingOverlay;
