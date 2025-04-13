
import React from 'react';
import { cn } from '@/lib/utils';

type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: {
    sm?: ColumnCount;
    md?: ColumnCount;
    lg?: ColumnCount;
    xl?: ColumnCount;
  };
  gap?: number | { x?: number; y?: number };
  rows?: number;
  className?: string;
}

/**
 * Responsive grid component with flexible column configuration
 */
export const Grid: React.FC<GridProps> = ({
  children,
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 4,
  rows,
  className,
  ...props
}) => {
  const getColumnClass = (columnCount: ColumnCount) => `grid-cols-${columnCount}`;
  
  const { sm, md, lg, xl } = cols;
  
  const gridClasses = cn(
    'grid',
    sm && getColumnClass(sm),
    md && `md:${getColumnClass(md)}`,
    lg && `lg:${getColumnClass(lg)}`,
    xl && `xl:${getColumnClass(xl)}`,
    typeof gap === 'number' ? `gap-${gap}` : `gap-x-${gap.x} gap-y-${gap.y}`,
    rows && `grid-rows-${rows}`,
    className
  );
  
  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};
