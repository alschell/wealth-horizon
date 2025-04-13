
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface EnhancedLoadingSpinnerProps {
  size?: SpinnerSize;
  text?: string;
  className?: string;
  textClassName?: string;
  color?: string;
  centered?: boolean;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

/**
 * Enhanced loading spinner component with more size options and positioning control
 */
export const EnhancedLoadingSpinner: React.FC<EnhancedLoadingSpinnerProps> = ({
  size = 'md',
  text,
  className,
  textClassName,
  color = 'text-primary',
  centered = false
}) => {
  const content = (
    <>
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
    </>
  );

  if (centered) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[100px]">
        {content}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {content}
    </div>
  );
};

export default EnhancedLoadingSpinner;
