
import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  );
};

export default Grid;
