
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
  withIcon?: boolean;
}

/**
 * Standardized error message component for displaying errors
 */
export function ErrorMessage({
  message,
  className,
  withIcon = true
}: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div 
      className={cn(
        "flex items-start gap-2 text-sm font-medium text-destructive p-2 rounded-md bg-destructive/10", 
        className
      )}
      role="alert"
    >
      {withIcon && <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
      <span>{message}</span>
    </div>
  );
}
