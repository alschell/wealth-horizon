
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  loadingText?: string;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  tooltip?: string;
  confirmMessage?: string;
  onConfirm?: () => void;
}

/**
 * Enhanced button component with loading state, icon support, and optional confirmation
 */
const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({
    children,
    isLoading = false,
    icon,
    rightIcon,
    loadingText,
    className,
    disabled,
    fullWidth = false,
    tooltip,
    confirmMessage,
    onConfirm,
    onClick,
    ...props
  }, ref) => {
    const displayText = isLoading && loadingText ? loadingText : children;
    
    // Handle click with optional confirmation
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (confirmMessage && !isLoading && !disabled) {
        if (window.confirm(confirmMessage)) {
          if (onConfirm) {
            onConfirm();
          }
        }
      } else if (onClick) {
        onClick(e);
      }
    };
    
    const button = (
      <Button
        ref={ref}
        className={cn(
          'flex items-center gap-2',
          isLoading && 'opacity-80',
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        
        {displayText}
        
        {rightIcon && !isLoading && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </Button>
    );
    
    // Add tooltip if provided
    if (tooltip) {
      return (
        <div className="relative group">
          {button}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {tooltip}
          </div>
        </div>
      );
    }
    
    return button;
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export default EnhancedButton;
