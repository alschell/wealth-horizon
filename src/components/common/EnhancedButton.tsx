
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  loadingText?: string;
}

/**
 * Enhanced button component with loading state and icon support
 */
const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  isLoading = false,
  icon,
  loadingText,
  className,
  disabled,
  ...props
}) => {
  const displayText = isLoading && loadingText ? loadingText : children;
  
  return (
    <Button
      className={cn(
        'flex items-center gap-2',
        isLoading && 'opacity-80',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {displayText}
    </Button>
  );
};

export default EnhancedButton;
