
import React, { forwardRef } from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loadingText?: string;
  isActive?: boolean;
  tooltip?: string;
  focusRing?: boolean;
}

/**
 * Enhanced button component with loading state and icon support
 * Includes proper ref forwarding and TypeScript type safety
 */
export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(({
  children,
  isLoading = false,
  disabled,
  icon,
  iconPosition = 'left',
  loadingText,
  className,
  isActive = false,
  tooltip,
  focusRing = true,
  ...props
}, ref) => {
  const content = loadingText && isLoading ? loadingText : children;
  
  // Add aria attributes for better accessibility
  const ariaProps = {
    'aria-busy': isLoading,
    'aria-disabled': isLoading || disabled,
    ...(tooltip && { 'aria-label': tooltip, title: tooltip }),
    ...(isActive && { 'aria-current': 'page' as const }),
  };
  
  return (
    <Button
      ref={ref}
      disabled={isLoading || disabled}
      className={cn(
        isLoading && "cursor-not-allowed",
        isActive && "bg-accent text-accent-foreground",
        !focusRing && "focus-visible:ring-0 focus-visible:ring-offset-0",
        className
      )}
      {...ariaProps}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {content}
      {!isLoading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </Button>
  );
});

EnhancedButton.displayName = 'EnhancedButton';

export default EnhancedButton;
