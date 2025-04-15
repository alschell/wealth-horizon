
import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import MarketItemCard from './MarketItemCard';
import type { MarketItem } from '../../types';

interface MarketItemsGridProps {
  items: MarketItem[];
  className?: string;
}

/**
 * Displays a responsive grid of market item cards
 */
const MarketItemsGrid = ({ items, className }: MarketItemsGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No market items to display. Customize your view to add items.
      </div>
    );
  }
  
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
      className
    )}>
      {items.map(item => (
        <MarketItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(MarketItemsGrid);
