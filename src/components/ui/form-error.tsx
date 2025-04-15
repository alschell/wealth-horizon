
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface FormErrorProps {
  message?: string;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

/**
 * A standardized form error component for displaying validation errors
 */
const FormError = ({
  message,
  className,
  id,
  children
}: FormErrorProps) => {
  const errorMessage = message || children;
  
  if (!errorMessage) return null;
  
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-medium text-destructive mt-1.5",
        className
      )}
      id={id}
      aria-live="polite"
    >
      <AlertCircle className="h-4 w-4" />
      <span>{errorMessage}</span>
    </div>
  );
};

export { FormError };
