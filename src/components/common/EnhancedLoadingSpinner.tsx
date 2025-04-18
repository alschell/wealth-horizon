
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface EnhancedLoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'muted';
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  centered?: boolean;
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const variantMap: Record<string, string> = {
  default: 'text-gray-500',
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-muted-foreground',
};

export const EnhancedLoadingSpinner: React.FC<EnhancedLoadingSpinnerProps> = ({
  size = 'md',
  className,
  variant = 'default',
  label,
  labelPosition = 'right',
  centered = false,
}) => {
  const containerClasses = cn(
    'inline-flex items-center',
    {
      'flex-col': labelPosition === 'top' || labelPosition === 'bottom',
      'flex-row': labelPosition === 'left' || labelPosition === 'right',
      'justify-center': centered,
      'gap-1': labelPosition === 'right' || labelPosition === 'left',
      'gap-2': labelPosition === 'top' || labelPosition === 'bottom',
      'mx-auto': centered,
    },
    centered && 'w-full',
  );
  
  const spinnerClasses = cn(
    'animate-spin',
    sizeMap[size],
    variantMap[variant],
    className
  );
  
  const labelClasses = cn(
    'text-sm font-medium',
    variantMap[variant],
    {
      'order-first': labelPosition === 'left' || labelPosition === 'top',
      'order-last': labelPosition === 'right' || labelPosition === 'bottom',
    }
  );
  
  const content = (
    <>
      <Loader2 className={spinnerClasses} aria-hidden="true" />
      {label && <span className={labelClasses}>{label}</span>}
    </>
  );
  
  return centered ? (
    <div className="w-full flex justify-center">
      <div className={containerClasses}>
        {content}
      </div>
    </div>
  ) : (
    <div className={containerClasses}>{content}</div>
  );
};

export default EnhancedLoadingSpinner;
