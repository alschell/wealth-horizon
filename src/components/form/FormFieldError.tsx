
import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { FormError } from './FormError';

interface FormFieldErrorProps {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  description?: string;
}

export function FormFieldError({
  id,
  label,
  error,
  required,
  children,
  className,
  labelClassName,
  description
}: FormFieldErrorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            "flex items-center gap-1",
            error && "text-destructive",
            labelClassName
          )}
        >
          {label}
          {required && (
            <span className="text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}
      
      {children}
      
      <FormError message={error} />
      
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
