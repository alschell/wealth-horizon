
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import MarketItem from './components/MarketItem';
import MarketSettings from './components/MarketSettings';
import { marketItems, loadVisibleItems, loadItemOrder, saveToLocalStorage } from './utils';
import { MarketItem as MarketItemType } from './types';

interface MarketSnapshotProps {
  title?: string;
  maxItems?: number;
}

const MarketSnapshot: React.FC<MarketSnapshotProps> = ({
  title = 'Market Snapshot',
  maxItems = 6,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>(loadVisibleItems());
  const [itemOrder, setItemOrder] = useState<string[]>(loadItemOrder());
  
  // Save to localStorage whenever settings change
  useEffect(() => {
    saveToLocalStorage(visibleItems, itemOrder);
  }, [visibleItems, itemOrder]);
  
  // Filter and order items
  const filteredItems = marketItems
    .filter(item => visibleItems.includes(item.id))
    .sort((a, b) => {
      return itemOrder.indexOf(a.id) - itemOrder.indexOf(b.id);
    })
    .slice(0, maxItems);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsSettingsOpen(true)}
          className="h-8 w-8 p-0"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item: MarketItemType) => (
            <MarketItem
              key={item.id}
              name={item.name}
              ticker={item.ticker}
              value={item.value.toString()}
              change={item.change.toString()}
              changePercent={item.changePercent}
              isUp={item.isUp}
              category={item.category}
              isLarge={item.id === 'sp500' || item.id === 'gold'}
            />
          ))}
        </div>
        
        <MarketSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          allItems={marketItems}
          visibleItems={visibleItems}
          itemOrder={itemOrder}
          setVisibleItems={setVisibleItems}
          setItemOrder={setItemOrder}
        />
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
