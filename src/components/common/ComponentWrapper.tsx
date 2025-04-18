
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  spacing?: 'none' | 'small' | 'medium' | 'large';
}

const variantStyles = {
  default: '',
  bordered: 'border border-gray-200 rounded-lg',
  elevated: 'shadow-sm rounded-lg bg-white'
};

const spacingStyles = {
  none: '',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-6'
};

/**
 * A wrapper component that provides consistent styling and spacing options
 * for components across the application.
 */
export const ComponentWrapper = ({
  children,
  variant = 'default',
  spacing = 'medium',
  className,
  ...props
}: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        variantStyles[variant],
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
