
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  iconSize?: number;
  fullPage?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading data...",
  className,
  iconSize = 24,
  fullPage = false
}) => {
  // Use string template for iconSize instead of dynamic class
  const iconClass = cn(
    "text-gray-400 animate-spin mb-3",
    `h-${iconSize} w-${iconSize}`
  );
  
  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    fullPage ? "min-h-[50vh]" : "py-12",
    className
  );
  
  return (
    <div className={containerClasses}>
      <Loader2 className={iconClass} />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
