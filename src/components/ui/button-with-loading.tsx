
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { withStrictTypes } from '@/utils/withStrictTypes';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonWithLoadingProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
  children,
  isLoading = false,
  loadingText,
  disabled,
  className,
  ...props
}) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn('relative', className)}
      {...props}
    >
      {isLoading && (
        <Loader2 className="absolute left-4 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      <span className={cn(isLoading && 'pl-2')}>
        {isLoading && loadingText ? loadingText : children}
      </span>
    </Button>
  );
};

export default withStrictTypes(ButtonWithLoading);
