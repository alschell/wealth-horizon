
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  centered?: boolean;
}

/**
 * A container component that provides consistent layout options
 * for components across the application.
 */
export const ComponentContainer = ({
  children,
  fullWidth = false,
  centered = false,
  className,
  ...props
}: ComponentContainerProps) => {
  return (
    <div
      className={cn(
        'relative',
        fullWidth ? 'w-full' : 'max-w-7xl mx-auto',
        centered && 'flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
