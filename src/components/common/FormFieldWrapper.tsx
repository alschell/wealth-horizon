
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';

export interface FormFieldWrapperProps {
  id: string;
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  hideLabel?: boolean;
  tooltip?: string;
  layout?: 'vertical' | 'horizontal' | 'compact';
  containerClassName?: string;
  labelWidth?: string;
  contentWidth?: string;
  showAsterisk?: boolean;
  htmlFor?: string;
}

/**
 * Consistent form field wrapper with label, error message and description
 */
const FormFieldWrapper = React.forwardRef<HTMLDivElement, FormFieldWrapperProps>(({
  id,
  label,
  error,
  description,
  required = false,
  className,
  children,
  labelClassName,
  descriptionClassName,
  errorClassName,
  hideLabel = false,
  tooltip,
  layout = 'vertical',
  containerClassName,
  labelWidth = 'w-1/3',
  contentWidth = 'flex-1',
  showAsterisk = true,
  htmlFor,
}, ref) => {
  // Base vertical layout - default
  let containerClasses = "space-y-2";
  let contentClasses = "";
  
  // Determine layout classes
  if (layout === 'horizontal') {
    containerClasses = "flex flex-wrap items-start gap-4";
    contentClasses = contentWidth;
  } else if (layout === 'compact') {
    containerClasses = "flex flex-col space-y-1";
  }
  
  const labelElement = !hideLabel && label && (
    <Label 
      htmlFor={htmlFor || id} 
      className={cn(
        'block text-sm font-medium', 
        error ? 'text-destructive' : 'text-gray-700',
        layout === 'horizontal' && `${labelWidth} pt-2 text-right`,
        labelClassName
      )}
    >
      {label}
      {required && showAsterisk && <span className="text-destructive ml-1">*</span>}
      
      {tooltip && (
        <div className="relative inline-block ml-1">
          <div className="group">
            <InfoIcon className="h-4 w-4 text-muted-foreground inline-block cursor-help" />
            <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 w-60 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {tooltip}
            </div>
          </div>
        </div>
      )}
    </Label>
  );
  
  return (
    <div ref={ref} className={cn(containerClasses, className, containerClassName)} data-testid={`form-field-${id}`}>
      {labelElement}
      
      <div className={contentClasses}>
        {children}
        
        {description && !error && (
          <p className={cn("text-xs text-gray-500 mt-1", descriptionClassName)}>
            {description}
          </p>
        )}
        
        {error && (
          <p 
            className={cn("text-xs text-destructive mt-1", errorClassName)} 
            id={`${id}-error`}
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
});

FormFieldWrapper.displayName = 'FormFieldWrapper';

export default FormFieldWrapper;
