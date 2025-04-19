
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/form-field';

interface StandardFormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
  formTitle?: string;
  formDescription?: string;
  submitDisabled?: boolean;
}

/**
 * Standardized form component with consistent layout and behavior
 */
export function StandardForm({
  onSubmit,
  children,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  isSubmitting = false,
  className,
  formTitle,
  formDescription,
  submitDisabled = false
}: StandardFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn('space-y-4 text-left', className)}>
      {formTitle && (
        <div className="space-y-2 text-left">
          <h2 className="text-2xl font-bold text-left">{formTitle}</h2>
          {formDescription && (
            <p className="text-gray-500 text-left">{formDescription}</p>
          )}
        </div>
      )}
      
      <div className="space-y-4 text-left">
        {children}
      </div>
      
      <div className="flex justify-end space-x-2 pt-2 text-left">
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
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export { FormField };
