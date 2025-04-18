
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  className?: string;
  withIcon?: boolean;
}

/**
 * Standardized success message component for displaying success messages
 */
export function SuccessMessage({
  message,
  className,
  withIcon = true
}: SuccessMessageProps) {
  if (!message) return null;
  
  return (
    <div 
      className={cn(
        "flex items-start gap-2 text-sm font-medium text-green-700 p-2 rounded-md bg-green-50", 
        className
      )}
      role="status"
    >
      {withIcon && <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
      <span>{message}</span>
    </div>
  );
}
