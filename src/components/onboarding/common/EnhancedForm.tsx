
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/form-field';

interface EnhancedFormProps {
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
  withDividers?: boolean;
  showFooter?: boolean;
}

/**
 * Enhanced form component for onboarding flows
 * with consistent styling and behavior
 */
const EnhancedForm: React.FC<EnhancedFormProps> = ({
  onSubmit,
  children,
  submitLabel = 'Continue',
  cancelLabel = 'Back',
  onCancel,
  isSubmitting = false,
  className,
  formTitle,
  formDescription,
  submitDisabled = false,
  withDividers = false,
  showFooter = true
}) => {
  return (
    <form onSubmit={onSubmit} className={cn('space-y-6', className)}>
      {formTitle && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{formTitle}</h2>
          {formDescription && (
            <p className="text-muted-foreground">{formDescription}</p>
          )}
        </div>
      )}
      
      <div className={cn(
        'space-y-6',
        withDividers && 'divide-y divide-border'
      )}>
        {children}
      </div>
      
      {showFooter && (
        <div className="flex justify-between pt-4">
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
          
          <div className={cn(!onCancel && 'ml-auto')}>
            <Button 
              type="submit" 
              disabled={isSubmitting || submitDisabled}
            >
              {isSubmitting ? 'Processing...' : submitLabel}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export { EnhancedForm, FormField };
