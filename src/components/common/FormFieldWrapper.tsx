
import React from 'react';
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Consistent wrapper for form fields with label, error handling, and accessibility
 * Works with any form input component
 */
export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  id,
  label,
  error,
  required = false,
  description,
  className,
  children
}) => {
  // Generate unique IDs for associated elements
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  
  // Determine which ID to use for aria-describedby
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={id}
        className={cn(error && "text-destructive")}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      {/* Pass aria attributes to the child element */}
      {React.isValidElement(children) 
        ? React.cloneElement(children as React.ReactElement, {
            id,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": ariaDescribedBy,
            "aria-required": required,
          })
        : children
      }
      
      {/* Description text */}
      {description && (
        <p 
          id={descriptionId}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
      
      {/* Error message */}
      {error && (
        <p 
          id={errorId}
          className="text-sm font-medium text-destructive"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormFieldWrapper;
