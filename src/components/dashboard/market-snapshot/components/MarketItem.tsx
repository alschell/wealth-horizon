
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketItemProps {
  name: string;
  ticker: string;
  value: string;
  change: string;
  changePercent: string;
  isUp: boolean;
  category: string;
  isLarge?: boolean;
  item?: any; // Added to support alternative usage
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
  item
}) => {
  // If item prop is provided, use it instead of individual props
  const itemData = item || {
    name,
    ticker,
    value,
    change,
    changePercent,
    isUp,
    category
  };

  // Function to get country flag code
  const getCountryFlagCode = (category: string, name: string): string => {
    // Map common indices to country codes
    const indicesMap: Record<string, string> = {
      'S&P 500': 'us',
      'NASDAQ': 'us',
      'Dow Jones': 'us',
      'FTSE 100': 'gb',
      'DAX': 'de',
      'CAC 40': 'fr',
      'Nikkei 225': 'jp',
      'Hang Seng': 'hk',
      'Shanghai Composite': 'cn',
      'KOSPI': 'kr',
      'ASX 200': 'au',
      'Sensex': 'in',
      'Bovespa': 'br'
    };

    // Map currencies to country codes
    const currencyMap: Record<string, string> = {
      'USD': 'us',
      'EUR': 'eu',
      'GBP': 'gb',
      'JPY': 'jp',
      'CHF': 'ch',
      'CAD': 'ca',
      'AUD': 'au',
      'CNY': 'cn',
      'HKD': 'hk',
      'SGD': 'sg',
      'EUR/USD': 'eu',
      'USD/JPY': 'jp',
      'GBP/USD': 'gb',
      'USD/CHF': 'ch',
      'USD/CAD': 'ca',
      'AUD/USD': 'au',
      'USD/CNY': 'cn'
    };

    if (category === "Indices") {
      return indicesMap[name] || 'us';
    } else if (category === "Currencies") {
      // Extract currency code from pair or use direct mapping
      const currency = name.split('/')[0];
      return currencyMap[name] || currencyMap[currency] || 'us';
    }

    // Default fallback
    return 'us';
  };

  return (
    <div className={cn(
      'p-3 border rounded-lg bg-background transition-all',
      isLarge ? 'col-span-2' : ''
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {itemData.category === 'Indices' && (
            <span className={`fi fi-${getCountryFlagCode(itemData.category, itemData.name)} mr-2`} />
          )}
          <h3 className="font-medium">{itemData.name}</h3>
        </div>
        <span className="text-xs text-muted-foreground">{itemData.ticker}</span>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold">{itemData.value}</span>
        <div className={cn(
          'flex items-center text-sm',
          itemData.isUp ? 'text-green-600' : 'text-red-600'
        )}>
          {itemData.isUp ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          <span>{itemData.change}</span>
          <span className="ml-1">({itemData.changePercent})</span>
        </div>
      </div>
    </div>
  );
};

export default MarketItem;
