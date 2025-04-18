
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface StandardFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  formTitle?: string;
  formDescription?: string;
  submitDisabled?: boolean;
  className?: string;
  footerClassName?: string;
  children: React.ReactNode;
}

/**
 * StandardForm provides a consistent form layout and behavior across the application
 */
export function StandardForm({
  onSubmit,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  onCancel,
  isSubmitting = false,
  formTitle,
  formDescription,
  submitDisabled = false,
  className,
  footerClassName,
  ...props
}: StandardFormProps) {
  return (
    <form 
      onSubmit={onSubmit} 
      className={cn("space-y-6", className)} 
      {...props}
    >
      {formTitle && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">{formTitle}</h2>
          {formDescription && (
            <p className="text-sm text-muted-foreground">{formDescription}</p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
      
      <div className={cn("flex justify-end space-x-3 pt-4", footerClassName)}>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
        )}
        
        <Button 
          type="submit" 
          disabled={isSubmitting || submitDisabled}
        >
          {isSubmitting ? "Processing..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
