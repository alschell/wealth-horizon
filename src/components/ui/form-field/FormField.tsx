
import React, { memo, useId, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { FormDescription } from '@/components/ui/form';
import { FormMessage } from '@/components/ui/form';

export interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  showError?: boolean;
  showLabel?: boolean;
  showDescription?: boolean;
  children: React.ReactNode;
}

/**
 * A performance-optimized form field component
 */
const FormField = ({
  name,
  label,
  description,
  error,
  required = false,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
  showError = true,
  showLabel = true,
  showDescription = true,
  children
}: FormFieldProps) => {
  // Use a stable ID for accessibility
  const id = useId();
  const fieldId = `${name}-${id}`;
  
  // Memoize the label component to prevent unnecessary re-renders
  const labelComponent = useMemo(() => {
    if (!showLabel || !label) return null;
    
    return (
      <Label 
        htmlFor={fieldId} 
        className={cn(
          "mb-2 block font-medium",
          required && "after:ml-0.5 after:text-red-500 after:content-['*']",
          labelClassName
        )}
      >
        {label}
      </Label>
    );
  }, [fieldId, label, required, labelClassName, showLabel]);
  
  // Memoize the description component to prevent unnecessary re-renders
  const descriptionComponent = useMemo(() => {
    if (!showDescription || !description) return null;
    
    return (
      <FormDescription className={cn("text-sm text-muted-foreground mt-1", descriptionClassName)}>
        {description}
      </FormDescription>
    );
  }, [description, descriptionClassName, showDescription]);
  
  // Memoize the error component to prevent unnecessary re-renders
  const errorComponent = useMemo(() => {
    if (!showError || !error) return null;
    
    return (
      <FormMessage className={cn("text-sm font-medium text-destructive mt-2", errorClassName)}>
        {error}
      </FormMessage>
    );
  }, [error, errorClassName, showError]);
  
  // Clone the children to pass the field ID
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        id: fieldId,
        name,
        "aria-invalid": !!error,
        "aria-describedby": description ? `${fieldId}-description` : undefined,
        ...child.props
      });
    }
    return child;
  });
  
  return (
    <div className={cn("space-y-1", className)}>
      {labelComponent}
      {childrenWithProps}
      {descriptionComponent}
      {errorComponent}
    </div>
  );
};

// Use memo to prevent re-renders when props haven't changed
export default memo(FormField);
