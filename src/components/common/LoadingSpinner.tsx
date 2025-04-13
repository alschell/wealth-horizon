
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  text?: string;
  className?: string;
  textClassName?: string;
  color?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

/**
 * Consistent loading spinner component with optional text
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className,
  textClassName,
  color = 'text-primary'
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 
        className={cn(
          "animate-spin",
          sizeClasses[size],
          color,
          className
        )} 
      />
      
      {text && (
        <p className={cn(
          "mt-2 text-sm font-medium text-gray-600",
          textClassName
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
