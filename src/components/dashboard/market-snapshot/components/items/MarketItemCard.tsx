
import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { MarketItemData } from '../../types';

interface MarketItemCardProps {
  item: MarketItemData;
  className?: string;
}

/**
 * Displays a single market item card with performance indicators
 */
const MarketItemCard = ({ item, className }: MarketItemCardProps) => {
  // Determine if the change is positive, negative, or neutral
  const isPositive = item.changePercent > 0;
  const isNegative = item.changePercent < 0;
  const isNeutral = !isPositive && !isNegative;
  
  // Format values
  const formattedValue = Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(item.value);
  
  const formattedPercent = Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero'
  }).format(item.changePercent / 100);
  
  return (
    <Card className={cn("h-full overflow-hidden transition-all duration-200 hover:shadow-md", className)}>
      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Title area */}
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm truncate" title={item.title}>
              {item.title}
            </h3>
            <Badge 
              variant={item.category === 'stock' ? 'default' : 'outline'}
              className="text-xs"
            >
              {item.category}
            </Badge>
          </div>
          
          {/* Value area */}
          <div className="text-xl font-bold">{formattedValue}</div>
          
          {/* Change area */}
          <div className={cn(
            "flex items-center text-sm",
            isPositive && "text-green-600",
            isNegative && "text-red-600",
            isNeutral && "text-gray-500"
          )}>
            {isPositive && <ChevronUp className="h-4 w-4 mr-1" />}
            {isNegative && <ChevronDown className="h-4 w-4 mr-1" />}
            {formattedPercent}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(MarketItemCard);
