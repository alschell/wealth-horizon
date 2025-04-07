
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
  iconSize = 10,
  fullPage = false
}) => {
  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    fullPage ? "min-h-[50vh]" : "py-12",
    className
  );
  
  return (
    <div className={containerClasses}>
      <Loader2 className={`h-${iconSize} w-${iconSize} text-gray-400 animate-spin mb-3`} />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
