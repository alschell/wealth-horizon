
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCountryFlagCode } from "../utils";

interface MarketItemProps {
  name: string;
  ticker: string;
  value: string;
  change: string;
  changePercent: string;
  isUp: boolean;
  category: string;
  isLarge?: boolean;
}

const MarketItem: React.FC<MarketItemProps> = ({
  name,
  ticker,
  value,
  change,
  changePercent,
  isUp,
  category,
  isLarge = false,
}) => {
  const countryCode = getCountryFlagCode(category, name);

  return (
    <div className={cn(
      'p-3 border rounded-lg bg-background transition-all',
      isLarge ? 'col-span-2' : ''
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {category === 'Indices' && (
            <span className={`fi fi-${countryCode} mr-2`} />
          )}
          <h3 className="font-medium">{name}</h3>
        </div>
        <span className="text-xs text-muted-foreground">{ticker}</span>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold">{value}</span>
        <div className={cn(
          'flex items-center text-sm',
          isUp ? 'text-green-600' : 'text-red-600'
        )}>
          {isUp ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          <span>{change}</span>
          <span className="ml-1">({changePercent})</span>
        </div>
      </div>
    </div>
  );
};

export default MarketItem;
