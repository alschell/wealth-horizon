
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;
  
  return (
    <div 
      className={cn(
        "flex items-center gap-2 text-sm text-destructive mt-1",
        className
      )}
      role="alert"
    >
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
