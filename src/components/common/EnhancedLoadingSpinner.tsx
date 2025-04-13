
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';

export interface EnhancedLoadingSpinnerProps {
  size?: SpinnerSize;
  text?: string;
  className?: string;
  textClassName?: string;
  color?: string;
  centered?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  customSize?: number;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
  showDelay?: number;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
  custom: '' // Will use customSize
};

const variantClasses: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  muted: 'text-muted-foreground'
};

/**
 * Enhanced loading spinner component with more size options, positioning control and variants
 */
export const EnhancedLoadingSpinner: React.FC<EnhancedLoadingSpinnerProps> = ({
  size = 'md',
  text,
  className,
  textClassName,
  color,
  centered = false,
  variant = 'primary',
  customSize,
  textPosition = 'bottom',
  showDelay = 0
}) => {
  const [isVisible, setIsVisible] = React.useState(showDelay === 0);
  
  React.useEffect(() => {
    if (showDelay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, showDelay);
      
      return () => clearTimeout(timer);
    }
  }, [showDelay]);
  
  if (!isVisible) {
    return null;
  }
  
  // Determine spinner size class
  const spinnerSizeClass = size === 'custom' && customSize 
    ? `h-[${customSize}px] w-[${customSize}px]` 
    : sizeClasses[size];
  
  // Determine color class
  const colorClass = color ? color : variantClasses[variant];
  
  const spinnerElement = (
    <Loader2 
      className={cn(
        "animate-spin",
        spinnerSizeClass,
        colorClass,
        className
      )} 
      style={size === 'custom' && customSize ? { width: customSize, height: customSize } : undefined}
    />
  );
  
  const textElement = text && (
    <p className={cn(
      "text-sm font-medium text-gray-600",
      textClassName
    )}>
      {text}
    </p>
  );
  
  // Layout based on text position
  const contentElement = (() => {
    switch (textPosition) {
      case 'top':
        return (
          <>
            {textElement}
            <div className="mt-2">{spinnerElement}</div>
          </>
        );
      case 'left':
        return (
          <div className="flex items-center">
            {textElement}
            <div className="ml-2">{spinnerElement}</div>
          </div>
        );
      case 'right':
        return (
          <div className="flex items-center">
            {spinnerElement}
            <div className="ml-2">{textElement}</div>
          </div>
        );
      case 'bottom':
      default:
        return (
          <>
            {spinnerElement}
            {textElement && <div className="mt-2">{textElement}</div>}
          </>
        );
    }
  })();
  
  if (centered) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[100px]">
        {contentElement}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center">
      {contentElement}
    </div>
  );
};

export default EnhancedLoadingSpinner;
