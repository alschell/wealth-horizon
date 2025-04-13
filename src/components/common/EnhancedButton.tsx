
import React from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loadingText?: string;
}

/**
 * Enhanced button component with loading state and icon support
 */
export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  isLoading = false,
  disabled,
  icon,
  iconPosition = 'left',
  loadingText,
  className,
  ...props
}) => {
  const content = loadingText && isLoading ? loadingText : children;
  
  return (
    <Button
      disabled={isLoading || disabled}
      className={className}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {content}
      {!isLoading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </Button>
  );
};
